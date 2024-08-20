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
  public errorMessage: string | null = null;

  constructor(private router : Router){}


  async signIn(email : string, password : string){
    this.authservice
      .login(email, password)
      .subscribe({
        next: (_) => {
          this.router.navigate(['/bookkeepings']);
        },
        error: (error) => {
          this.errorMessage = `${error}`;
        }
      });
  }

}
