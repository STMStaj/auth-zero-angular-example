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
    styles: [
      `button {
        color: white;
        padding: 0.5rem;
        cursor: pointer;
        font-weight: 500;
        background-color: navy;
        border-radius: 8px;
        border-style: none;
        box-sizing: border-box;
        transition: background-color 100ms;
        text-decoration: none;
      }
      
      button:hover {
        background-color: black;
      }`,
    ],
    standalone: true
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { }
}