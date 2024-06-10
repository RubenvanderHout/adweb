import { ApplicationConfig, importProvidersFrom} from "@angular/core";
import { provideRouter } from "@angular/router";

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, getFirestore } from "@angular/fire/firestore"

import { routes } from "./app.routes"
import { environment } from '../environment/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth())
  ), provideAnimationsAsync('noop'),
  ],
};