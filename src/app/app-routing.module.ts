import { StudentComponent } from './components/student/student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"",redirectTo:"dashboard",pathMatch:"full"},
  {path:"dashboard",component:DashboardComponent,
    children:[
      {path:"",redirectTo:"student",pathMatch:"full"},
      {path:"student",component:StudentComponent}
    ]  
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
