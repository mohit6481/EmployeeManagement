import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HistoryComponent } from './components/history/history.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { HelpComponent } from './components/help/help.component';
import { SignoutComponent } from './components/signout/signout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent},
  { path: 'messages', component: MessagesComponent},
  { path: 'history', component: HistoryComponent},
  { path: 'myaccount', component: MyaccountComponent},
  { path: 'help', component: HelpComponent},
  { path: 'signout', component: SignoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
