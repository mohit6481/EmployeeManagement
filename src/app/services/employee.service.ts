import { Injectable } from '@angular/core';
import { DropdownData, Employee, Filter, Messages } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    selectedTeam = new BehaviorSubject('');
    filterParams = new BehaviorSubject({
        department: '',
        roleType: '',
        designation: '',
        experience: '',
        doj: '',
        location: '',
        currentTeam: ''
    });
    currentTeam = this.selectedTeam.asObservable();
    currentFilter = this.filterParams.asObservable();

    constructor(private httpClient: HttpClient) {
    }

    updateTeam(newTeam: string) {
        this.selectedTeam.next(newTeam);
    }

    updateFilter(newfilter: Filter) {
        this.filterParams.next(newfilter);
    }

    getDropdownsData() {
        return this.httpClient.get<DropdownData>('http://localhost:3000/dropdown') as Observable<DropdownData>
    }

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>('http://localhost:3000/employee') as Observable<Employee[]>
    }

    addEmployee(employee: Employee) {
        return this.httpClient.post<Employee[]>(`http://localhost:3000/employee/`, employee) as Observable<Employee[]>
    }

    updateEmployee(employee: Employee) {
        return this.httpClient.put<Employee[]>(`http://localhost:3000/employee/${employee.id}`, employee) as Observable<Employee[]>;
    }

    deleteEmployee(id: number) {
        return this.httpClient.delete<Employee[]>(`http://localhost:3000/employee/${id}`) as Observable<Employee[]>;
    }

    getMessagesData() {
        return this.httpClient.get<Messages[]>('http://localhost:3000/messages') as Observable<Messages[]>
    }

    updateMessageStatus(message: Messages) {
        return this.httpClient.put<Messages[]>(`http://localhost:3000/messages/${message.id}`, message) as Observable<Messages[]>
    }
}