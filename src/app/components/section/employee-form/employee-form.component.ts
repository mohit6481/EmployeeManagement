import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownData, Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  @Input() employee: Employee | null = null;
  @Input() resourceManagers: [string] | null = null;
  @Output() formSubmit = new EventEmitter<Employee>();
  @Output() formCancel = new EventEmitter();

  employeeForm: FormGroup;
  departments!: [string];
  roleTypes!: [string];
  designations!: [string];
  experiences!: [string];
  doj!: [string];
  locations!: [string];
  currentTeam!: [string];
  private empSer;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
      designation: ['', Validators.required],
      experience: ['', Validators.required],
      doj: ['', Validators.required],
      currentTeam: ['', Validators.required],
      rm: ['', Validators.required],
      rating: ['', Validators.required],
      department: ['', Validators.required],
      location: ['', Validators.required],
      roleType: ['', Validators.required],
    });

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
  }

  ngOnChanges() {
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.formSubmit.emit(this.employeeForm.value);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  ngOnDestroy() {
    this.empSer.unsubscribe();
  }
}