import { Component,inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})

export class LogOutComponent {

  private authservice : AuthService = inject(AuthService);
  public htmlstring : string;

  constructor(){
    this.htmlstring =  ``
  }

  async signOut() {
    const result = await this.authservice.signOut()

    switch (result.kind) {
      case 'ok':
        this.htmlstring = `<p>Signed out</p>`
        break;
      case 'err':
        this.htmlstring = `${result.error}`;
        break;
    }
  }
}
