import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";

export default function AcademicSemester() {
  const { data } = useGetAllSemesterQuery(undefined);
  console.log("🚀 ~ AcademicSemester ~ data:", data);
  return <div>AcademicSemester</div>;
}
