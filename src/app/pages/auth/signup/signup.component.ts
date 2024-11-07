import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from '../../../services/authService';
import { toastService } from '../../../shared/toast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';

  constructor(
    private authService: authService,
    private router: Router,
    private toastr: toastService
  ) {}

  async onSignup() {
    try {
      const user = await this.authService.signUp({
        name: this.name,
        email: this.email,
        password: this.password,
      });

      this.toastr.success('Account created successfully!', 'Signup Successful');
      this.router.navigate(['/sign-in']);
    } catch (error) {
      this.toastr.error('Signup failed. Please try again.', 'Signup Error');
    }
  }

  goToSignin() {
    this.router.navigate(['/sign-in']);
  }
}
