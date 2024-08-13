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

  async signIn(email : string, password : string){
    const result = await this.authservice.signIn(email, password);

    switch (result.kind) {
      case 'ok':
        this.router.navigate(["bookkeepings"]);
        break;
      case 'err':
        this.htmlstring = `${result.error}`;
        break;
    }
  }

}
