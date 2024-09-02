import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Messages } from '../../models/employee.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnDestroy{
  logoUrl = "/images/logo.png"
  currentLink = ''
  messages: Messages[] = [];
  unreadMessagesCount = 0;
  private messageService;

  constructor(private route:Router, private emploteeService: EmployeeService) {
    this.messageService = this.emploteeService.getMessagesData().subscribe({
      next: (messages: Messages[]) => {
        this.messages = messages
        this.messages.forEach(message => {
          if (message.readStatus === 'unread') this.unreadMessagesCount++
        })
      },
      error: (err) => console.log(err)
    })
  }

  onClick(event: any) {
    this.currentLink = event?.target?.dataset?.id || '';
  }

  filterSibmit() {
    this.currentLink = ''
    this.route.navigate([''])
  }

  ngOnDestroy(): void {
    this.messageService.unsubscribe();
  }
}
