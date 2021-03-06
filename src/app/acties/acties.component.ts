import {take} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {IActies} from '../interface/IActies';
import {Observable} from 'rxjs';
import {IAppState} from '../store/store';
import {Store} from '@ngrx/store';
import {UpdateActiesInProgress} from '../store/acties/acties.actions';


import * as _ from 'lodash';

@Component({
  selector: 'app-acties',
  templateUrl: './acties.component.html',
  styleUrls: ['./acties.component.css']
})
export class ActiesComponent implements OnInit {

  acties$: Observable<IActies>;
  acties: IActies;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.acties$ = this.store.select('acties');
    this.acties$.pipe(take(1)).subscribe(acties => {
      this.acties = _.cloneDeep(acties);
    });
  }

  saveActies() {
    this.store.dispatch(new UpdateActiesInProgress(this.acties));
  }
}
