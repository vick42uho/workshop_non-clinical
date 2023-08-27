import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { ClinicComponent } from './clinic/clinic.component'
import { CustomerComponent } from './customer/customer.component'
import { PetComponent } from './pet/pet.component'
import { RepairComponent } from './repair/repair.component'
import { MedicineComponent } from './medicine/medicine.component'
import { ReportComponent } from './report/report.component'


const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'clinic',
    component:ClinicComponent
  },
  {
    path:'customer',
    component:CustomerComponent
  },
  {
    path:'pet',
    component:PetComponent
  },
  {
    path:'repair',
    component:RepairComponent
  },
  {
    path:'medicine',
    component:MedicineComponent
  },
  {
    path:'report',
    component:ReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
