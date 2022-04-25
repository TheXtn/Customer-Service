import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MatbuttonComponent } from './components/matbutton/matbutton.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { SidebarModule } from 'ng-sidebar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProfileComponent } from './components/profile/profile.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { CrtTicketComponent } from './components/crt-ticket/crt-ticket.component';

const appRoutes: Routes=[
  {path:'',component: HomeComponent,},
  {path:'login',component: SigninComponent,},
  {path:'signup',component:SignupComponent},
  {path: 'user',children:[
    {path:'dashboard', component: UserDashboardComponent,},
    {path:'profile', component: ProfileComponent,},
    {path:'tickets', component: TicketsComponent,},
    {path:'create-ticket', component: CrtTicketComponent,},
  ]},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MatbuttonComponent,
    HomeComponent,
    SigninComponent,
    UserDashboardComponent,
    SignupComponent,
    ProfileComponent,
    TicketsComponent,
    CrtTicketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    SidebarModule.forRoot(),
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    MatSidenavModule,
  ],
  providers: [HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
