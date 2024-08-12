import { Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { HomeComponent } from "./features/pages/home/home.component";
import { ArchivedComponent } from './features/pages/archived/archived.component';
import { BookkeepingComponent } from './features/pages/bookkeeping/bookkeeping.component';
import { LoginComponent } from './features/pages/login/login.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [

    {
        path: '',
        redirectTo: '/bookkeepings',
        pathMatch: 'full'
    },
    {
        path: "bookkeepings/:bookkeepingName",
        canActivate: [AuthGuard],
        loadComponent: () => BookkeepingComponent,
        data: { name: "Bookkeeping", authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "archived",
        canActivate: [AuthGuard],
        loadComponent: () => ArchivedComponent,
        data: { name: "Archived bookkeepings" ,authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: "archived/:bookkeepingName",
        loadComponent: () => ArchivedComponent,
        canActivate: [AuthGuard],
        data: { name: "Archived bookkeepings", authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "login",
        loadComponent: () => LoginComponent,
        data: { name: "Login" }
    }

];
