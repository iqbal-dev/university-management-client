import { useGetAllSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

export default function AcademicSemester() {
  const { data } = useGetAllSemesterQuery(undefined);
  console.log("🚀 ~ AcademicSemester ~ data:", data);
  return <div>AcademicSemester</div>;
}
