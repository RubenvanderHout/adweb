import { Routes } from '@angular/router';
import { HomeComponent } from "./features/pages/home/home.component";
import { ArchivedComponent } from './features/pages/archived/archived.component';
import { BookkeepingComponent } from './features/pages/bookkeeping/bookkeeping.component';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => HomeComponent,
        data: { name: "Bookkeepings" }
    },
    {
        path: "archived",
        loadComponent: () => ArchivedComponent,
        data: { name: "Archived bookkeepings" }
    },
    {
        path: "bookkeeping",
        loadComponent: () => BookkeepingComponent,
        data: { name: "Bookkeeping" }
    },

];
