import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'master_harga',
    loadChildren: () => import('./master-harga/master-harga.module').then((m) => m.MasterHargaModule),
  },
  {
    path: 'transaksi',
    loadChildren: () => import('./transaksi/transaksi.module').then((m) => m.TransaksiModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
