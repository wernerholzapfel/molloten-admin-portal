import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {KandidaatModel, KandidatenService} from '../kandidaten.service';
import {AfleveringenService, AfleveringModel} from '../afleveringen.service';
import {TestvragenService} from '../testvragen.service';

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
  testVragen: any;

  constructor(private kandidatenService: KandidatenService, private afleveringenService: AfleveringenService, private testvragenService: TestvragenService) {
  }

  ngOnInit() {
    this.kandidatenSub = this.kandidatenService.getKandidaten().subscribe(response => {
      this.kandidaten = response;
    });
    this.afleveringenSub = this.afleveringenService.getAfleveringen().subscribe(response => {
      this.afleveringen = response;
    });
  }

  fetchTestVragen(afleveringId) {
    this.testvragenSub = this.testvragenService.getTestvragen(afleveringId).subscribe(response => {
      this.testVragen = response;
    });
    console.log(afleveringId);
  }

}
