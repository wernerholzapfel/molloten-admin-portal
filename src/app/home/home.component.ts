import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from './../auth/auth.service';
import {IAlert} from '../interface/IAlert';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/store';
import {Observable} from 'rxjs/Observable';
import {DeleteAlert} from '../store/alerts/alerts.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: any;
  isAdmin: boolean;
  alerts$: Observable<IAlert[]>;
  changeDetection: ChangeDetectionStrategy.OnPush;

  constructor(public auth: AuthService, private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.alerts$ = this.store.select('alerts');
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      this.isAdmin = this.auth.userProfile &&
        (this.auth.userProfile === 'werner.holzapfel@gmail.com' || this.auth.userProfile === 'tom.dijkerman@gmail.com');
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.isAdmin = profile &&
          (profile.name === 'werner.holzapfel@gmail.com' || profile.name === 'tom.dijkerman@gmail.com');
      });
    }
  }

  public closeAlert(alert: IAlert) {
    this.store.dispatch(new DeleteAlert(alert));
  }
}
