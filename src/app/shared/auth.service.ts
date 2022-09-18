import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';
import { GoogleAuthProvider, GithubAuthProvider,FacebookAuthProvider} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireauth : AngularFireAuth, public router : Router) { }
    //login method
    login(email : string, password : string){
      this.fireauth.signInWithEmailAndPassword(email ,password).then ( res =>{
        localStorage.setItem('token','true');
       
            
        if(res.user?.emailVerified == true){
          this.router.navigate(['dashboard']);
        }else{
          this.router.navigate(['/verify-email']);
          this.router.navigate(['/dashboard']);
        }



      },err => {
       alert(err.message);
       this.router.navigate(['/login']);

      })
    }
  //register method
  register(email: string,password: string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(res =>{
   alert('Registration Successful');
      this.router.navigate(['/login']);
      //  this.sendEmailForVerification(res.user); 
    },err=> {
alert(err.message);
this.router.navigate(['/register']);
    })
  }

  //sign out method
  logout(){
    this.fireauth.signOut().then( ()=>{
localStorage.removeItem('token');
this.router.navigate(['/login']);
    },err=>{
     alert(err.message);
     
    })
  }

  //forgot password
  forgotPassword(email: string){
    this.fireauth.sendPasswordResetEmail(email).then(()=>{
this.router.navigate(['/verify-email']);
    },err =>{
      alert('Something went wrong');
    })
  }

  //email verification
  sendEmailForVerification(user : any){
    user.sendEmailVerification().then((res: any) =>{
this.router.navigate(['/verify-email']);
    },(err : any) => {
      alert('Something went wrong.Not able to send the mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res =>{
    this.router.navigate(['/dashboard']);
    localStorage.setItem('token',JSON.stringify(res.user?.uid));


    },err =>{
      alert(err.message);
    })
  }


}
