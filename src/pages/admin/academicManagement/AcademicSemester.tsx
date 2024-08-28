import { Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import Spinner from "../../../components/shared/spinner";
import { yearOptions } from "../../../constants";
import { semesterOptions } from "../../../constants/academicSemester";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types";
import { TParamsType } from "../../../types/global";

type TDataType = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;
const columns: TableColumnsType<TDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    filters: semesterOptions.map((semester) => ({
      text: semester.label,
      value: semester.label,
    })),
  },
  {
    title: "Year",
    dataIndex: "year",
    filters: yearOptions.map((year) => ({
      text: year.label,
      value: year.value,
    })),
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
  },
];

export default function AcademicSemester() {
  const [params, setParams] = useState<TParamsType[] | undefined>(undefined);
  const {
    data: semesterData,
    isFetching,
    isLoading,
  } = useGetAllAcademicSemesterQuery(params);
  const data = semesterData?.data.map((item) => ({
    _id: item._id,
    name: item.name,
    year: item.year,
    startMonth: item.startMonth,
    endMonth: item.endMonth,
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
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}
