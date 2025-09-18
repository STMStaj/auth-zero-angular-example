import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from '../lib/log.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authHttpInterceptorFn, loggingInterceptor]),
    ),
    provideAuth0({
      domain: 'dev-fp320m1awpsaeyz6.eu.auth0.com',
      clientId: 'lgfABpKLBIs9AQLdF7TmpebRVUAUMCVp',
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
      // BEGIN AUTH INTERCEPTOR: ENSURES CORRECT AUTHORIZATION HEADERS (which are unneccessary with this API)
      httpInterceptor: {
        allowedList: [
          {
            uri: 'https://jsonplaceholder.typicode.com/*',
          }
        ]
      }
      // END AUTH INTERCEPTOR
    }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
