import { Component,inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  private authservice : AuthService = inject(AuthService);
  public errorMessage : string | null = null;

  constructor(private router: Router){}

  signUp(email: string, username : string, password: string) {
    this.authservice
      .register(email, username, password)
      .subscribe({
        next: (_) => {
          this.router.navigate(['/signin']);
        },
        error: (error) => {
          this.errorMessage = `${error}`;
        }
      });
  }

 }
