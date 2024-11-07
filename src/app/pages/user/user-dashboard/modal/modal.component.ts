import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { IConnectAdmin } from '../../../../models/connect-admin';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { connectService } from '../../../../services/pageService/connectService';
import { authService } from '../../../../services/authService';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { toastService } from '../../../../shared/toast';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { userService } from '../../../../services/pageService/userService';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  serviceTypes: string[] = ['Dich vu ket noi', 'Internet', 'VPN'];
  connectTypes: string[] = ['ket noi 1', 'ket noi 2', 'ket noi 3'];
  durations: { value: number; view: string }[] = [
    {
      value: 2,
      view: 'Ket noi 2 phut',
    },
    {
      value: 5,
      view: 'Ket noi 5 phut',
    },
    {
      value: 10,
      view: 'Ket noi 10 phut',
    },
  ];
  moderators: string[] = [];

  connectData: any = {
    idFirst: '',
    portSource: '',
    idLast: '',
    portTo: '',
    duration: 0,
    serviceType: '',
    connectType: '',
    status: 0,
    moderator: 'Nobody',
    timeStart: new Date().toISOString(),
    note: '',
    user_id: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { element?: IConnectAdmin },
    private connectService: connectService,
    private authService: authService,
    private toastr: toastService,
    private userService: userService
  ) {
    if (data.element) {
      this.connectData = { ...data.element };
      this.isEditMode = true;
    }
  }

  ngOnInit() {
    this.loadAdminUsers();
  }

  async loadAdminUsers() {
    try {
      const adminUsers = await this.userService.getUsersWithAdminRole();
      this.moderators = adminUsers.map((user: any) => user.name);
    } catch (error) {
      this.toastr.error('Failed to load admin users', 'Error');
    }
  }

  async save() {
    if (this.isEditMode) {
      await this.connectService.updateConnect(this.connectData);
      this.toastr.success('Created successfully!', 'Notification');
    } else {
      await this.connectService.createConnect(
        this.connectData,
        this.authService.currentUserValue.id
      );
      this.toastr.success('Updated successfully!', 'Notification');
    }
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
