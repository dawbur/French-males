import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FrenchMenService } from '../french-men.service';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-french-men',
  templateUrl: './french-men.component.html',
  styleUrls: ['./french-men.component.scss']
})
export class FrenchMenComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  frenchMales: Array<any> = [];
  frenchMalesGroupedByAgeDecades: Array<any> = [];
  topTenOldest: Array<any> = [];
  statisticsVisible: boolean = false;
  showTextBackground: boolean = false;

  barChartOptions: ChartConfiguration['options'];
  barChartType: ChartType = "bar";
  barChartPlugins = [
    DataLabelsPlugin
  ];
  barChartData: ChartData<'bar'> | undefined;

  displayedColumns: string[] = [];

  constructor(private frenchMenService: FrenchMenService) {
  }

  ngOnInit(): void {
    this.getFrenchMales();
    this.initRefreshCounterInfo();
  }

  getFrenchMales() {
    this.frenchMenService.getFrenchMales()
      .subscribe(males => {
        this.frenchMales = males;
        this.countByAgeDecades();
        this.initOptions();
        this.findTopTenOldestFrench();
      })
  }

  countByAgeDecades() {
    this.frenchMalesGroupedByAgeDecades = this.frenchMales
      .reduce(
        (p, c) => {
          const ageGroup = Math.floor(c.dob.age / 10);
          p[ageGroup] = (p[ageGroup] ?? 0) + 1;
          return p;
        },
        {}
      );
  }

  findTopTenOldestFrench() {
    this.topTenOldest = this.frenchMales
      .sort((a, b) => new Date(a.dob.date).getTime() - new Date(b.dob.date).getTime())
      .slice(0, 10);
  }

  private initOptions(): void {

    this.barChartOptions = {
      responsive: true,
      scales: {
        x: {},
        y: {
          min: 0
        }
      },
      plugins: {
        legend: {
          display: true,
        },
        datalabels: {
          anchor: 'end',
          align: 'end'
        }
      }
    };

    this.barChartType = 'bar';

    this.barChartData = {
      labels: Object.keys(this.frenchMalesGroupedByAgeDecades).map(key => `${key}0 - ${key}9`),
      datasets: [
        {
          data: Object.values(this.frenchMalesGroupedByAgeDecades), label: 'French men grouped by age',
        }
      ]
    };

    this.displayedColumns = ['picture', 'name', 'gender', 'phone', 'dob.age'];
  }

  private initRefreshCounterInfo() {
    const previousValue = localStorage.getItem('refreshCounter') ?? '0';
    this.showTextBackground = Number(previousValue) % 5 === 0;
    const currentValue = (Number(previousValue) + 1).toString();
    localStorage.setItem('refreshCounter', currentValue);
  }

}
