import { Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import Spinner from "../../../components/shared/spinner";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types";
import { TParamsType } from "../../../types/global";

type TDataType = Pick<TAcademicSemester, "name">;
const columns: TableColumnsType<TDataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
];

export default function AcademicFaculty() {
  const [params, setParams] = useState<TParamsType[] | undefined>(undefined);
  const {
    data: semesterData,
    isFetching,
    isLoading,
  } = useGetAllAcademicFacultyQuery(params);
  const data = semesterData?.data.map((item) => ({
    key: item._id,
    name: item.name,
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
