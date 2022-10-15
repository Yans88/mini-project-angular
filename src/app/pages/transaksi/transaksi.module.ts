import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TransaksiRoutingModule} from './transaksi-routing.module';
import {ListTransaksiComponent} from './list-transaksi/list-transaksi.component';
import {TableModule} from "primeng/table";
import {GradePipePipe} from "../../pipe/grade-pipe.pipe";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DividerModule} from "primeng/divider";
import {SplitterModule} from "primeng/splitter";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    ListTransaksiComponent,
    GradePipePipe
  ],
  imports: [
    CommonModule,
    TransaksiRoutingModule,
    TableModule, InputTextModule, DialogModule, ConfirmDialogModule, DividerModule, SplitterModule, ToastModule
  ]
})
export class TransaksiModule {
}
