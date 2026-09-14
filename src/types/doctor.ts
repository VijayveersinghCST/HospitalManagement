export type DoctorStatus = "Available" | "In Surgery" | "Off Duty";

export interface Doctor {
  id: string;
  name: string;
  title: string;
  department: string;
  status: DoctorStatus;
}
