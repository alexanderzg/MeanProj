import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
//import the authentication service
import { AuthService} from '../../services/auth.service';
//import router
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

messageClass;
message;
processing = false;
form: FormGroup;
previousUrl;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) { 
  
    this.createForm();
   
   
  }

  createForm(){
     this.authService.setFlag(true);
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
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    }
    this.authService.login(user).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.authService.storeUserData(data.token, data.user);
        setTimeout(()=> {
          if(this.previousUrl){
            this.router.navigate([this.previousUrl]);
          }else{
            this.router.navigate(['/dashboard'])
          }         
        }, 0);
      }
    });
  }

  ngOnInit() {
   
    if(this.authGuard.redirectUrl){
      this.messageClass = 'alert alert-danger';
      this.message = 'You must be logged in to view that page.';
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined; // clear the state
    }
  }

}
