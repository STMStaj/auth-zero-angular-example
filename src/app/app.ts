import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthButtonComponent } from './components/auth/auth.component';
import { UserProfileComponent } from './components/auth/profile.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthButtonComponent, UserProfileComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('auth-zero');
}
