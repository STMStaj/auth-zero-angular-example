import { AsyncPipe, JsonPipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { take } from 'rxjs';
import { FetchService } from '../../services/fetch.service';
import { AuthService, User } from '@auth0/auth0-angular';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './fetch.html',
  styleUrls: ['./fetch.css'],
  imports: [
    JsonPipe,
    AsyncPipe,
    ProgressSpinnerModule,
    TableModule,
    CurrencyPipe
  ],
})
export class Fetch implements OnInit {
  data: WritableSignal<any[]> = signal([]);

  constructor(public auth: AuthService, private service: FetchService) {}

  ngOnInit() {
    this.auth.user$.pipe(take(1)).subscribe((u) => {
      if (u) {
        this.fetchData(u);
      }
    });
  }

  fetchData(user: User) {
    console.log('Request by ' + user.email);
    this.service.getData().subscribe({
      next: (value) => {
        // Ensure it's an array
        this.data.set(Array.isArray(value) ? value : value.products);
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }
}
