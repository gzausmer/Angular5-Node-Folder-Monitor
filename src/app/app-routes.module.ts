import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FolderMonitorComponent} from './components/folderMonitor/folderMonitor.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from "./services/auth-guard.service";


const appRoutes: Routes = [

  {
    // Default route
    path: '',
    redirectTo: '/folderMonitor',
    pathMatch: 'full'
  },
  {
    path: 'folderMonitor',
    component: FolderMonitorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutesModule { }
