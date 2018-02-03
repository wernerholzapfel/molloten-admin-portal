import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: any;
  isAdmin: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit() {
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
}
