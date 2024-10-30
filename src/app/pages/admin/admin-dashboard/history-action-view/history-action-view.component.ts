import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IConnectAdminHistory } from '../../../../models/connect-admin';
import { connectService } from '../../../../services/connectService';
import { authService } from '../../../../services/authService';
import { historyService } from '../../../../services/historyService';

@Component({
  selector: 'app-history-action-view',
  templateUrl: './history-action-view.component.html',
  styleUrl: './history-action-view.component.scss',
})
export class HistoryActionViewComponent {
  dataSource = new MatTableDataSource<IConnectAdminHistory>([]);
  currentPage: number = 1;
  totalItems: number = 0;

  constructor(
    private authService: authService,
    private connectService: connectService,
    private historyService: historyService,
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'connect_id',
    'action',
    'moderator',
    'updatedAt',
  ];

  async ngOnInit() {
    await this.loadConnects(1, 8);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async loadConnects(page: number, limit: number) {
    const response = await this.historyService.getAllConnectHistories(
      page,
      limit
    );
    this.dataSource = response.data.data;
    console.log(this.dataSource);

    this.currentPage = page;
    this.totalItems = response.data.totalItems;
  }

  goToAdminDashboard() {
    this.router.navigate(['/admin-dashboard']);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.loadConnects(this.currentPage, pageSize);
  }
}
