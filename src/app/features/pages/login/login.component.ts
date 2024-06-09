import { Component,inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  private authservice : AuthService = inject(AuthService);
  public htmlstring : string;

  constructor(private router : Router){
    this.htmlstring =  ``
  }

  async signIn(email:string, password:string){
    try {
      await this.authservice.signIn(email,password)
      this.router.navigate(["bookkeepings"]);

    } catch(error){
      this.htmlstring = `${error}`;
    }
  }

  async signUp(email:string,password:string){
    try {
      await this.authservice.signUp(email,password);
      this.htmlstring = `<p>Signed up succesfully</p>`
    } catch(error){
      this.htmlstring = `${error}`;
    }
  }
  async signOut(){
    this.authservice.signOut()
    this.htmlstring = `<p>Signed out</p>`
  }
}
