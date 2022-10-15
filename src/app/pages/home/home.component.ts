import {Component, OnDestroy, OnInit} from '@angular/core';
import {webSocket} from "rxjs/webSocket";
import {concatMap, delay, of, Subscription} from "rxjs";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  chartData: any;
  chardata: any[] = [];
  charTime: any[] = [];
  chartOptions: any;
  rate: any;
  rate$!: Subscription;
  Highcharts: typeof Highcharts = Highcharts;
  subject = webSocket('wss://ws.coincap.io/prices?assets=bitcoin');

  constructor() {

  }

  ngOnDestroy(): void {
    this.subject.complete();
  }


  ngOnInit(): void {
    this.initChart();
  }


  initChart() {
    this.subject.pipe(
      concatMap(item => of(item).pipe(delay(1000)))
    ).subscribe((res) => {
      this.rate = res;
      //const point = [new Date().getTime(), value * 10];
      this.chardata.push(Number(this.rate.bitcoin));
      if (this.chardata.length > 12) this.chardata.splice(0, 1);

      this.chartOptions = {
        series: [{
          name: 'Bitcoin',
          data: this.chardata,
        },],
        chart: {
          type: "spline",
          zoomType: 'x'
        },
        title: {
          text: "Spline",
        },
        subtitle: {
          text: 'Source Data: wss://ws.coincap.io/prices?assets=bitcoin'
        },

        yAxis: {
          title: {
            text: 'Value'
          },
          accessibility: {
            description: 'Value'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },

        xAxis: {

          tickPixelInterval: 150,
          labels: {
            maxStaggerLines: 10,
            step: 0,
            style: {
              color: 'red',
              fontSize: '12px'
            }
          }
        },

        accessibility: {
          announceNewData: {
            enabled: true,
            minAnnounceInterval: 15000
          }
        },
      };

    });
  }


}
