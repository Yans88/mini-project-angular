import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MasterHargaRoutingModule} from './master-harga-routing.module';
import {ListMasterHargaComponent} from './list-master-harga/list-master-harga.component';
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {InputNumberModule} from "primeng/inputnumber";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextModule} from "primeng/inputtext";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    ListMasterHargaComponent
  ],
  imports: [
    CommonModule,
    MasterHargaRoutingModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    TableModule,
    FormsModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    ConfirmDialogModule,
    HttpClientModule
  ]
})
export class MasterHargaModule {
}
