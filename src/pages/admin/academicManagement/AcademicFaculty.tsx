/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, TableColumnsType } from "antd";
import { useState } from "react";
import DeleteButton from "../../../components/shared/delete-button";
import EditButton from "../../../components/shared/edit-button";
import DynamicTable from "../../../components/ui/dynamic-table";
import { useManageSearchParams } from "../../../hooks/useManageSearchParams";
import {
  useDeleteAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty, TAcademicSemester } from "../../../types";
import { TParamsType } from "../../../types/global";
import { objectToApiParams } from "../../../utils/objectToApiParams";

type TDataType = Pick<TAcademicSemester, "name">;
const columns: TableColumnsType<TDataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
];

export default function AcademicFaculty() {
  const { queryParams, updateSearchParams } = useManageSearchParams();
  const [deleteAcademicFaculty] = useDeleteAcademicFacultyMutation();
  const [params, setParams] = useState<TParamsType[] | undefined>(
    objectToApiParams(queryParams)
  );
  const {
    data: academicFaculty,
    isFetching,
    isLoading,
  } = useGetAllAcademicFacultyQuery(params);

  const transformAcademicDepartmentData = (data: any) =>
    data?.data.map((item: TAcademicFaculty) => ({
      key: item._id,
      name: item.name,
    }));

  const handleDelete = (id: string) => {
    deleteAcademicFaculty({ academicFacultyId: id });
  };
  const itemActions = (item: any) => (
    <Space>
      <EditButton
        link={`/admin/academic-management/update-academic-faculty/${item.key}`}
      />
      <DeleteButton id={item.key} deleteFunc={handleDelete} />
    </Space>
  );

  return (
    <DynamicTable
      title="Academic Faculty"
      fetchResult={{
        data: academicFaculty,
        isFetching,
        isLoading,
      }}
      columns={columns}
      transformData={transformAcademicDepartmentData}
      itemActions={itemActions}
      queryParams={queryParams}
      updateSearchParams={updateSearchParams}
      setParams={setParams}
    />
  );
}
