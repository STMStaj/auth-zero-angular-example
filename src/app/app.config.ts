import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAuth0({
      domain: 'dev-fp320m1awpsaeyz6.eu.auth0.com',
      clientId: 'lgfABpKLBIs9AQLdF7TmpebRVUAUMCVp',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
