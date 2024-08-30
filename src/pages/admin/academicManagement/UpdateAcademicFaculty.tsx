import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import Spinner from "../../../components/shared/spinner";
import {
  useGetAcademicFacultyQuery,
  useUpdateAcademicFacultyMutation,
} from "../../../redux/features/admin/academicManagement.api";
import { academicFacultySchema } from "../../../schemas/academicManagementSchema";
import { TAcademicFaculty } from "../../../types";
import { TResponse } from "../../../types/global";

export default function UpdateAcademicFaculty() {
  const navigate = useNavigate();
  const { academicFacultyId } = useParams();
  const { data: academicFaculty, isLoading } = useGetAcademicFacultyQuery(
    { academicFacultyId },
    {
      skip: !academicFacultyId,
    }
  );
  const [updateAcademicFaculty, { isLoading: updateLoading }] =
    useUpdateAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = (await updateAcademicFaculty({
        academicFacultyId,
        academicFaculty: data,
      })) as TResponse<TAcademicFaculty>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic faculty updated", { id: toastId });
        // Redirect to the academic faculty list page after successful creation
        navigate(-1);
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  const defaultValues = {
    name: academicFaculty?.data.name,
  };
  return (
    <Row justify="center" align="middle">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
          defaultValues={defaultValues}
        >
          <PHInput
            type="text"
            name="name"
            label="name"
            placeholder="Enter academic faculty name"
          />
          <Button loading={updateLoading} htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
}
