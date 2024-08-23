import { Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import Spinner from "../../../components/shared/spinner";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types";
import { TParamsType } from "../../../types/global";

type TDataType = {
  name: TAcademicDepartment["name"];
  academicFaculty: TAcademicDepartment["academicFaculty"]["name"];
};
const columns: TableColumnsType<TDataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Academic Faculty",
    dataIndex: "academicFaculty",
  },
];

export default function AcademicDepartment() {
  const [params, setParams] = useState<TParamsType[] | undefined>(undefined);
  const {
    data: semesterData,
    isFetching,
    isLoading,
  } = useGetAllAcademicDepartmentQuery(params);
  const data = semesterData?.data.map((item) => ({
    key: item._id,
    name: item.name,
    academicFaculty: item.academicFaculty.name,
  }));

  const onChange: TableProps<TDataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const items: TParamsType[] = [];
      Object.keys(filters).forEach((key) => {
        filters[key]?.forEach((item) => {
          items.push({
            name: key,
            value: item as string,
          });
        });
      });
      setParams(items);
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Table
      columns={columns}
      loading={isFetching}
      dataSource={data}
      onChange={onChange}
    />
  );
}
