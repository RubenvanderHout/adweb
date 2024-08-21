import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, UserCredential } from '@angular/fire/auth';
import { from } from 'rxjs';
import { User as DomainUser } from '../models/user.model';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firestore : Firestore = inject(Firestore);
  firebaseAuth = inject(Auth);
  userCredentials: UserCredential | undefined;
  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<DomainUser | null | undefined>(undefined);

  constructor() {}

  async register(email: string, username: string, password: string) {
    try {
      const response = await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
      await updateProfile(response.user, { displayName: username });

      // Save additional user data in Firestore
      const userDoc = doc(this.firestore, `users/${response.user.uid}`);
      const domainUser: DomainUser = {
        userId: response.user.uid,
        email: email,
        username: username,
        // Include any other fields here
      };
      await setDoc(userDoc, domainUser);

      return from(Promise.resolve(response));
    } catch (error) {
      return from(Promise.reject(new Error("Could not register user")));
    }
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