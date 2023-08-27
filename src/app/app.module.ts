import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { RightMenuComponent } from './right-menu/right-menu.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClinicComponent } from './clinic/clinic.component';
import { CustomerComponent } from './customer/customer.component';
import { PetComponent } from './pet/pet.component';
import { RepairComponent } from './repair/repair.component';
import { MedicineComponent } from './medicine/medicine.component';
import { ReportComponent } from './report/report.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShareService } from './ShareService';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    RightMenuComponent,
    ControlSidebarComponent,
    DashboardComponent,
    ClinicComponent,
    CustomerComponent,
    PetComponent,
    RepairComponent,
    MedicineComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
