import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
// import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from './store';
import {FetchAfleveringenInProgress, FetchKandidatenInProgress, INCREMENT, Increment} from './actions';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  counter$: Observable<number>;

  constructor(public auth: AuthService, private store: Store<IAppState>) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.counter$ = this.store.select('counter');
    this.store.dispatch(new FetchAfleveringenInProgress());
    this.store.dispatch(new FetchKandidatenInProgress());

  }

  increment() {
    this.store.dispatch(new Increment());
  }
}

