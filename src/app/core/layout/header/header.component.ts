import { Component, computed, inject, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { filter } from "rxjs";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from "src/app/features/services/auth.service";

@Component({
  selector: "app-layout-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  standalone: true,
})
export class HeaderComponent implements OnInit {

  authservice = inject(AuthService);
  routeName: string = '';
  isLoggedIn = computed(() => !!this.authservice.currentUserSignal());


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

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setRouteName();
    });
  }

  setRouteName() {
    const currentRoute = this.router.routerState.snapshot.root.firstChild;
    if (currentRoute?.data) {
      this.routeName = currentRoute.data['name'] || '';
    }
  }

  currentRouteName() {
    return this.routeName;
  }
}