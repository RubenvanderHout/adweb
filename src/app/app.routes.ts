import { Routes } from '@angular/router';
import { HomeComponent } from "./features/pages/home/home.component";
import { ArchivedComponent } from './features/pages/archived/archived.component';
import { BookkeepingComponent } from './features/pages/bookkeeping/bookkeeping.component';
import { LoginComponent } from './features/pages/login/login.component';
import {AuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
export const routes: Routes = [

    {
        path: '',
        redirectTo: '/bookkeepings',
        pathMatch: 'full'
    },
    {
        path: "bookkeepings",
        loadComponent: () => HomeComponent,
        data: { name: "Bookkeepings",authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "bookkeepings/:bookkeepingName",
        loadComponent: () => BookkeepingComponent,
        data: { name: "Bookkeeping" }
    },
    {
        path: "archived",
        canActivate: [AuthGuard],
        loadComponent: () => ArchivedComponent,
        data: { name: "Archived bookkeepings" }
    },
    {
        path: "archived/:bookkeepingName",
        loadComponent: () => ArchivedComponent,
        data: { name: "Archived bookkeepings" }
    },
    {
        path: "login",
        loadComponent: () => LoginComponent,
        data: { name: "Login" }
    }

];
