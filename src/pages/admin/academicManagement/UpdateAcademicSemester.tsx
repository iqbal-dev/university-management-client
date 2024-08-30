import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHISelect";
import Spinner from "../../../components/shared/spinner";
import { monthOptions, semesterOptions, yearOptions } from "../../../constants";
import {
  useGetAcademicSemesterQuery,
  useUpdateAcademicSemesterMutation,
} from "../../../redux/features/admin/academicManagement.api";
import { academicSemesterSchema } from "../../../schemas/academicManagementSchema";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TResponse } from "../../../types/global";

export default function UpdateAcademicSemester() {
  const { academicSemesterId } = useParams();
  const navigate = useNavigate(); // Use useNavigate hook
  const { data: academicSemesterData, isLoading: getAcademicSemesterLoading } =
    useGetAcademicSemesterQuery({ academicSemesterId });
  const [updateAcademicSemester, { isLoading: academicSemesterUpdateLoading }] =
    useUpdateAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const academicSemester = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await updateAcademicSemester({
        academicSemesterId,
        academicSemester,
      })) as TResponse<TAcademicSemester>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic Semester updated", { id: toastId });
        navigate(-1);
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (getAcademicSemesterLoading) {
    return <Spinner />;
  }

  const defaultValues = {
    name: academicSemesterData?.data.code,
    year: academicSemesterData?.data.year,
    startMonth: academicSemesterData?.data.startMonth,
    endMonth: academicSemesterData?.data.endMonth,
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
          defaultValues={defaultValues}
        >
          <PHSelect
            name="name"
            label="Name"
            placeholder="Select a name"
            options={semesterOptions}
          />
          <PHSelect
            name="year"
            label="Year"
            placeholder="Select a year"
            options={yearOptions}
          />
          <PHSelect
            name="startMonth"
            label="Start Month"
            placeholder="Select a start month"
            options={monthOptions}
          />
          <PHSelect
            name="endMonth"
            label="End Month"
            placeholder="Select a end month"
            options={monthOptions}
          />
          <Button htmlType="submit" loading={academicSemesterUpdateLoading}>
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
}
