import { Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { RegisterComponent } from './features/pages/register/register.component';
import { LoginComponent } from './features/pages/login/login.component';
import { LogOutComponent } from './features/pages/logout/logout.component';

import { ArchivedComponent } from './features/pages/archived/archived.component';
import { BookKeepingDetailComponent } from './features/pages/bookkeepingDetail/bookKeepingDetail.component';
import { BookKeepingListComponent } from './features/pages/bookKeepingList/bookKeepingList.component';
import { BookKeepingEditComponent } from './features/pages/bookKeepingEdit/bookKeepingEdit.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'bookkeepings',
        pathMatch: 'full'
    },
    {
        path: "bookkeepings",
        canActivate: [AuthGuard],
        loadComponent: () => BookKeepingListComponent,
        data: { name: "Bookkeepings", authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "bookkeepings/:bookkeepingName",
        canActivate: [AuthGuard],
        loadComponent: () => BookKeepingDetailComponent,
        data: { name: "Bookkeeping", authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "bookkeepings/:bookkeepingName/edit",
        canActivate: [AuthGuard],
        loadComponent: () => BookKeepingEditComponent,
        data: { name: "Bookkeeping", authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "archived",
        canActivate: [AuthGuard],
        loadComponent: () => ArchivedComponent,
        data: { name: "Archived bookkeepings" , authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: "archived/:bookkeepingName",
        loadComponent: () => ArchivedComponent,
        canActivate: [AuthGuard],
        data: { name: "Archived bookkeepings", authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "signin",
        loadComponent: () => LoginComponent,
        data: { name: "Sign in" }
    },
    {
        path: "signup",
        loadComponent: () => RegisterComponent,
        data: { name: "Sign up" }
    },
    {
        path: "signout",
        canActivate: [AuthGuard],
        loadComponent: () => LogOutComponent,
        data: { name: "Sign up" }
    }

];
