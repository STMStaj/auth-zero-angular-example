import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '@auth0/auth0-angular';
import { DatePickerModule } from 'primeng/datepicker';
import { CapitalizePipe } from '../../../lib/capitalize.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [DatePickerModule, FormsModule, AsyncPipe, CapitalizePipe],
  template: `
    @let user = auth.user$ | async;
    @if (user) {
      <ul>
        @if (user.name) { <li> <strong>name:</strong> <br> {{ user.name | capitalize }}</li> }
        @if (user.given_name) { <li> <strong>given_name:</strong> <br> {{ user.given_name | capitalize }}</li> }
        @if (user.family_name) { <li> <strong>family_name:</strong> <br> {{ user.family_name | capitalize }}</li> }
        @if (user.middle_name) { <li> <strong>middle_name:</strong> <br> {{ user.middle_name | capitalize }}</li> }
        @if (user.nickname) { <li> <strong>nickname:</strong> <br> {{ user.nickname | capitalize }}</li> }
        @if (user.preferred_username) { <li> <strong>preferred_username:</strong> <br> {{ user.preferred_username | capitalize }}</li> }
        @if (user.profile) { <li> <strong>profile:</strong> <br> {{ user.profile }}</li> }
        @if (user.picture) { <li> <strong>picture:</strong> <br> <img width="30px" src="{{ user.picture }}"></li> }
        @if (user.website) { <li> <strong>website:</strong> <br> {{ user.website }}</li> }
        @if (user.email) { <li> <strong>email:</strong> <br> {{ user.email }}</li> }
        @if (user.email_verified) { <li> <strong>email_verified:</strong> <br> {{ user.email_verified }}</li> }
        @if (user.gender) { <li> <strong>gender:</strong> <br> {{ user.gender }}</li> }
        @if (user.birthdate) { <li> <strong>birthdate:</strong> <br> {{ user.birthdate }}</li> }
        @if (user.zoneinfo) { <li> <strong>zoneinfo:</strong> <br> {{ user.zoneinfo }}</li> }
        @if (user.locale) { <li> <strong>locale:</strong> <br> {{ user.locale }}</li> }
        @if (user.phone_number) { <li> <strong>phone_number:</strong> <br> {{ user.phone_number }}</li> }
        @if (user.phone_number_verified) { <li> <strong>phone_number_verified:</strong> <br> {{ user.phone_number_verified }}</li> }
        @if (user.address) { <li> <strong>address:</strong> <br> {{ user.address }}</li> }
        @if (user.updated_at) { <li> <strong>updated_at:</strong> <br> <p-datepicker [(ngModel)]="date" [defaultDate]="date()" [inline]="true" [disabled]="true" /> </li> }
        @if (user.sub) { <li> <strong>sub:</strong> <br> {{ user.sub }}</li> }
      </ul>
    }
  `,
  standalone: true
})
export class UserProfileComponent {
  date = signal<Date | null>(null);
  constructor(public auth: AuthService) {
    let callback = (value: User | null | undefined) => {
      let d = new Date(value?.updated_at!);
      d.setFullYear(d.getFullYear() - 1);
      d.setDate(d.getDate() - 1);
      this.date.set(d);
    };
    auth.user$.subscribe({ next: callback });
  }
}