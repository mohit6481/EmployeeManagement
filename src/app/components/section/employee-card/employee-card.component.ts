import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {
  @Input() employee: any;
  @Output() editClicked = new EventEmitter<boolean>()
  @Output() trashClicked = new EventEmitter<boolean>()

  editButtonClicked() {
    this.editClicked.emit(true);
  }

  trashButtonClicked() {
    this.trashClicked.emit(true);
  }
}
