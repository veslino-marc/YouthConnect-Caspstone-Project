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
import { ManageAdminPage } from './pages/sk-official/manage-admin/manage-admin';
// Administrator pages
import { AdministratorLogin } from './pages/administrator/login/login';
import { AdministratorDashboard } from './pages/administrator/dashboard/dashboard';
import { ManageAdministratorsPage } from './pages/administrator/manage-administrators/manage-administrators';
import { ManageSkOfficialsPage } from './pages/administrator/manage-sk-officials/manage-sk-officials';
import { ManageYouthMembersPage } from './pages/administrator/manage-youth-members/manage-youth-members';
import { SystemStatisticsPage } from './pages/administrator/system-statistics/system-statistics';
import { BackupRestorePage } from './pages/administrator/backup-restore/backup-restore';
import { SystemControlPage } from './pages/administrator/system-control/system-control';

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
  { path: 'sk-official/manage-admin', component: ManageAdminPage },
  // Administrator routes
  { path: 'administrator/login', component: AdministratorLogin },
  { path: 'administrator/dashboard', component: AdministratorDashboard },
  { path: 'administrator/manage-administrators', component: ManageAdministratorsPage },
  { path: 'administrator/manage-sk-officials', component: ManageSkOfficialsPage },
  { path: 'administrator/manage-youth-members', component: ManageYouthMembersPage },
  { path: 'administrator/system-statistics', component: SystemStatisticsPage },
  { path: 'administrator/backup-restore', component: BackupRestorePage },
  { path: 'administrator/system-control', component: SystemControlPage },
];
