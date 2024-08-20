import { Component,inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})

export class LogOutComponent implements OnInit {

  private authservice : AuthService = inject(AuthService);

  constructor(private router : Router){}

  ngOnInit(): void {
    this.authservice.user$.subscribe(user => {
      if (user) {
        this.authservice.currentUserSignal.set({
          userId: user.uid,
          email: user.email!,
          username: user.displayName!,
        })
      } else {
        this.authservice.currentUserSignal.set(null);
      }
    });
  }

  signOut() {
    this.authservice.logout()
    this.router.navigate(['/signin']);
  }
}
