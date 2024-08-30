import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHISelect";
import Spinner from "../../../components/shared/spinner";
import {
  useGetAcademicDepartmentByIdQuery,
  useGetAllAcademicFacultyDropDownQuery,
  useUpdateAcademicDepartmentMutation,
} from "../../../redux/features/admin/academicManagement.api";
import { academicDepartmentSchema } from "../../../schemas/academicManagementSchema";
import { TAcademicDepartment } from "../../../types";
import { TResponse } from "../../../types/global";

export default function UpdateAcademicDepartment() {
  const { academicDepartmentId } = useParams();
  const navigate = useNavigate(); // Use useNavigate hook

  const { data: academicFacultyOptions, isLoading: isAcademicFacultyLoading } =
    useGetAllAcademicFacultyDropDownQuery(undefined);

  const { data: academicDepartmentData, isLoading } =
    useGetAcademicDepartmentByIdQuery(
      {
        academicDepartmentId,
      },
      {
        skip: !academicDepartmentId,
      }
    );

  const [updateAcademicDepartment, { isLoading: updateLoading }] =
    useUpdateAcademicDepartmentMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");
    try {
      const res = (await updateAcademicDepartment({
        academicDepartmentId,
        academicDepartment: data,
      })) as TResponse<TAcademicDepartment>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic department updated", { id: toastId });
        navigate(-1); // Navigate back to the previous page
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (isLoading || isAcademicFacultyLoading) {
    return <Spinner />;
  }

  const defaultValues = {
    name: academicDepartmentData?.data?.name,
    academicFaculty: academicDepartmentData?.data?.academicFaculty._id,
  };

  return (
    <Row justify="center" align="middle">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
          defaultValues={defaultValues}
        >
          <PHInput
            type="text"
            name="name"
            label="Name"
            placeholder="Enter department name"
          />
          <PHSelect
            placeholder="Select a faculty"
            label="Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <Button loading={updateLoading} htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
}
