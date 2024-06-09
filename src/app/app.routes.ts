import { Routes } from '@angular/router';
import { HomeComponent } from "./features/pages/home/home.component";
import { ArchivedComponent } from './features/pages/archived/archived.component';
import { BookkeepingComponent } from './features/pages/bookkeeping/bookkeeping.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/bookkeepings',
        pathMatch: 'full'
    },
    {
        path: "bookkeepings",
        loadComponent: () => HomeComponent,
        data: { name: "Bookkeepings" }
    },
    {
        path: "bookkeepings/:bookkeepingName",
        loadComponent: () => BookkeepingComponent,
        data: { name: "Bookkeeping" }
    },
    {
        path: "archived",
        loadComponent: () => ArchivedComponent,
        data: { name: "Archived bookkeepings" }
    },
    {
        path: "archived/:bookkeepingName",
        loadComponent: () => ArchivedComponent,
        data: { name: "Archived bookkeepings" }
    },
];
