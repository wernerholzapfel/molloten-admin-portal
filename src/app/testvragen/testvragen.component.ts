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
  mutatedKandidaten: KandidaatModel[];
  afleveringenSub: Subscription;
  afleveringen: AfleveringModel[];
  activeAflevering: number;
  testVragen: any;
  currentAflevering: number;
  selection: any;
  form: TestvraagModel;
  // vraagForm: TestvraagModel;
  // antwoordForm: AntwoordModel[];
  defaultAntwoord: AntwoordModel = {
    antwoord: '',
    kandidaten: []
  };
  showEditMenu: Boolean = false;
  showEditVraag: Boolean = false;

  constructor(private kandidatenService: KandidatenService,
              private afleveringenService: AfleveringenService,
              private testvragenService: TestvragenService) {
  }

  ngOnInit() {
    this.kandidatenSub = this.kandidatenService.getKandidaten().subscribe(response => {
      this.kandidaten = response;
    });
    this.afleveringenSub = this.afleveringenService.getAfleveringen().subscribe(response => {
      this.afleveringen = response;
      this.fetchTestVragen(this.afleveringen[0].aflevering);
    });


    this.resetTestvraagForm();
  }

  fetchTestVragen(afleveringId) {
    this.activeAflevering =  parseInt(afleveringId, 10);
    this.form.aflevering =  parseInt(afleveringId, 10);
    this.mutatedKandidaten = _.cloneDeep(this.kandidaten).filter(kandidaat => {
      return kandidaat.aflevering > afleveringId || !kandidaat.aflevering;
    });
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
    this.showEditVraag = false;
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
      this.showEditVraag = false;
      this.fetchTestVragen(this.activeAflevering);
      this.resetTestvraagForm();
    });
  }

  updateTestVraag() {
    this.testvragenService.updateTestvraag(this.form).subscribe(response => {
      this.showEditMenu = false;
      this.showEditVraag = false;
      this.fetchTestVragen(this.activeAflevering);
      this.resetTestvraagForm();
    });
  }

  editVraag(vraag: TestvraagModel) {
    this.form = vraag;
    this.mutatedKandidaten = _.cloneDeep(this.kandidaten).filter(kandidaat => {
      return kandidaat.aflevering > vraag.aflevering || !kandidaat.aflevering;
    });
    this.showEditVraag = true;
  }

  updateVraag() {
    this.testvragenService.updatevraag(this.form).subscribe(response => {
      console.log('update gelukt');
    });
  }

  areAllKandidatenSelected() {
    let selectedKandidaten = 0;
    const activeKandidaten = _.cloneDeep(this.mutatedKandidaten);
    this.form.antwoorden.forEach(antwoord => {
      selectedKandidaten = selectedKandidaten + antwoord.kandidaten.length;
      antwoord.kandidaten.forEach(kandidaat => {
        const selectedKandidaat = _.find(activeKandidaten, {id: kandidaat.id});
        if (selectedKandidaat) {
          _.remove(activeKandidaten, {
            id: selectedKandidaat.id
          });
          kandidaat.selected = true;
          selectedKandidaat.selected = true;
        }
      });
    });

    return (this.mutatedKandidaten.length === selectedKandidaten
      && activeKandidaten.length === 0
      && this.form.vraag);
  }
}

// return (this.kandidaten.length === selectedKandidaten
//   && (_.filter(mutatedKandidaten, {selected: true}).length === this.kandidaten.length));
// }
