import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { HistoryActionViewComponent } from './pages/admin/admin-dashboard/history-action-view/history-action-view.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { CreateModalComponent } from './pages/user/user-dashboard/create-modal/create-modal.component';
import { UpdateModalComponent } from './pages/user/user-dashboard/update-modal/update-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// toast
import { ToastrModule } from 'ngx-toastr';

// metarials
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UnauthorizedComponent } from './layouts/unauthorized/unauthorized.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    // layout
    DefaultLayoutComponent,
    UnauthorizedComponent,
    // auth
    SigninComponent,
    SignupComponent,
    // admin
    AdminDashboardComponent,
    HistoryActionViewComponent,
    // user
    UserDashboardComponent,
    CreateModalComponent,
    UpdateModalComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
    // metarials
    MatSlideToggleModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
