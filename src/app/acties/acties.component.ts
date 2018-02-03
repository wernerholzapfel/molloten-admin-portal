import {Component, Input, OnInit} from '@angular/core';
import {ActiesModel, ActiesService} from '../acties.service';
import {Subscription} from 'rxjs/Subscription';
import {IAlert} from '../kandidaten/kandidaten.component';

@Component({
  selector: 'app-acties',
  templateUrl: './acties.component.html',
  styleUrls: ['./acties.component.css']
})
export class ActiesComponent implements OnInit {

  saveActiesSub: Subscription;
  actiesSub: Subscription;
  acties: ActiesModel = {};
  @Input()
  public alerts: Array<IAlert> = [];
  constructor(private actiesService: ActiesService) { }

  ngOnInit() {
    this.actiesSub = this.actiesService.getActies().subscribe(response => {
      this.acties = response;
    },
      error => {
        this.alerts.push({
          message: 'Het ophalen van de acties is niet gelukt',
          type: 'danger'});
      });
  }

  saveActies() {
    this.saveActiesSub = this.actiesService.saveActies(this.acties).subscribe(response => {
      console.log('saved actie');
      this.alerts.push({
        message: 'Het opslaan van de acties is gelukt',
        type: 'success'
      });
    },
      error => {
        this.alerts.push({
          message: 'Het opslaan van de acties is niet gelukt',
          type: 'danger'});
      });
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
