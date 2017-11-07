import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

innerWidth;
  constructor(
    private router: Router
  ) { }


  mobileWidth(){
   
    this.innerWidth = (window.screen.width) + "px";

    if(innerWidth <= 767){
      return true;
    }else{
      return false;
    }
  }

  ngOnInit() {
      setInterval(() => {
      this.mobileWidth();

    }, 10);
  }

}
