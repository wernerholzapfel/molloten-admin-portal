import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {KandidaatModel, KandidatenService} from '../kandidaten.service';

@Component({
  selector: 'app-kandidaten',
  templateUrl: './kandidaten.component.html',
  styleUrls: ['./kandidaten.component.css']
})

export class KandidatenComponent implements OnInit {
  kandidatenSub: Subscription;
  kandidaten: KandidaatModel[];
  saveKandidatenSub: Subscription;
  isEditActive: boolean;
  activeKandidaat: KandidaatModel;

  @Input()
  public alerts: Array<IAlert> = [];

  constructor(private kandidatenService: KandidatenService) {
  }

  ngOnInit() {
    this.kandidatenSub = this.kandidatenService.getKandidaten().subscribe(response => {
      this.kandidaten = response;
    },
      error => {
        this.alerts.push({
          message: 'Het ophalen van de kandidaten is niet gelukt',
          type: 'danger'});
      });
  }

  saveKandidaat() {
    this.isEditActive = false;

    this.saveKandidatenSub = this.kandidatenService.saveKandidaat(this.activeKandidaat).subscribe(response => {
        console.log(this.activeKandidaat.display_name + ' is opgeslagen');
        this.alerts.push({
          message: 'Het opslaan van de kandidaat is gelukt',
          type: 'success'
        });
        this.activeKandidaat = null;
      },
      error => {
        this.alerts.push({
          message: 'Het opslaan van de kandidaat is niet gelukt',
          type: 'danger'
        });
      });
  }

  editKandidaat(kandidaat) {
    this.isEditActive = true;
    this.activeKandidaat = kandidaat;
  }

  cancelKandidaat(kandidaat) {
    this.isEditActive = false;
    this.activeKandidaat = null;
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

}

export interface IAlert {
  type: string;
  message: string;
}
