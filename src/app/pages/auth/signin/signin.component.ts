import { Component, OnInit } from '@angular/core';
import { authService } from '../../../services/authService';
import { Router } from '@angular/router';
import { toastService } from '../../../shared/toast';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: authService,
    private router: Router,
    private toastr: toastService
  ) {}

  onSignin() {
    this.authService
      .signIn({
        email: this.email,
        password: this.password,
      })
      .subscribe((response) => {
        if (response && response.success) {
          const currentUser = this.authService.currentUserValue;
          console.log(currentUser);

          if (currentUser.role === 'admin') {
            this.toastr.success('Login successfully', 'Admin');
            // this.router.navigate(['/admin-dashboard']);
            window.location.replace('/admin-dashboard');
          } else if (currentUser.role === 'user') {
            this.toastr.success('Login sucessfully', 'User');
            // this.router.navigate(['/user-dashboard']);
            window.location.replace('/user-dashboard');
          }
        } else {
          this.toastr.error('Login Failed', 'Nofitication');
        }
      });
  }

  goToSignup() {
    this.router.navigate(['/sign-up']);
  }
}
