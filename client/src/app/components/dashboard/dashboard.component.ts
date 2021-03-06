import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  firstname;
  email;
  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.authService.getProfile().subscribe(profile => {
      this.firstname = profile.user.firstname;
      this.email = profile.user.email;
    });
  }



}


