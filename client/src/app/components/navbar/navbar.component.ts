import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  messageClass;
  message;
  processing = false;
  form: FormGroup;
  previousUrl;
  firstname;
  email;
  homeFlag;
  innerWidth;
  dashboardFlag;
  navbarheight = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private authGuard: AuthGuard 
    
    
  ) { 
    this.createForm();
    this.homeFlag = false;
    this.dashboardFlag = false;
    
  }
  


  mobileWidth(){
   
    this.innerWidth = (window.screen.width) + "px";

    if(innerWidth <= 767){
      return true;
    }else{
      return false;
    }
  }

  onLogoutClick(){
    this.authService.logout();
    // this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info'});
    this.router.navigate(['/']);
    //this.enableForm();
    this.authService.setFlag(false);

    // this.authService.storeUserData("","");
    // this.username = "";
    // this.password = "";
    this.form.get('email').setValue("");
    this.form.get('password').setValue("");
 
  }

setDashboardFlag(t){
  this.dashboardFlag = t;
}

getDashboardFlag(){
  return this.dashboardFlag;
}

setHomeFlag(t){
    this.homeFlag = t;
  }
 getHomeFlag(){
  return this.homeFlag;;
 }

hideNavBar(){
  if(this.mobileWidth()){
    this.setDashboardFlag(true);
  } 
}
 resetPage(){
   this.authService.setFlag(false);
   this.setHomeFlag(true);
 }

 showLogin(){

 }

  createForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  disableForm(){
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
  }

  enableForm(){
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
  }

 

  onLoginSubmit(){
    this.processing = true;
    //this.disableForm();
    const user = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    }
    this.authService.login(user).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        // this.flashMessagesService.show('Invalid Email or Password', { cssClass: 'alert alert-danger container container'});
        this.message = data.message;
        this.processing = false;
        setTimeout(()=> {
          this.messageClass = undefined;
          this.message = undefined;
        }, 2000);
        this.router.navigate(['/login']);
       
      }else{
        //  this.messageClass = 'alert alert-success';
        // this.flashMessagesService.show('You are now Logged In', { cssClass: 'alert alert-success'});
        // this.message = data.message;
        this.authService.storeUserData(data.token, data.user);
        setTimeout(()=> {
          if(this.previousUrl){
            this.router.navigate([this.previousUrl]);
          }else{
            this.messageClass = undefined;
            this.message = undefined;
            this.router.navigate(['/dashboard'])
          }         
        }, 1000);

       
      }
    });
  }

  ngOnInit() {

     setInterval(() => {
      this.mobileWidth();
      if(!this.mobileWidth()){
        this.setDashboardFlag(false);
      }
    }, 10);

      //Observable.interval(10000).takeWhile(() => true).subscribe(() => this.mobileWidth());

      this.authService.getProfile().subscribe(profile => {
      this.firstname = profile.user.firstname;
      this.email = profile.user.email;
      });
      
    if(this.authGuard.redirectUrl){
      this.messageClass = 'alert alert-danger';
      this.message = 'You must be logged in to view that page.';
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined; // clear the state
    }
  }

}



