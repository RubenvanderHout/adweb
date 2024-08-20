import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, UserCredential } from '@angular/fire/auth';
import { from } from 'rxjs';
import { User as DomainUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth);
  userCredentials: UserCredential | undefined;
  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<DomainUser | null | undefined>(undefined);

  constructor() {}

  register(email: string, username: string, password: string) {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password);
    promise.then(response => updateProfile(response.user, { displayName: username }));

    return from(promise);
  }

  login(email: string, password : string){
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password);
    return from(promise);
  }


  logout() {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

}