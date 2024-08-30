/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, TableColumnsType } from "antd";
import { useState } from "react";
import DeleteButton from "../../../components/shared/delete-button";
import EditButton from "../../../components/shared/edit-button";
import Spinner from "../../../components/shared/spinner";
import DynamicTable from "../../../components/ui/dynamic-table";
import { yearOptions } from "../../../constants";
import { semesterOptions } from "../../../constants/academicSemester";
import { useManageSearchParams } from "../../../hooks/useManageSearchParams";
import {
  useDeleteAcademicSemesterMutation,
  useGetAllAcademicSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types";
import { TParamsType } from "../../../types/global";
import { objectToApiParams } from "../../../utils/objectToApiParams";

type TDataType = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;
const columns: TableColumnsType<TDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    filters: semesterOptions.map((semester) => ({
      text: semester.label,
      value: semester.label,
    })),
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
    filters: yearOptions.map((year) => ({
      text: year.label,
      value: year.value,
    })),
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
    key: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
    key: "endMonth",
  },
];

export default function AcademicSemester() {
  const { queryParams, updateSearchParams } = useManageSearchParams();
  const [params, setParams] = useState<TParamsType[] | undefined>(
    objectToApiParams(queryParams)
  );

  const [deleteAcademicSemester] = useDeleteAcademicSemesterMutation();

  const {
    data: academicSemesterData,
    isFetching,
    isLoading,
  } = useGetAllAcademicSemesterQuery(params);
  const transformAcademicDepartmentData = (data: any) => {
    return data?.data.map((item: TAcademicSemester) => ({
      key: item._id,
      name: item.name,
      year: item.year,
      startMonth: item.startMonth,
      endMonth: item.endMonth,
    }));
  };
  const handleDelete = (id: string) => {
    deleteAcademicSemester({ academicSemesterId: id });
  };
  const itemActions = (item: any) => {
    return (
      <Space>
        <EditButton
          link={`/admin/academic-management/update-academic-semester/${item.key}`}
        />
        <DeleteButton id={item.key} deleteFunc={handleDelete} />
      </Space>
    );
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <DynamicTable
      title="Academic Semester"
      fetchResult={{
        data: academicSemesterData,
        isFetching,
        isLoading,
      }}
      columns={columns}
      transformData={transformAcademicDepartmentData}
      itemActions={itemActions}
      queryParams={queryParams}
      setParams={setParams}
      updateSearchParams={updateSearchParams}
    />
  );
}
