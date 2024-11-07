import { Component, ViewChild } from '@angular/core';
import { FontAwesomeService } from '../../../shared/icon';
import { IConnectAdmin } from '../../../models/connect-admin';
import { connectService } from '../../../services/pageService/connectService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { authService } from '../../../services/authService';
import { historyService } from '../../../services/pageService/historyService';
import { toastService } from '../../../shared/toast';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  dataSource = new MatTableDataSource<IConnectAdmin>([]);
  currentPage: number = 1;
  totalItems: number = 0;

  constructor(
    public faService: FontAwesomeService,
    private connectService: connectService,
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
    'username',
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
    }, 20000); // mini second
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadConnects(page: number, limit: number) {
    this.connectService
      .getAllConnects(page, limit, this.authService.currentUserValue.name)
      .then((response: any) => {
        this.currentPage = page;
        this.dataSource.data = response.data;
        this.totalItems = response.totalItems;
      })
      .catch((error) => {
        console.error('Error fetching connections:', error);
      });
  }

  async handleOpenAndCloseConnect(element: any, action: 'open' | 'close') {
    if (action == 'open') {
      await this.connectService.openConnect(element.id);
      this.toastr.success(
        'Connection was opened successfully!',
        'Notification'
      );
    } else if (action == 'close') {
      await this.connectService.closeConnect(element.id);
      this.toastr.success(
        'Connection was closed successfully!',
        'Notification'
      );
    }
    this.loadConnects(this.currentPage, 8);
  }

  goToHistoryActions() {
    this.router.navigate(['/history-action-view']);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.loadConnects(this.currentPage, pageSize);
  }
}
