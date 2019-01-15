import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule,MatDatepickerModule,MatNativeDateModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,MatButtonModule, MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,MatInputModule
  ],
  exports: [MatButtonModule, MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
