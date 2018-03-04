import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AfleveringenService, AfleveringModel} from '../afleveringen.service';
import * as moment from 'moment';
import 'moment/locale/nl';
import {IAlert} from '../kandidaten/kandidaten.component';

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
  @Output()
  addAlert: EventEmitter<IAlert> = new EventEmitter<IAlert>(); // creating an output event


  constructor(private afleveringenService: AfleveringenService) {
  }

  ngOnInit() {
    this.afleveringenSub = this.afleveringenService.getAfleveringen().subscribe(response => {
      this.afleveringen = response;
    },
      error => {
        this.addAlert.emit({
          message: 'Het ophalen van de uitzendingen is niet gelukt',
          type: 'danger'});
      });
  }

  saveAflevering() {
    this.isEditActive = false;

    this.activeAflevering.deadlineDatetime = moment(this.activeAflevering.deadlineDatetime + this.postfixTimezone).toISOString();
    this.saveafleveringenSub = this.afleveringenService.saveAflevering(this.activeAflevering).subscribe(response => {
        this.addAlert.emit({
          message: 'Het opslaan van de uitzending is gelukt',
          type: 'success'
        });
        console.log(this.activeAflevering.aflevering + ' is opgeslagen');
        this.activeAflevering = null;
      },
      error => {
        this.addAlert.emit({
          message: 'Het opslaan van de uitzending is niet gelukt',
          type: 'danger'});
      });
  }

  editAflevering(aflevering) {
    this.isEditActive = true;
    const localTimezone = moment(aflevering.deadlineDatetime).format().slice(0, 16);
    this.postfixTimezone = moment(aflevering.deadlineDatetime).format().slice(16);
    aflevering.deadlineDatetime = localTimezone;
    this.activeAflevering = aflevering;
  }

  cancelAflevering(aflevering) {
    this.isEditActive = false;
    this.activeAflevering = null;
  }
}
