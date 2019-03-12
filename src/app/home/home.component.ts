import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {IAlert} from '../interface/IAlert';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/store';
import {Observable} from 'rxjs';
import {DeleteAlert} from '../store/alerts/alerts.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: any;
  alerts$: Observable<IAlert[]>;
  changeDetection: ChangeDetectionStrategy.OnPush;

  constructor(public authService: AuthService, private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.alerts$ = this.store.select('alerts');
    this.authService.user$.pipe().subscribe(response => {
      this.profile = response;
    });
  }

  public closeAlert(alert: IAlert) {
    this.store.dispatch(new DeleteAlert(alert));
  }
}
