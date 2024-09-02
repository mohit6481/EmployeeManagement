import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SectionComponent } from './components/section/section.component';
import { EmployeeCardComponent } from './components/section/employee-card/employee-card.component';
import { EmployeeFormComponent } from './components/section/employee-form/employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterComponent } from './components/sidebar/search-filter/search-filter.component';
import { MessagesComponent } from './components/messages/messages.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HistoryComponent } from './components/history/history.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { HelpComponent } from './components/help/help.component';
import { SignoutComponent } from './components/signout/signout.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    SectionComponent,
    EmployeeCardComponent,
    EmployeeFormComponent,
    SearchFilterComponent,
    MessagesComponent,
    LayoutComponent,
    HistoryComponent,
    MyaccountComponent,
    HelpComponent,
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
