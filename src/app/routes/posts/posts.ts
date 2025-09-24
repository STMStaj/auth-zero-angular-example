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
  posts: WritableSignal<any[]> = signal(new Array(100).fill({ loading: true }));
  getDate = (date: string) => new Date(date);

  constructor(public auth: AuthService, private strapi: StrapiService) {}

  ngOnInit() {
    this.strapi.getContentType('posts').subscribe((posts: Array<any>) => {
      posts.map(p => p.created_at = new Date(p.created_at));
      posts.map(p => p.published_at = new Date(p.published_at));
      posts.map(p => p.updated_at = new Date(p.updated_at));
      this.posts.set(posts);
    });
  }
}
