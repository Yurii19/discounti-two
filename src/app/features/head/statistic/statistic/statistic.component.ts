
import {Component, ViewChild, AfterViewInit, OnInit, ElementRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import {CategoriesStatistic, IAppState, VendorStatistic} from "../../../../shared/interfaces";
import { Store } from "@ngrx/store";
import { StatisticService } from "../../../../core/services/statistic.service";
import { MatTableDataSource } from "@angular/material/table";
import { ChartDataSets, ChartOptions, ChartType} from "chart.js";
import { Label } from "ng2-charts";
import * as XLSX from 'xlsx';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements AfterViewInit, OnInit {
  panelOpenStateVendors = false;
  panelOpenStateCategories = false;

  //variables for vendors table
  displayedColumns: string[] = [
    'name',
    'discountsNumber',
    'viewNumber',
    'numberOfGettingPromo',
  ];
  resultsLength = 0;
  isRateLimitReached = false;
  dataSourceVendors: MatTableDataSource<VendorStatistic>;

  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator!: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort!: MatSort;
  @ViewChild('TABLE_ONE') tableVendors!: ElementRef;

  //variables chart by discounts
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  labels: Observable<any>[] = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Number of discount views' },
  ];
  chartColors: any[] = [{ backgroundColor: '#40bfef' }];

  //variables for categories table
  displayedColumnsTwo: string[] = [
    'name',
    'discountsNumber',
    'viewNumber',
    'numberOfGettingPromo',
  ];
  resultsLengthTwo = 0;
  isRateLimitReachedTwo = false;
  dataSourceCategories: MatTableDataSource<CategoriesStatistic>;

  @ViewChild('TableTwoPaginator', {static: true}) tableTwoPaginator!: MatPaginator;
  @ViewChild('TableTwoSort', {static: true}) tableTwoSort!: MatSort;
  @ViewChild('TABLE_TWO') tableCategories!: ElementRef;


  constructor(private store: Store<IAppState>,
              private statisticService: StatisticService) {
    this.dataSourceVendors = new MatTableDataSource;
    this.dataSourceCategories = new MatTableDataSource;
  }

  ngOnInit(): void {
    this.dataSourceVendors.paginator = this.tableOnePaginator;
    this.dataSourceVendors.sort = this.tableOneSort;

    this.dataSourceCategories.paginator = this.tableTwoPaginator;
    this.dataSourceCategories.sort = this.tableTwoSort;

    this.tableOneSort.sortChange.subscribe(
      () => (this.tableOnePaginator.pageIndex = 0)
    );
    this.tableTwoSort.sortChange.subscribe(
      () => (this.tableTwoPaginator.pageIndex = 0)
    );

    merge(this.tableOneSort.sortChange, this.tableOnePaginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.statisticService
            .getStatisticVendors({
              sortBy: this.tableOneSort.active,
              sortDirection: this.tableOneSort.direction,
              page: this.tableOnePaginator.pageIndex,
            })
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.total_count;
          return data.items;
        })
      )
      .subscribe((data) => (this.dataSourceVendors = data));

    merge(this.tableTwoSort.sortChange, this.tableTwoPaginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.statisticService
            .getStatisticCategories({
              sortBy: this.tableTwoSort.active,
              sortDirection: this.tableTwoSort.direction,
              page: this.tableTwoPaginator.pageIndex,
            })
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isRateLimitReachedTwo = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLengthTwo = data.total_count;
          return data.items;
        })
      )
      .subscribe((data) => (this.dataSourceCategories = data));

    this.statisticService.getStatisticDiscounts().subscribe((res) => {
      let labels = res.items.map((el: any) => {
        return el.name;
      });
      let barData = res.items.map((el: any) => {
        return el.viewNumber;
      });
      this.barChartLabels.push(...labels);
      this.barChartData[0].data!.push(...barData);
    });
  }

  ExportTOExcel(type: string) {
    let table:any= {};
    let text:string = '';

    if (type === 'vendors') {
      table = this.tableVendors;
      text = 'Statistic by vendors';
    } else if (type === 'categories') {
      table = this.tableCategories;
      text = 'Statistic by categories';
    }

    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, text);

    /* save to file */
    XLSX.writeFile(wb, `${text}.xlsx`);
  }

  ngAfterViewInit() {}
}
