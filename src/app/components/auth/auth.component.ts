import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-auth-button',
    imports: [AsyncPipe],
    template: `
      @let isAuthenticated = auth.isAuthenticated$ | async;
      <ng-container>
        @if (isAuthenticated) {
          <button (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })">
            Log out
          </button>
        } @else {
          <button (click)="auth.loginWithRedirect()">Log in</button>
        }
      </ng-container>
    `,
    standalone: true
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { }
}