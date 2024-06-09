import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { filter } from "rxjs";
@Component({
  selector: "app-layout-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
})
export class HeaderComponent {
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