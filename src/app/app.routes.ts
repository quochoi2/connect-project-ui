import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HistoryActionViewComponent } from './pages/admin/admin-dashboard/history-action-view/history-action-view.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UnauthorizedComponent } from './layouts/unauthorized/unauthorized.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  // { path: '**', redirectTo: 'sign-up' },
  {
    path: 'sign-in',
    component: SigninComponent,
  },
  {
    path: 'sign-up',
    component: SignupComponent,
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: { role: 'admin' },
      },
      {
        path: 'history-action-view',
        component: HistoryActionViewComponent,
      },
      {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        canActivate: [AuthGuard],
        data: { role: 'user' },
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
