import {Component, OnDestroy, OnInit} from '@angular/core';
import {webSocket} from "rxjs/webSocket";
import {concatMap, delay, of} from "rxjs";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  chardata: any[] = [];
  chartOptions: any;
  rate: any;
  rateEtherum: any;
  ratemonero: any;
  rateLitecoin: any;

  dateRate!: Date;
  dateRateEthereum!: Date;
  dateRateMonero!: Date;
  dateRateLiteCoin!: Date;

  Highcharts: typeof Highcharts = Highcharts;
  subject = webSocket('wss://ws.coincap.io/prices?assets=bitcoin');
  subject_ethereum = webSocket('wss://ws.coincap.io/prices?assets=ethereum');
  subject_monero = webSocket('wss://ws.coincap.io/prices?assets=monero');
  subject_litecoin = webSocket('wss://ws.coincap.io/prices?assets=litecoin');

  constructor() {

  }

  ngOnDestroy(): void {
    this.subject.complete();
    this.subject_ethereum.complete();
    this.subject_monero.complete();
    this.subject_litecoin.complete();
  }


  ngOnInit(): void {
    this.initChart();
    this.getDataEthereum();
  }

  getDataEthereum() {
    this.subject_ethereum.pipe(
      concatMap(item => of(item).pipe(delay(1000)))
    ).subscribe((res) => {
      this.rateEtherum = res;
      this.rateEtherum = this.rateEtherum.ethereum ? this.rateEtherum.ethereum : 0;
      this.dateRateEthereum = new Date();
    });
    this.subject_monero.pipe(
      concatMap(item => of(item).pipe(delay(1000)))
    ).subscribe((res) => {
      this.ratemonero = res;
      this.ratemonero = this.ratemonero.monero ? this.ratemonero.monero : 0;
      this.dateRateMonero = new Date();
    });
    this.subject_litecoin.pipe(
      concatMap(item => of(item).pipe(delay(1000)))
    ).subscribe((res) => {
      this.rateLitecoin = res;
      this.rateLitecoin = this.rateLitecoin.litecoin ? this.rateLitecoin.litecoin : 0;
      this.dateRateLiteCoin = new Date();
    });
  }

  initChart() {
    this.subject.pipe(
      concatMap(item => of(item).pipe(delay(1000)))
    ).subscribe((res) => {
      this.rate = res;
      this.dateRate = new Date();
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
