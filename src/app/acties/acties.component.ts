import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActiesModel, ActiesService} from '../acties.service';
import {Subscription} from 'rxjs/Subscription';
import {IAlert} from '../interface/IAlert';

@Component({
  selector: 'app-acties',
  templateUrl: './acties.component.html',
  styleUrls: ['./acties.component.css']
})
export class ActiesComponent implements OnInit {

  saveActiesSub: Subscription;
  actiesSub: Subscription;
  acties: ActiesModel = {};

  constructor(private actiesService: ActiesService) { }

  ngOnInit() {
    this.actiesSub = this.actiesService.getActies().subscribe(response => {
      this.acties = response;
    },
      error => {
     console.log('ophalen niet gelukt');
      //   this.addAlert.emit({
      //     message: 'Het ophalen van de acties is niet gelukt',
      //     type: 'danger'});
      });
  }

  saveActies() {
    this.saveActiesSub = this.actiesService.saveActies(this.acties).subscribe(response => {
      console.log('saved actie');
      // this.addAlert.emit({
      //   message: 'Het opslaan van de acties is gelukt',
      //   type: 'success'
      },
      error => {
        console.log('opslaan mislukt');
        // this.addAlert.emit({
        //   message: 'Het opslaan van de acties is niet gelukt',
        //   type: 'danger'});
    });
  }
}
