import { Routes } from '@angular/router';
import { About } from './routes/about/about';
import { Error } from './routes/error/error';
import { Index } from './routes/index';

export const routes: Routes = [
    {
        component: Index,
        path: ''
    },
    {
        component: About,
        path: 'about'
    },
    {
        component: Error,
        path: '**'
    }
];
