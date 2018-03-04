import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {KandidatenService} from '../kandidaten.service';
import {IKandidaat} from '../interface/IKandidaat';
import {IAppState} from '../store/store';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {IAlert} from '../interface/IAlert';
import {Subscription} from 'rxjs/Subscription';
import {UpdateKandidaatInProgress} from '../store/kandidaten/kandidaten.actions';
import {getKandidaten} from '../store/kandidaten/kandidaten.reducer';

@Component({
  selector: 'app-kandidaten',
  templateUrl: './kandidaten.component.html',
  styleUrls: ['./kandidaten.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})


export class KandidatenComponent implements OnInit {
  kandidaten$: Observable<IKandidaat[]>;
  isEditActive: boolean;
  activeKandidaat: IKandidaat;

  @Output()
  addAlert: EventEmitter<IAlert> = new EventEmitter<IAlert>(); // creating an output event

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.kandidaten$ = this.store.select(getKandidaten);
  }

  saveKandidaat() {
    this.isEditActive = false;
    this.store.dispatch(new UpdateKandidaatInProgress(this.activeKandidaat));
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
