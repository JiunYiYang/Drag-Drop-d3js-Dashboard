import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { 
  MatButtonModule, 
  MatMenuModule, 
  MatToolbarModule, 
  MatSidenavModule,
  MatIconModule,
  MatCardModule, 
  CompatibilityModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatInputModule,
  MatInput,
  MatFormFieldControl,
  MatFormFieldModule,
  MatFormField,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSliderModule,
  MatSlider,
  MatSliderChange,
  MatSliderBase,
  MatOptionModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';
import { GridsterModule } from 'angular2gridster';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { GridsterComponent } from './gridster/gridster.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    GridsterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSliderModule,
    MatOptionModule,
    MatFormFieldModule,
    FlexLayoutModule,
    CompatibilityModule,
    MatGridListModule,
    GridsterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
