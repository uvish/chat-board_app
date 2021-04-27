import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { ChannelComponent } from './channel/channel.component';
const routes: Routes = [
  {path:'',component:AppComponent},
  { path:'register',component:RegisterComponent},
  { path:'login', component:LoginComponent},
  {path:'dashboard',component: DashboardComponent,canActivate:[AuthGuard]},
  {path:'c/:id', component:ChannelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
