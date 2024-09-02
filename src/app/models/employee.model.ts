export interface Employee {
    id: number;
    name: string;
    companyName: string;
    email: string;
    contactNo: string;
    designation: string;
    experience: string;
    doj: string;
    currentTeam: string;
    rm: string;
    rating: number;
    department: string;
    location: string;
    roleType: string;
}

export interface Messages {
    id: number;
    message: string;
    readStatus: 'read' | 'unread';
}

export interface DropdownData {
    designations: [string];
    teams: [string];
    departments: [string];
    locations: [string];
    role_types: [string];
    experiences: [string];
    doj: [string];
}

export interface Filter {
    department: string;
    roleType: string;
    designation: string;
    experience: string;
    doj: string;
    location: string;
    currentTeam: string
  };