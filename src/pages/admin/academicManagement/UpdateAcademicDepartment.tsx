import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Navigate, useLocation, useParams } from "react-router-dom";
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
import { TParamsType, TResponse } from "../../../types/global";

export default function UpdateAcademicDepartment() {
  const { academicDepartmentId } = useParams();
  const location = useLocation();
  const currentPage = location.state?.currentPage || 1;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TParamsType[] | undefined>([
    {
      name: "page",
      value: "1",
    },
    {
      name: "limit",
      value: "100",
    },
  ]);
  const { data: academicFacultyOptions, isLoading: isAcademicFacultyLoading } =
    useGetAllAcademicFacultyDropDownQuery(params);
  const { data: academicDepartmentData, isLoading } =
    useGetAcademicDepartmentByIdQuery({
      academicDepartmentId,
    });
  const [updateAcademicDepartment] = useUpdateAcademicDepartmentMutation();
  const [shouldNavigate, setShouldNavigate] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = (await updateAcademicDepartment({
        academicDepartmentId,
        academicDepartment: data,
      })) as TResponse<TAcademicDepartment>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic department created", { id: toastId });
        setShouldNavigate(true);
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  if (shouldNavigate) {
    return (
      <Navigate
        to="/admin/academic-management/academic-department"
        state={{ currentPage }}
      />
    );
  }

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
            label="name"
            placeholder="Enter department name"
          />
          <PHSelect
            placeholder="Select a faculty"
            label="Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
