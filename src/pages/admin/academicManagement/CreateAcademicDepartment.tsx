import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHISelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyDropDownQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { academicDepartmentSchema } from "../../../schemas/academicManagementSchema";
import { TAcademicDepartment } from "../../../types";
import { TParamsType, TResponse } from "../../../types/global";

export default function CreateAcademicDepartment() {
  const [createAcademicDepartment] = useAddAcademicDepartmentMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TParamsType[] | undefined>([
    {
      name: "page",
      value: "1",
    },
    {
      name: "limit",
      value: "10",
    },
  ]);
  const { data: academicFacultyOptions } =
    useGetAllAcademicFacultyDropDownQuery(params);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = (await createAcademicDepartment(
        data
      )) as TResponse<TAcademicDepartment>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic department created", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Row justify="center" align="middle">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
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
