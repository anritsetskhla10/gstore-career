// vacancy type
export interface Vacancy {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  deadline?: string;
  createdAt?: string;
}

// application type
export interface Application {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  cvPath: string;
  createdAt: string;
  vacancy: { title: string };
}

// filtering parameters
export interface ApplicationFilters {
  filter?: string; // vacancyId
  sort?: string;   // sorting param
}