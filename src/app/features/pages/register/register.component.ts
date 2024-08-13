import { Component,inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  private authservice : AuthService = inject(AuthService);
  public htmlstring : string;

  constructor(){
    this.htmlstring =  ``
  }

  async signUp(email: string, password: string) : Promise<void> {
    const result = await this.authservice.signUp(email, password);

    switch (result.kind) {
      case 'ok':
        this.htmlstring = `<p>Signed up succesfully</p>`
        break;
      case 'err':
        this.htmlstring = `${result.error}`;
        break;
    }
  }

}
