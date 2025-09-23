import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from '../lib/log.interceptor';
import { definePreset } from '@primeuix/themes';

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
        preset: definePreset(Aura, {
          semantic: {
            colorScheme: {
              light: {
                primary: {
                  color: 'navy',
                  inverseColor: '#ffffff',
                  hoverColor: '{blue.900}',
                  activeColor: '{blue.800}'
                },
                highlight: {
                  background: 'navy',
                  focusBackground: '{blue.700}',
                  color: '#ffffff',
                  focusColor: '#ffffff'
                }
              },
              dark: {
                primary: {
                  color: '{blue.50}',
                  inverseColor: 'navy',
                  hoverColor: '{blue.100}',
                  activeColor: '{blue.200}'
                },
                highlight: {
                  background: 'rgba(250, 250, 250, .16)',
                  focusBackground: 'rgba(250, 250, 250, .24)',
                  color: 'rgba(255,255,255,.87)',
                  focusColor: 'rgba(255,255,255,.87)'
                }
              }
            }
          }
        }),
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
