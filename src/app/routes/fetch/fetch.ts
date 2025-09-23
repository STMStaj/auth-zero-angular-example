import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Observer } from 'rxjs';
import { FetchService } from '../../services/fetch.service';
import { AuthService, User } from '@auth0/auth0-angular';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-root',
    templateUrl: './fetch.html',
    styleUrl: './fetch.css',
    imports: [JsonPipe, AsyncPipe, ProgressSpinnerModule]
})
export class Fetch implements OnInit {
    private callback: Observer<Object> = {
        error: (err) => {
            console.error('Error fetching data:', err);
        },
        next: (value) => {
            this.data.set(value);
        },
        complete: () => {
        },
    }
    data: WritableSignal<any> = signal({});
    Object = Object;

    constructor(public auth: AuthService, private service: FetchService) { }

    ngOnInit() {
        this.auth.user$.subscribe(u => {
                if (u) {
                    this.fetchData(u);
                }
            }
        );
    }

    fetchData(user: User) {
        console.log("Request by " + user.email);
        this.service.getData().subscribe(this.callback);
    }
}
