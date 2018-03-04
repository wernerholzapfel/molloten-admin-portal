import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Output()
  addAlert: EventEmitter<IAlert> = new EventEmitter<IAlert>(); // creating an output event

  constructor(private kandidatenService: KandidatenService) {
  }

  ngOnInit() {
    this.kandidatenSub = this.kandidatenService.getKandidaten().subscribe(response => {
      this.kandidaten = response;
    },
      error => {
        this.addAlert.emit({
          message: 'Het ophalen van de kandidaten is niet gelukt',
          type: 'danger'});
      });
  }

  saveKandidaat() {
    this.isEditActive = false;

    this.saveKandidatenSub = this.kandidatenService.saveKandidaat(this.activeKandidaat).subscribe(response => {
        console.log(this.activeKandidaat.display_name + ' is opgeslagen');
        this.addAlert.emit({
          message: 'Het opslaan van de kandidaat is gelukt',
          type: 'success'
        });
        this.activeKandidaat = null;
      },
      error => {
        this.addAlert.emit({
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
}

export interface IAlert {
  type: string;
  message: string;
}
