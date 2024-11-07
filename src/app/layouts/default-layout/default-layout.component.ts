import { Component } from '@angular/core';
import { authService } from '../../services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent {
  constructor(private authService: authService, private router: Router) {}
  signOut() {
    this.authService.signOut();
    this.router.navigate(['/sign-in']);
  }
}
