import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, RouterLink, RouterLinkActive],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adweb';
  routeName: string = '';

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