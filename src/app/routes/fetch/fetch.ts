import { JsonPipe } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Observer } from 'rxjs';
import { FetchService } from '../../services/fetch.service';

@Component({
    selector: 'app-root',
    templateUrl: './fetch.html',
    styleUrl: './fetch.css',
    imports: [JsonPipe]
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

    constructor(private service: FetchService) { }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.service.getData().subscribe(this.callback);
    }
}
