import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MatbuttonComponent } from './components/matbutton/matbutton.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import {MatGridListModule} from '@angular/material/grid-list';

const appRoutes: Routes=[
  {path:'',component: HomeComponent,},
  {path:'login',component: SigninComponent,}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MatbuttonComponent,
    HomeComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
