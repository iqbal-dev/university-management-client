import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHISelect";
import { bloodGroupOptions, genderOptions } from "../../../constants";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

export default function CreateStudent() {
  const [addStudent] = useAddStudentMutation();
  const { data: sData, isLoading: sIsLoading } =
    useGetAllAcademicSemesterQuery(undefined);

  const { data: dData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentData = {
      password: "student123",
      student: data,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);
    addStudent(formData);
  };
  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          // resolver={zodResolver(academicDepartmentSchema)}
        >
          <Row gutter={8}>
            <Divider>Personal Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
              <PHInput
                type="text"
                name="name.firstName"
                label="First Name"
                placeholder="Enter first name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
              <PHInput
                type="text"
                name="name.middleName"
                label="Middle Name"
                placeholder="Enter Middle name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
              <PHInput
                type="text"
                name="name.lastName"
                label="Last Name"
                placeholder="Enter Last name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
              <PHSelect
                name="gender"
                label="Gender"
                placeholder="Select a gender"
                options={genderOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
              <PHDatePicker name="dateOfBirth" label="Date of birth" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
              <PHSelect
                name="bloogGroup"
                label="Blood Group"
                placeholder="Select a blood group"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput
                type="text"
                name="email"
                label="Email"
                placeholder="Enter email"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput
                type="text"
                name="contactNo"
                label="Contact No"
                placeholder="Enter contact number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
                placeholder="Enter emergency contact number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
                placeholder="Enter present address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
                placeholder="Enter permanent address"
              />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
                placeholder="Enter father name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
                placeholder="Enter father occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
                placeholder="Enter father contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Admission Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
