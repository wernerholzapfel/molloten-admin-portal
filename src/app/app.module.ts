import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {ROUTES} from './app.routes';

import {AuthService} from './auth/auth.service';
import {CallbackComponent} from './callback/callback.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {KandidatenComponent} from './kandidaten/kandidaten.component';
import {AfleveringenComponent} from './afleveringen/afleveringen.component';
import {TestvragenComponent} from './testvragen/testvragen.component';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {KandidatenService} from './kandidaten.service';
import {TestvragenService} from './testvragen.service';
import {AfleveringenService} from './afleveringen.service';
import {ActiesComponent} from './acties/acties.component';
import {ActiesService} from './acties.service';

import {IAppState, reducers} from './store/store';
import {Store, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {KandidatenEffects} from './store/kandidaten/kandidaten.effects';
import {AfleveringenEffects} from './store/afleveringen/afleveringen.effects';
import {ActiesEffects} from './store/acties/acties.effects';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('id_token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    KandidatenComponent,
    AfleveringenComponent,
    TestvragenComponent,
    ActiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    NgbModule.forRoot(),

    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    // StoreRouterConnectingModule,
    EffectsModule.forRoot([AfleveringenEffects, KandidatenEffects, ActiesEffects]),

  ],
  providers: [AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    KandidatenService,
    ActiesService,
    TestvragenService,
    AfleveringenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private store: Store<IAppState>) {
    // https://github.com/angular-redux/store/blob/master/articles/redux-dev-tools.md
    // let enhancers = [];
    // ... add whatever other enhancers you want.

    // You probably only want to expose this tool in devMode.

    // enhancers = [ ...enhancers, devTools.enhancer() ];

    // this.store.configureStore(
    //   rootReducer,
    //   INITIAL_STATE,
    //   [],
    //   enhancers);

  }
}


