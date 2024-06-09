import { Component } from '@angular/core';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut} from 'firebase/auth';
import { app } from 'src/environment/environment';
import { connectAuthEmulator } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  auth;
  htmlstring;
  constructor(){
    this.auth = getAuth(app);
    this.htmlstring =  `Log in`
    connectAuthEmulator(this.auth, "http://localhost:9099");
  }
   
  async signIn(email:string,password:string){
    try{
      const userCredential = await signInWithEmailAndPassword(this.auth,email,password);
      this.htmlstring = `Logged in as ${userCredential.user.email}`;
    }catch(error){
      this.htmlstring = `${error}`;
    }
  }
  
  async signUp(email:string,password:string){
    try{
      const userCredential = await createUserWithEmailAndPassword(this.auth,email,password);
      this.htmlstring = `Signed up as ${userCredential.user.email}`;
    }catch(error){
      this.htmlstring = `${error}`;
    }
  }
  async signOut(){
    await signOut(this.auth);
    this.htmlstring =  `<p>Signed out</p>`
  }
}
