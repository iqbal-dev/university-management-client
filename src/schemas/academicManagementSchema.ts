import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Select a semester" }),
  year: z.string({ required_error: "Select a year" }),
  startMonth: z.string({ required_error: "Select a start month" }),
  endMonth: z.string({ required_error: "Select a start month" }),
});
