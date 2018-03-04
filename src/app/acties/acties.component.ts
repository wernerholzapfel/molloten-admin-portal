import { Component, OnInit } from '@angular/core';
import {ActiesModel, ActiesService} from '../acties.service';
import {Subscription} from 'rxjs/Subscription';

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
    });
  }

  saveActies() {
    this.saveActiesSub = this.actiesService.saveActies(this.acties).subscribe(response => {
      console.log('saved actie');
    });
  }

}
