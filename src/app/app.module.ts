import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {AppRoutesModule} from './app-routes.module';
import {FolderMonitorComponent} from './components/folderMonitor/folderMonitor.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from "./services/auth-guard.service";
import {AuthenticationService} from "./services/auth.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {FolderMonitorService} from "./services/folderMonitor.service";


@NgModule({
  declarations: [
    AppComponent,
    FolderMonitorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutesModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [FolderMonitorService, AuthGuard, AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
