import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { IConnectAdmin } from '../../../../models/connect-admin';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { connectService } from '../../../../services/connectService';
import { authService } from '../../../../services/authService';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { toastService } from '../../../../shared/toast';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  connectData: any = {
    idFirst: '',
    portSource: '',
    idLast: '',
    portTo: '',
    pending: 1,
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
    private toastr: toastService
  ) {
    if (data.element) {
      this.connectData = { ...data.element };
      this.isEditMode = true;
    }
  }

  async ngOnInit() {
    this.connectData.user_id = this.authService.getUser().id;
  }

  async save() {
    if (this.isEditMode) {
      await this.connectService.updateConnect(this.connectData);
      this.toastr.success('Created successfully!', 'Notification');
    } else {
      await this.connectService.createConnect(
        this.connectData,
        this.connectData.user_id
      );
      this.toastr.success('Updated successfully!', 'Notification');
    }
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
