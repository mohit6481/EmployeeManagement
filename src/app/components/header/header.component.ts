import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { DropdownData } from '../../models/employee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy {
  teams!: [string];
  selectedTeam = '';
  showNotification = false;
  private service;

  constructor(private employeeService: EmployeeService) {
    this.service = this.employeeService.getDropdownsData().subscribe({
      next: (data: DropdownData) => {
        this.teams = data?.teams
      },
      error: (error: Error) => {
        console.log(error);
      },
    })
  }

  onTeamSelection() {
    this.employeeService.updateTeam(this.selectedTeam);
  }

  notificationClick() {
    this.showNotification = !this.showNotification;
  }

  ngOnDestroy(): void {
    this.service.unsubscribe()
  }
}
