import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { StrapiService } from '../../../lib/strapi.service';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './posts.html',
  styleUrls: ['./posts.css'],
  styles: [
    `p-datepicker {
      pointer-events: none;
    }`
  ],
  imports: [
    AsyncPipe,
    ProgressSpinnerModule,
    SkeletonModule,
    TableModule,
    FormsModule,
    DatePickerModule
  ],
})
export class Posts implements OnInit {
  date = signal<Date | null>(null);
  dates = signal<Map<number, Date>>(new Map());
  posts: WritableSignal<any[]> = signal(new Array(100).fill({ loading: true }));

  constructor(public auth: AuthService, private strapi: StrapiService) {}

  ngOnInit() {
    this.strapi.getContentType('posts').subscribe((posts) => {
      this.posts.set(posts);
      (posts as Array<any>).forEach(p => {
        this.dates.update(m => m.set(p.id, new Date(p.created_at)));
      });
    });
  }
}
