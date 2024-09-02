import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { DropdownData } from '../../../models/employee.model';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  @Output() onFilterSubmit = new EventEmitter<string>();
  departments!: [string];
  roleTypes!: [string];
  designations!: [string];
  experiences!: [string];
  doj!: [string];
  locations!: [string];
  currentTeam!: [string];
  currentFilter = {
    department: '',
    roleType: '',
    designation: '',
    experience: '',
    doj: '',
    location: '',
    currentTeam: ''
  };
  private empSer;
  private filSer;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.empSer = this.employeeService.getDropdownsData().subscribe({
      next: (data: DropdownData) => {
        this.departments = data.departments;
        this.roleTypes = data.role_types;
        this.designations = data.designations;
        this.experiences = data.experiences;
        this.doj = data.doj;
        this.locations = data.locations;
        this.currentTeam = data.teams;
      },
      error: (error) => console.log(error)
    })
    this.filSer = this.employeeService.currentFilter.subscribe(filter => {
      this.currentFilter = filter
    })
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      department: [this.currentFilter.department],
      roleType: [this.currentFilter.roleType],
      designation: [this.currentFilter.designation],
      experience: [this.currentFilter.experience],
      doj: [this.currentFilter.doj],
      location: [this.currentFilter.location],
      currentTeam: [this.currentFilter.currentTeam]
    });
  }

  onClear(): void {
    this.filterForm.reset({
      department: '',
      roleType: '',
      designation: '',
      experience: '',
      doj: '',
      location: '',
      currentTeam: ''
    });
  }

  onSubmit(): void {
    this.employeeService.updateFilter(this.filterForm.value)
    this.onFilterSubmit.emit('submit')
  }

  ngOnDestroy(): void {
    this.empSer.unsubscribe();
    this.filSer.unsubscribe();
  }
}