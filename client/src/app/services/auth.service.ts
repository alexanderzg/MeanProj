import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  domain = "http://localhost:8080"; //Development Domain - Not Needed in Production
  authToken;
  user;
  options;
  flag;
 

  constructor(
    private http: Http
  ) { 
    this.flag = false;
 
  }

  createAuthenticationHeaders(){
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  setFlag(t){
    this.flag = t;
  }
  getFlag(){
    return this.flag;
  }


  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  registerUser(user) {
    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());
  }

  // checkUsername(username) {
  //   return this.http.get(this.domain + '/authentication/checkUsername/' + username).map(res => res.json());
  // }

  checkEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail/' + email).map(res => res.json());
  }

  login(user){
    return this.http.post(this.domain + '/authentication/login', user ).map(res => res.json());
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile(){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/profile', this.options).map(res => res.json());
  }

  loggedIn(){
    return tokenNotExpired();
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>myMajorPlanner</title>
          
            <link rel="stylesheet" href= 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/flatly/bootstrap.min.css'>
            
            <style>
.dropdown{
    min-width: 33%;
    padding-right: 40px;    
}

.col-xs-4{
    padding: 0;
}

.fix-top-margin{
    margin-top: -62px;
    /*padding-top: -50px;*/
}

.fix-top-margin2{
    margin-top: -170px;
}

.form-group{
       border-color: white;
}

.inc-btn{
  padding-bottom: 33px;
  font-size: 30px;
  line-height: 1.428571429;   
}

.inc-box{
    margin-top: 2px;
    padding-top: 20px;
    margin-bottom: 2px;
    
    border-width: 2px;
}

#course{
    border-radius: 0;
}

.row.no-gutters {
  margin-right: 0;
  margin-left: 0;
}
.row.no-gutters > [class^="col-"],
.row.no-gutters > [class*=" col-"] {
  padding-right: 0;
  padding-left: 0;
}

   .col-lg-3,
   .col-md-4,
   .col-sm-6,
   .col-xs-12
  {
        border: 2px solid;
        border-color: #8db4e2;
   }

   .dashMargin{
       padding-top: 20px;
   }
   .container-fluid{
    color: #1f497d;
   }

   .color-dkblue{
    background-color: #1f497d;
   }

   .color-blue{
    background-color: #d5e5ff;
      border-color: white;
   }

    .color-pink{
    background-color: #fff0ff;
    
   }

   .color-lgblue{
    background-color: #ddeeff;
      border-color: white;
 
   }

   .color-dkpink{
    background-color: #f2dcec;
    
   }

   .color-yellow{
    background-color: #ffffcc;
    border-bottom: 2px solid;
    border-color: #8db4e2;
   }
   .color-yellow-total{
    background-color: #ffffcc;
    border-top: 1px solid;
    border-color: #8db4e2;
    font-size: 16px;
    height: 30px;
    font-weight: bold;
    padding-top: 6px;
   }

  .quarter{
    position: absolute;
    left: 10px;
    bottom: 2px;
    font-size: 20px;
    font-weight: bold;
   }

  .units{
    padding-top: 44px;
    font-size: 16px;
    font-weight: bold;
    padding-left: 6px;
   }

   .bot-margin{
     border-bottom: 2px solid; 
     border-color: #8db4e2;
   }

   .vertical{
    writing-mode:tb-rl;
    -webkit-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform:rotate(180deg);
    transform: rotate(180deg);
    white-space:nowrap;
    display:block;
    bottom:0;
    font-size: 12px;
    font-weight: bold;
    padding-top: 1px;
    height: 60px;
    margin: 0px;
    
    }

    .no-margin{
      padding: 0;
      margin: 0;
      
    }

    .option-h{
      height: 68px;  
    }

    .nav-h{
      height: 70px;
    
    }

    /*.btn-default{
        height: 22px;
        background-color: whitesmoke;
    }*/

.btn-default:focus,
.btn-default{
     background-color: white;
}

.btn-default:hover
{
    /*color: grey;*/
    border-color: #285e8e;
}

.btn-default:focus,
.btn-default:active,
.btn-default.active {

   background-color: #1f497d;
 
}

    .col-xs-6{
        margin: 0px;
        padding: 0px;
    }

    .btn{
        border-radius: 0px;
        border-width: 1px;
        border-bottom-color: #8db4e2;
        border-left-color: #8db4e2;
        border-right-color: #8db4e2;
    }

    .btn-fix{
    border-radius: 6px;
    margin-top: 10%;
}

    .btn-test{
        border-bottom: none;
    }

  .cancel-btn{
    margin-right: 14px;
    width: 124px;
    background-color:#E8E8E8;
    border-color: black;
 }
    .save-btn{
     border-color: black;   
    }

    .left-padding{
        padding-left: 10px;
    }

    /*.container{
        padding-left: 5%;
        padding-right: 5%;
    }
  

.fix-top-margin2{
    margin-top: -164px;
}
    }
} 

@media only screen and (min-width: 1200px){
    .container{
        padding-left: 18%;
        padding-right: 18%;
    }
}*/

.material-switch > input[type="checkbox"] {
    display: none;   
}

.material-switch > label {
    cursor: pointer;
    height: 0px;
    position: relative; 
    width: 40px;  
}

.material-switch > label::before {
    background: rgb(0, 0, 0);
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    content: '';
    height: 16px;
    margin-top: -8px;
    position:absolute;
    opacity: 0.3;
    transition: all 0.4s ease-in-out;
    width: 40px;
}
.material-switch > label::after {
    background: rgb(255, 255, 255);
    border-radius: 16px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    content: '';
    height: 24px;
    left: -4px;
    margin-top: -8px;
    position: absolute;
    top: -4px;
    transition: all 0.3s ease-in-out;
    width: 24px;
}
.material-switch > input[type="checkbox"]:checked + label::before {
    background: inherit;
    opacity: 0.5;
}
.material-switch > input[type="checkbox"]:checked + label::after {
    background: inherit;
    left: 20px;
}


 @media only screen and (max-width: 1008px){
    
    .fix-top-margin{
    margin-top: -61px;
    
    }

    .fix-top-margin2{
    margin-top: -10px;
    }

}


 @media only screen and (max-width: 800px){
    
    .fix-top-margin{
    margin-top: -0px;
    
    }

    .fix-top-margin2{
    margin-top: -20px;
    }

}





            </style>
            
        </head>
             <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
}
