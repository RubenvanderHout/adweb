import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { Result, err, ok } from 'src/app/result.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  public userCredentials: UserCredential | undefined;

  constructor() {}

  async signIn(email: string, password : string) : Promise<Result<UserCredential, Error>> {
    try {
      const value = await signInWithEmailAndPassword(this.auth, email, password);
      return ok(value);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return err(error);
      } else {
        return err(new Error('An unknown error occurred'));
      }
    }
  }

  async signUp(email: string, password: string): Promise<Result<UserCredential, Error>>{
    try {
      const value = await createUserWithEmailAndPassword(this.auth, email, password);
      return ok(value);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return err(error);
      } else {
        return err(new Error('An unknown error occurred'));
      }
    }
  }

  async signOut(): Promise<Result<null, Error >> {
    try {
      await signOut(this.auth);
      return ok(null);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return err(error);
      } else {
        return err(new Error('An unknown error occurred'));
      }
    }
  }
}