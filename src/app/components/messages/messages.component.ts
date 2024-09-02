import { Component, OnDestroy } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Messages } from '../../models/employee.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnDestroy {
  messagesData!: Messages[];
  private messageService;

  constructor(private empoyeeService: EmployeeService) {
    this.messageService = this.empoyeeService.getMessagesData().subscribe({
      next: (data) => {
        this.messagesData = data
      },
      error: (error) => console.log(error)
    })
  }

  messageClick(message: Messages) {
    this.empoyeeService.updateMessageStatus(message).subscribe({
      next: (data) => {
        console.log(data)
        this.messagesData = data
      },
      error: (error) => console.log(error)
    })
  }

  ngOnDestroy(): void {
    this.messageService.unsubscribe();
  }

}
