/* This file contains schemas of all data models */
export interface SampleSchema {
  id: string;
  name: string;
  age: number;
}

export interface User {
  name: string;
  password: string;
  role: Role;
  // TODO...
}

export type Role = "Admin" | "Consumer" | "Hawker" | "Driver";
