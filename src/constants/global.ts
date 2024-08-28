import { TBloodGroup, TGender, TMonths } from "../types/global";

// Array of month names to be used as options
export const monthNames: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//month options
export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));

//year options
const currentYear = new Date().getFullYear();
export const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

// Define an array of genders as a TypeScript type
export const genders: TGender[] = ["male", "female", "other"];

//Gender options
export const genderOptions = genders.map((item) => ({
  label: item.toLocaleUpperCase(), // Convert the label to uppercase
  value: item,
}));

// Define an array of blood groups as a TypeScript type
export const bloodGroups: TBloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

//Blood group options
export const bloodGroupOptions = bloodGroups.map((item) => ({
  label: item,
  value: item,
}));
