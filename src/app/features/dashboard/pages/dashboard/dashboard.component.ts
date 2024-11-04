import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashBoardActions } from '../../store/dashboard.actions';
import { selectCryptos } from '../../store/dashboard.selectors';
import { AppState } from '../../../../reducers';
import { Crypto } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { tap } from 'rxjs';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ObjectToStringPipe } from '../../../../shared/pipes/object-to-string.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ObjectToStringPipe,
    HighchartsChartModule,
  ],

  standalone: true,
})
export class DashboardComponent implements OnInit {
  private liveAnnouncer = inject(LiveAnnouncer);
  private store = inject(Store<AppState>);

  dataSource = new MatTableDataSource<Crypto>();
  cryptos$ = this.store.select(selectCryptos).pipe(
    tap((cryptos) => {
      this.dataSource.data = cryptos;
      const sortedCryptos = [...cryptos].sort(
        (a, b) => b.market_cap - a.market_cap
      );
      const topCryptos = sortedCryptos.slice(0, 10);

      this.chartOptions = {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Market Capitalization of Top Cryptocurrencies',
        },
        xAxis: {
          categories: topCryptos.map((crypto) => crypto.name),
          title: {
            text: 'Cryptocurrency',
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Market Capitalization (USD)',
          },
        },
        series: [
          {
            name: 'Market Cap',
            data: topCryptos.map((crypto) => crypto.market_cap),
            type: 'column',
          },
        ],
      };
    })
  );
  displayedColumns: string[] = [
    'id',
    'name',
    'symbol',
    'current_price',
    'market_cap',
    'total_volume',
    'high_24h',
    'low_24h',
    'price_change_percentage_24h',
    'circulating_supply',
  ];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.store.dispatch(DashBoardActions.loadCrypto());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // Announce the sort state change for screen readers, execute custom logic, triggering server-side sorting
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
