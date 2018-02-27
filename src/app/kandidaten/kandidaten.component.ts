import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {KandidatenService} from '../kandidaten.service';
import {IKandidaat} from '../interface/IKandidaat';
import {IAppState} from '../store';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {IAlert} from '../interface/IAlert';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-kandidaten',
  templateUrl: './kandidaten.component.html',
  styleUrls: ['./kandidaten.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})


export class KandidatenComponent implements OnInit {
  saveKandidatenSub: Subscription;
  kandidaten$: Observable<IKandidaat[]>;
  isEditActive: boolean;
  activeKandidaat: IKandidaat;

  @Output()
  addAlert: EventEmitter<IAlert> = new EventEmitter<IAlert>(); // creating an output event

  constructor(private kandidatenService: KandidatenService, private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.kandidaten$ = this.store.select('kandidaten');
  }

  saveKandidaat() {
    this.isEditActive = false;

    this.saveKandidatenSub = this.kandidatenService.saveKandidaat(this.activeKandidaat).subscribe(response => {
        console.log(this.activeKandidaat.display_name + ' is opgeslagen');
        this.addAlert.emit({
          message: 'Het opslaan van de kandidaat is gelukt',
          type: 'success',
          err: undefined
        });
        this.activeKandidaat = null;
      },
      error => {
        this.addAlert.emit({
          message: 'Het opslaan van de kandidaat is niet gelukt',
          type: 'danger',
          err: error
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
