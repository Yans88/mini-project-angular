import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTransaksiComponent} from "./list-transaksi/list-transaksi.component";

const routes: Routes = [
  {
    path: '',
    component: ListTransaksiComponent
  }, {
    path: 'approve',
    component: ListTransaksiComponent
  }, {
    path: 'reject',
    component: ListTransaksiComponent
  }, {
    path: 'cancel',
    component: ListTransaksiComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaksiRoutingModule {
}
