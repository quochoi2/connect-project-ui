import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FontAwesomeService } from '../../../shared/icon';
import { IConnectAdmin } from '../../../models/connect-admin';
import { connectService } from '../../../services/connectService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  dataSource = new MatTableDataSource<IConnectAdmin>([]);
  totalItems = 0;

  constructor(
    public faService: FontAwesomeService,
    private connectService: connectService
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
    'createdAt',
    'actions',
  ];

  async ngOnInit() {
    await this.loadConnects(1, 8);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async loadConnects(page: number, limit: number) {
    try {
      const response = await this.connectService.getAllConnects(page, limit);
      this.dataSource = response.data.data;
      this.totalItems = response.data.totalItems;
    } catch (error) {
      console.error('Error loading connects:', error);
    }
  }

  onPageChange(event: any) {
    const page = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.loadConnects(page, pageSize);
  }
}
