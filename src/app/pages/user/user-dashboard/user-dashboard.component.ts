import { Component, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IConnectAdmin } from '../../../models/connect-admin';
import { FontAwesomeService } from '../../../shared/icon';
import { connectService } from '../../../services/connectService';
import { historyService } from '../../../services/historyService';
import { authService } from '../../../services/authService';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { toastService } from '../../../shared/toast';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent {
  readonly dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<IConnectAdmin>([]);
  currentPage: number = 1;
  totalItems: number = 0;
  userId: number = 0;
  previousPendingItems: { [id: number]: number } = {};

  constructor(
    public faService: FontAwesomeService,
    private connectService: connectService,
    private historyService: historyService,
    private authService: authService,
    private router: Router,
    private toastr: toastService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'idFirst',
    'portSource',
    'idLast',
    'portTo',
    'pending',
    'moderator',
    'note',
    'updatedAt',
    'actions',
  ];

  ngOnInit() {
    this.userId = this.authService.getUser().id;
    this.loadConnects(this.currentPage, 8);
    setInterval(() => {
      this.loadConnects(this.currentPage, 8);
    }, 20000); // mini second
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async loadConnects(page: number, limit: number) {
    const previousData = this.dataSource.data.slice();
    const response = await this.connectService.getAllConnectByUserId(
      page,
      limit,
      this.userId
    );
    this.dataSource.data = response.data.data;
    this.currentPage = page;
    this.totalItems = response.data.totalItems;

    this.dataSource.data.forEach((connect, index) => {
      const previousConnect = previousData.find((c) => c.id === connect.id);
      if (previousConnect) {
        if (previousConnect.pending !== connect.pending) {
          if (connect.pending === 0) {
            this.toastr.success(
              `Connection from ${connect.idFirst} to ${connect.idLast} has been opened.`,
              'Nofication'
            );
          } else if (connect.pending === 1) {
            this.toastr.warning(
              `Connection from ${connect.idFirst} to ${connect.idLast} has been closed.`,
              'Nofication'
            );
          }
        }
      }
    });
  }

  openDialog(element?: IConnectAdmin) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadConnects(this.currentPage, 8);
      }
    });
  }

  async handleCreateConnect() {
    this.openDialog();
  }

  async handleUpdateConnect(element: IConnectAdmin) {
    this.openDialog(element);
  }

  async handleSoftDeleteConnect(element: number) {
    await this.connectService.deleteConnect(element);
    this.toastr.success('Deleted successfully!', 'Notification');
    this.loadConnects(this.currentPage, 8);
  }

  goToConnectionTrash() {
    this.router.navigate(['/connection-trash']);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.loadConnects(this.currentPage, pageSize);
  }
}
