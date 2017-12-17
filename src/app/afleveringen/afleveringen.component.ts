import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AfleveringenService, AfleveringModel} from '../afleveringen.service';
import * as moment from 'moment';
import 'moment/locale/nl';

@Component({
  selector: 'app-afleveringen',
  templateUrl: './afleveringen.component.html',
  styleUrls: ['./afleveringen.component.css']
})
export class AfleveringenComponent implements OnInit {

  saveafleveringenSub: Subscription;
  afleveringenSub: Subscription;
  afleveringen: AfleveringModel[];
  isEditActive: boolean;
  activeAflevering: AfleveringModel;
  date: string;
  postfixTimezone: any;

  constructor(private afleveringenService: AfleveringenService) {
  }

  ngOnInit() {
    this.afleveringenSub = this.afleveringenService.getAfleveringen().subscribe(response => {
      this.afleveringen = response;
    });
  }

  saveAflevering() {
    this.activeAflevering.deadlineDatetime = this.activeAflevering.deadlineDatetime + this.postfixTimezone;
    this.saveafleveringenSub = this.afleveringenService.saveAflevering(this.activeAflevering).subscribe(response => {
      console.log(this.activeAflevering.aflevering + ' is opgeslagen');
      this.isEditActive = false;
      this.activeAflevering = null;
    });
  }

  editAflevering(aflevering) {
    this.isEditActive = true;
    const localTimezone = moment(aflevering.deadlineDatetime).format().slice(0, 16);
    this.postfixTimezone = moment(aflevering.deadlineDatetime).format().slice(16);
    aflevering.deadlineDatetime =  localTimezone;
    this.activeAflevering = aflevering;
  }

  cancelAflevering(aflevering) {
    this.isEditActive = false;
    this.activeAflevering = null;
  }

}
