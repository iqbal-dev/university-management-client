import { Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types";

type TDataType = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;
const columns: TableColumnsType<TDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Fall",
        value: "Fall",
      },
      {
        text: "Summer",
        value: "Summer",
      },
    ],
  },
  {
    title: "Year",
    dataIndex: "year",
    filters: [
      {
        text: "2024",
        value: "2024",
      },
      {
        text: "2025",
        value: "2025",
      },
      {
        text: "2026",
        value: "2026",
      },
    ],
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

export type TParamsType = {
  name: string;
  value: string;
};
export default function AcademicSemester() {
  const [params, setParams] = useState<TParamsType[] | undefined>(undefined);
  const { data: semesterData } = useGetAllSemesterQuery(params);
  const data = semesterData?.data.map((item) => ({
    _id: item._id,
    name: item.name,
    year: item.year,
    startMonth: item.startMonth,
    endMonth: item.endMonth,
  }));

  const onChange: TableProps<TDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
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
    console.log(filters, extra);
  };
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}
