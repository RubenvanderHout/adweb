import { Injectable } from '@angular/core';
import { connectAuthEmulator,getAuth,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { Router } from '@angular/router';
import { app } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    auth;
    userCredentials: UserCredential | undefined;
    constructor(private router: Router) { 
        this.auth = getAuth(app)
        connectAuthEmulator(this.auth, "http://localhost:9099");
    }

  async signIn(email: string, password: string) {
    try {
      this.userCredentials = await signInWithEmailAndPassword(this.auth,email, password);
      this.router.navigate(['/dashboard']); // Redirect to dashboard after successful login
    } catch (error) {
      console.log('Error signing in:', error);
    }
  }
  async signUp(email:string,password:string){
    try{
        this.userCredentials = await createUserWithEmailAndPassword(this.auth,email,password);
        this.router.navigate(['/dashboard']);
    }catch(error){
        console.log('Error signing in:', error);
    }
  }
  async signOut() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']); // Redirect to login page after sign out
    } catch (error) {
      console.log('Error signing out:', error);
    }
  }
}