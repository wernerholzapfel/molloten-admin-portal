import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
// import {NgRedux, select} from '@angular-redux/store';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {FetchKandidatenInProgress} from './store/kandidaten/kandidaten.actions';
import {FetchAfleveringenInProgress} from './store/afleveringen/afleveringen.actions';
import {IAppState} from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public auth: AuthService, private store: Store<IAppState>) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.store.dispatch(new FetchAfleveringenInProgress());
    this.store.dispatch(new FetchKandidatenInProgress());
  }
}

