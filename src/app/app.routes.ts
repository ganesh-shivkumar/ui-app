import { Routes } from '@angular/router';
import { PlaygroundComponent } from './homepage/playground.component';
import { LoginComponent } from './homepage/login.component';

export const routes: Routes = [
    { path: 'playground', component: PlaygroundComponent },
    { path: 'login', component: LoginComponent },
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
];
