/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space } from "antd";
import { useState } from "react";
import DeleteButton from "../../../components/shared/delete-button";
import EditButton from "../../../components/shared/edit-button";
import DynamicTable from "../../../components/ui/dynamic-table";
import { useManageSearchParams } from "../../../hooks/useManageSearchParams";
import {
  useDeleteAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types";
import { TParamsType } from "../../../types/global";
import { objectToApiParams } from "../../../utils/objectToApiParams";

const AcademicDepartmentList = () => {
  const { queryParams, updateSearchParams } = useManageSearchParams();
  const [params, setParams] = useState<TParamsType[] | undefined>(
    objectToApiParams(queryParams)
  );
  const {
    data: academicDepartmentData,
    isFetching,
    isLoading,
  } = useGetAllAcademicDepartmentQuery(params);
  const [deleteData] = useDeleteAcademicDepartmentMutation();

  // Transform the fetched data for display in the table
  const transformAcademicDepartmentData = (data: any) =>
    data?.data.map((item: TAcademicDepartment) => ({
      key: item._id,
      name: item.name,
      academicFaculty: item.academicFaculty.name,
    }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Faculty Name",
      dataIndex: "academicFaculty",
      key: "academicFaculty",
    },
  ];
  const handleDelete = (id: string) => {
    deleteData({ academicDepartmentId: id });
  };
  const itemActions = (item: any) => (
    <Space>
      <EditButton
        link={`/admin/academic-management/update-academic-department/${item.key}`}
      />
      <DeleteButton id={item.key} deleteFunc={handleDelete} />
    </Space>
  );

  return (
    <DynamicTable
      title="Academic Departments"
      fetchResult={{
        data: academicDepartmentData,
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
};

export default AcademicDepartmentList;
