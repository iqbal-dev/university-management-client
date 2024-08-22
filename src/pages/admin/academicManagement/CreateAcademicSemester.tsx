import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHISelect";
import { monthOptions, semesterOptions, yearOptions } from "../../../constants";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicSemesterSchema } from "../../../schemas/academicManagementSchema";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TResponse } from "../../../types/global";

export default function CreateAcademicSemester() {
  const [addAcademicSemester, { isLoading }] = useAddAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await addAcademicSemester(
        semesterData
      )) as TResponse<TAcademicSemester>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
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
          <Button htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
}
