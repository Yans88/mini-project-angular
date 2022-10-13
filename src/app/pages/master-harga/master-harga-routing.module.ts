import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListMasterHargaComponent} from "./list-master-harga/list-master-harga.component";

const routes: Routes = [{path: '', component: ListMasterHargaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterHargaRoutingModule {
}
