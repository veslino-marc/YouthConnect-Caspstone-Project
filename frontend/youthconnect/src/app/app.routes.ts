import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
// Youth Member pages
import { Dashboard as YouthDashboard } from './pages/youth-member/dashboard/dashboard';
import { CreateConcern } from './pages/youth-member/create-concern/create-concern';
import { Events } from './pages/youth-member/events/events';
import { Notification } from './pages/youth-member/notification/notification';
// SK Official pages
import { Dashboard as SkDashboard } from './pages/sk-official/dashboard/dashboard';
import { Concerns } from './pages/sk-official/concerns/concerns';
import { CreateEvent } from './pages/sk-official/create-event/create-event';
import { ManageProfiling } from './pages/sk-official/manage-profiling/manage-profiling';
import { TaskTracker } from './pages/sk-official/task-tracker/task-tracker';
import { BackupRestore } from './pages/sk-official/backup-restore/backup-restore';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  // Youth Member routes
  { path: 'youth-member/dashboard', component: YouthDashboard },
  { path: 'youth-member/create-concern', component: CreateConcern },
  { path: 'youth-member/events', component: Events },
  { path: 'youth-member/notifications', component: Notification },
  // SK Official routes
  { path: 'sk-official/dashboard', component: SkDashboard },
  { path: 'sk-official/concerns', component: Concerns },
  { path: 'sk-official/create-event', component: CreateEvent },
  { path: 'sk-official/manage-profiling', component: ManageProfiling },
  { path: 'sk-official/task-tracker', component: TaskTracker },
  { path: 'sk-official/backup-restore', component: BackupRestore },
];
