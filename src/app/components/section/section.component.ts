import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent implements OnDestroy {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';
  selectedEmployee: Employee | null = null;
  showBangalore: boolean = false;
  currentSelectedTeam = '';
  currentFilter = {};
  rms!: [string];
  private empSer;
  private currentTeamService;
  private currentFilterService;


  constructor(private employeeService: EmployeeService) {
    this.empSer = this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.filteredEmployees = data;
        this.employees.forEach(emp => {
          if (emp.designation === "Senior Manager" || emp.designation === "Manager") {
            if (this.rms) {
              this.rms.push(emp.name)
            } else {
              this.rms = [emp.name]
            }
          }
        })
      },
      error: (error: Error) => {
        console.log(error);
      },
    });

    this.currentTeamService = this.employeeService.currentTeam.subscribe(team => {
      this.currentSelectedTeam = team;
      this.filterData();
    });

    this.currentFilterService = this.employeeService.currentFilter.subscribe(filter => {
      this.currentFilter = filter;
      this.filterData();
    })
  }

  filterData() {
    this.filteredEmployees = [...this.employees]
    if (this.showBangalore) {
      this.filteredEmployees = this.filteredEmployees.filter(employee => employee.location === 'Bengaluru')
    }

    if (this.currentSelectedTeam) {
      this.filteredEmployees = this.filteredEmployees.filter(employee => employee.currentTeam === this.currentSelectedTeam)
    }

    Object.keys(this.currentFilter).forEach(category => {
      this.filteredEmployees = this.filteredEmployees.filter(
        (emp: Employee) =>
          !this.currentFilter[category as keyof {}]
          || emp[category as keyof Employee] === this.currentFilter[category as keyof {}]
      )
    })
  }

  onAdd() {
    this.selectedEmployee = {
      id: 0,
      name: '',
      companyName: '',
      email: '',
      contactNo: '',
      designation: '',
      experience: '',
      doj: '',
      currentTeam: '',
      rm: '',
      rating: 0,
      department: '',
      location: '',
      roleType: '',
    };
  }

  onEdit(employee: Employee) {
    this.selectedEmployee = { ...employee };
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: (employees: Employee[]) => {
          this.employees = employees;
          this.filteredEmployees = [...employees]
        },
        error: (error) => console.log(error)
      })
    }
  }

  onCancel() {
    this.selectedEmployee = null;
  }

  onFormSubmit(employee: Employee) {
    if (employee.id) {
      this.employeeService.updateEmployee(employee).subscribe({
        next: (employees: Employee[]) => {
          this.employees = employees;
          this.filteredEmployees = [...employees]
        }, error: (error) => console.log(error)
      });
    } else {
      this.employeeService.addEmployee(employee).subscribe({
        next: (employees: Employee[]) => {
          this.employees = employees;
          this.filteredEmployees = [...employees]
        }, error: (error) => console.log(error)
      });;
    }
    this.selectedEmployee = null;  // Reset the form
  }

  toggleBangaloreEmployee() {
    this.filterData()
  }

  ngOnDestroy(): void {
    this.empSer.unsubscribe()
    this.currentTeamService.unsubscribe();
    this.currentFilterService.unsubscribe();
  }
}
