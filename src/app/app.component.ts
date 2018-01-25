import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  profile: any;
  isAdmin: boolean;

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      this.isAdmin = this.auth.isAdmin();

    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.isAdmin = this.auth.isAdmin();
      });
    }

  }
}
