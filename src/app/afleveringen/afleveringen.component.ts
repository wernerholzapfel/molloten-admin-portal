import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/nl';
import {IAflevering} from '../interface/IAflevering';
import {IAppState} from '../store';
import {UpdateAfleveringInProgress} from '../actions';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'app-afleveringen',
  templateUrl: './afleveringen.component.html',
  styleUrls: ['./afleveringen.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AfleveringenComponent implements OnInit {

  afleveringen$: Observable<IAflevering[]>;
  isEditActive: boolean;
  activeAflevering: IAflevering;
  date: string;
  postfixTimezone: any;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.afleveringen$ = this.store.select('afleveringen');
  }

  saveAflevering() {
    this.isEditActive = false;

    this.activeAflevering.deadlineDatetime = moment(this.activeAflevering.deadlineDatetime + this.postfixTimezone).toISOString();

    this.store.dispatch(new UpdateAfleveringInProgress(this.activeAflevering));
  }

  editAflevering(aflevering) {
    this.isEditActive = true;
    const localTimezone = moment(aflevering.deadlineDatetime).format().slice(0, 16);
    this.postfixTimezone = moment(aflevering.deadlineDatetime).format().slice(16);
    this.activeAflevering = _.cloneDeep(aflevering);
    this.activeAflevering.deadlineDatetime = localTimezone;
  }

  cancelAflevering(aflevering) {
    this.isEditActive = false;
    this.activeAflevering = null;
  }
}
