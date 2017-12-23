import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {KandidaatModel, KandidatenService} from '../kandidaten.service';
import {AfleveringenService, AfleveringModel} from '../afleveringen.service';
import {AntwoordModel, TestvraagModel, TestvragenService} from '../testvragen.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-testvragen',
  templateUrl: './testvragen.component.html',
  styleUrls: ['./testvragen.component.css']
})
export class TestvragenComponent implements OnInit {
  testvragenSub: Subscription;
  kandidatenSub: Subscription;
  kandidaten: KandidaatModel[];
  afleveringenSub: Subscription;
  afleveringen: AfleveringModel[];
  activeAflevering: number;
  testVragen: any;
  currentAflevering: number;
  selection: any;
  form: TestvraagModel;
  defaultAntwoord: AntwoordModel = {
    antwoord: '',
    kandidaten: []
  };
  showEditMenu: Boolean = false;

  constructor(private kandidatenService: KandidatenService,
              private afleveringenService: AfleveringenService,
              private testvragenService: TestvragenService) {
  }

  ngOnInit() {
    this.kandidatenSub = this.kandidatenService.getKandidaten().subscribe(response => {
      this.kandidaten = response.filter(kandidaat => {
        return !kandidaat.afgevallen;
      });
    });
    this.afleveringenSub = this.afleveringenService.getAfleveringen().subscribe(response => {
      this.afleveringen = response.filter(aflevering => {
        return !aflevering.uitgezonden;
      });
      this.fetchTestVragen(this.afleveringen[0].aflevering);
    });


    this.resetTestvraagForm();
  }

  fetchTestVragen(afleveringId) {
    this.activeAflevering = afleveringId;
    this.form.aflevering = afleveringId;
    this.testvragenSub = this.testvragenService.getTestvragen(afleveringId).subscribe(response => {
      this.testVragen = response;
    });
    console.log(afleveringId);
  }

  addAntwoord() {
    this.form.antwoorden.push(_.cloneDeep(this.defaultAntwoord));
  }

  cancelVraag() {
    this.resetTestvraagForm();
    this.showEditMenu = false;
  }

  addTestVraag() {
    this.showEditMenu = true;
  }

  deleteAntwoord(index) {
    this.form.antwoorden.splice(index, 1);
  }

  resetTestvraagForm() {
    this.form = {
      aflevering: this.activeAflevering,
      antwoorden: [_.cloneDeep(this.defaultAntwoord)]
    };
  }

  saveTestVraag() {
    this.testvragenService.saveTestvraag(this.form).subscribe(response => {
      this.showEditMenu = false;
      this.fetchTestVragen(this.activeAflevering);
      this.resetTestvraagForm();
    });
  }

  areAllKandidatenSelected() {
    let selectedKandidaten = 0;
    const mutatedKandidaten = _.cloneDeep(this.kandidaten);
    this.form.antwoorden.forEach(antwoord => {
      selectedKandidaten = selectedKandidaten + antwoord.kandidaten.length;
      antwoord.kandidaten.forEach(kandidaat => {
        _.find(mutatedKandidaten, {id: kandidaat.id}).selected = true;
      });
    });

    return (this.kandidaten.length === selectedKandidaten
      && (_.filter(mutatedKandidaten, {selected: true}).length === this.kandidaten.length));
  }
}
