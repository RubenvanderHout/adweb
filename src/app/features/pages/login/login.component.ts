import { Component,inject } from '@angular/core';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut} from 'firebase/auth';
import { app } from 'src/environment/environment';
import { connectAuthEmulator } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  authservice:AuthService = inject(AuthService);
  htmlstring;
  constructor(){
    this.htmlstring =  ``
  }
   
  async signIn(email:string,password:string){
    try{
      this.authservice.signIn(email,password)
    }catch(error){
      this.htmlstring = `${error}`;
    }
  }
  
  async signUp(email:string,password:string){
    try{
      this.authservice.signUp(email,password);
    }catch(error){
      this.htmlstring = `${error}`;
    }
  }
  async signOut(){
    this.authservice.signOut()
    this.htmlstring =  `<p>Signed out</p>`
  }
}
