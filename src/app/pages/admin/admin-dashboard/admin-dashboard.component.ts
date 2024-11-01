import { Component, ViewChild } from '@angular/core';
import { FontAwesomeService } from '../../../shared/icon';
import { IConnectAdmin } from '../../../models/connect-admin';
import { connectService } from '../../../services/connectService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { historyService } from '../../../services/historyService';
import { authService } from '../../../services/authService';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  dataSource = new MatTableDataSource<IConnectAdmin>([]);
  currentPage: number = 1;
  totalItems: number = 0;
  userName: string = '';

  constructor(
    public faService: FontAwesomeService,
    private connectService: connectService,
    private historyService: historyService,
    private authService: authService,
    private router: Router
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
    this.userName = this.authService.getUser().name;
    this.loadConnects(this.currentPage, 8);
    setInterval(() => {
      this.loadConnects(this.currentPage, 8);
    }, 20000); // mini second
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async loadConnects(page: number, limit: number) {
    const response = await this.connectService.getAllConnects(page, limit);
    this.dataSource = response.data.data;
    // .map((item: any) => ({
    //   ...item,
    //   updatedAt: formatDate(item.updatedAt),
    // }));
    this.currentPage = page;
    this.totalItems = response.data.totalItems;
  }

  async handleOpenAndCloseConnect(element: any, action: 'open' | 'close') {
    if (action == 'open') {
      await this.connectService.openConnect(element.id, this.userName);
    } else {
      await this.connectService.closeConnect(element.id);
    }
    await this.historyService.historyAddConnect({
      action: action,
      moderator: this.userName,
      connect_id: element.id,
    });
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
