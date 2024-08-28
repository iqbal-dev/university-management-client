import {
  TAcademicDepartment,
  TAcademicSemester,
} from "./academicManagement.type";
import { TBloodGroup, TGender } from "./global";

export type TStudent = {
  name: TName;
  gender: TGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
