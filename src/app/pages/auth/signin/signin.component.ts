import { Component } from '@angular/core';
import { authService } from '../../../services/authService';
import { Router } from '@angular/router';
import { toastService } from '../../../shared/toast';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  email = '';
  password = '';

  constructor(
    private authService: authService,
    private router: Router,
    private toastr: toastService
  ) {}

  async onSignin() {
    try {
      const user = await this.authService.signin({
        email: this.email,
        password: this.password,
      });

      if (user.role == 1) {
        this.router.navigate(['/admin-dashboard']);
        this.toastr.success('Login successfully!', 'Admin Dashboard');
      } else if (user.role == 0) {
        this.router.navigate(['/user-dashboard']);
        this.toastr.success('Login successfully!', 'User Dashboard');
      }
    } catch (error) {
      this.toastr.error('Invalid email or password!', 'Login Failed');
    }
  }

  goToSignup() {
    this.router.navigate(['/sign-up']);
  }
}
