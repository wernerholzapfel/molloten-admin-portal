import {Component, Input, OnInit} from '@angular/core';
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
  @Input()
  public alerts: Array<IAlert> = [];


  constructor(private afleveringenService: AfleveringenService) {
  }

  ngOnInit() {
    this.afleveringenSub = this.afleveringenService.getAfleveringen().subscribe(response => {
      this.afleveringen = response;
    },
      error => {
        this.alerts.push({
          message: 'Het ophalen van de uitzendingen is niet gelukt',
          type: 'danger'});
      });
  }

  saveAflevering() {
    this.isEditActive = false;

    this.activeAflevering.deadlineDatetime = moment(this.activeAflevering.deadlineDatetime + this.postfixTimezone).toISOString();
    this.saveafleveringenSub = this.afleveringenService.saveAflevering(this.activeAflevering).subscribe(response => {
        this.alerts.push({
          message: 'Het opslaan van de uitzending is gelukt',
          type: 'success'
        });
        console.log(this.activeAflevering.aflevering + ' is opgeslagen');
        this.activeAflevering = null;
      },
      error => {
        this.alerts.push({
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

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

}
