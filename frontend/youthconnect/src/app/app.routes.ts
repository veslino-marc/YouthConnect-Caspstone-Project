import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { LoginPage } from './pages/login-page/login-page';
import { Dashboard as YouthDashboard } from './pages/youth-member/dashboard/dashboard';
import { Dashboard as SkDashboard } from './pages/sk-official/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'login', component: LoginPage },
  { path: 'youth-member/dashboard', component: YouthDashboard },
  { path: 'sk-official/dashboard', component: SkDashboard },
];
