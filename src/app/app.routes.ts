import { Routes } from '@angular/router';
import HomeComponent from "./features/pages/home/home.component";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => HomeComponent,
    },
];