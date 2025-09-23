import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthButtonComponent } from './components/auth/auth.component';
import { UserProfileComponent } from './components/auth/profile.component';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthButtonComponent, UserProfileComponent, ChipModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('auth-zero');

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
