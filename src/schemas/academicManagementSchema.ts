import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Select a semester" }),
  year: z.string({ required_error: "Select a year" }),
  startMonth: z.string({ required_error: "Select a start month" }),
  endMonth: z.string({ required_error: "Select a start month" }),
});
export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});
export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  academicFaculty: z.string({ required_error: "Select a faculty " }),
});
