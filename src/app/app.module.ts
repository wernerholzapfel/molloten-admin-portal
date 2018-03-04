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
import { ActiesComponent } from './acties/acties.component';
import {ActiesService} from './acties.service';

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
    NgbModule.forRoot()
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
}
