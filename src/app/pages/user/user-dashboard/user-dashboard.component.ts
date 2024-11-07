import { Component, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IConnectAdmin } from '../../../models/connect-admin';
import { FontAwesomeService } from '../../../shared/icon';
import { connectService } from '../../../services/pageService/connectService';
import { authService } from '../../../services/authService';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { toastService } from '../../../shared/toast';
import { historyService } from '../../../services/pageService/historyService';

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
  previousPendingItems: { [id: number]: number } = {};

  notificationsShown: Set<number> = new Set();
  notifications: string[] = [];
  hasNewNotification: boolean = false;
  showNotifications: boolean = false;

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
    'serviceType',
    'connectType',
    'moderator',
    'duration',
    'status',
    // 'timeExpired',
    'note',
    'updatedAt',
    'actions',
  ];

  ngOnInit() {
    this.loadConnects(this.currentPage, 8);
    setInterval(() => {
      this.loadConnects(this.currentPage, 8);
    }, 20000);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadConnects(page: number, limit: number) {
    this.connectService
      .getAllConnectByUserId(page, limit, this.authService.currentUserValue.id)
      .then((response: any) => {
        const previousData = this.dataSource.data.slice();

        this.currentPage = page;
        this.dataSource.data = response.data;
        this.totalItems = response.totalItems;

        this.dataSource.data.forEach((connect: any) => {
          const previousConnect = previousData.find((c) => c.id === connect.id);
          if (previousConnect) {
            if (previousConnect.status !== connect.status) {
              if (connect.status === 0) {
                const message = `Connection from ${connect.idFirst} to ${connect.idLast} has been opened.`;
                this.notifications.push(message);
                // this.toastr.success(message, 'Notification');
                this.hasNewNotification = true;
              } else if (connect.status === 1) {
                const message = `Connection from ${connect.idFirst} to ${connect.idLast} has been closed.`;
                this.notifications.push(message);
                // this.toastr.warning(message, 'Notification');
                this.hasNewNotification = true;
              }
            }
          }

          // check time out
          const timeExpired = new Date(connect.timeExpired);
          const now = new Date();
          const timeDiff = timeExpired.getTime() - now.getTime(); // time left (milisecond)
          const warningTime = 1 * 60 * 1000; // milisecond

          if (
            timeDiff > 0 &&
            timeDiff <= warningTime &&
            !this.notificationsShown.has(connect.id)
          ) {
            const message = `Connection from ${connect.idFirst} to ${connect.idLast} is about to expire in 1 minute.`;
            this.notifications.push(message);
            this.hasNewNotification = true;
            this.notificationsShown.add(connect.id);
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching connections:', error);
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

  async handleSendConnect(element: any) {
    await this.connectService.sendConnect(element.id);
    this.toastr.success('Connection was sent successfully!', 'Notification');
    this.loadConnects(this.currentPage, 8);
  }

  async handleDeleteConnect(element: number) {
    const confirmation = window.confirm(
      'Are you sure you want to delete this connect?'
    );
    if (confirmation) {
      await this.connectService.deleteConnect(element);
      this.toastr.success('Deleted successfully!', 'Notification');
    }
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

  toggleNofication() {
    if (this.showNotifications) {
      this.hasNewNotification = false;
    }
    this.showNotifications = !this.showNotifications;
  }
}
