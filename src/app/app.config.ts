import { ApplicationConfig, importProvidersFrom} from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes"
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth'
import { initializeApp } from 'firebase/app';
import { environment } from '../environment/environment';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth())
  ),
  ],
};