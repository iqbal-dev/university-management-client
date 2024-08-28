import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Spinner from "../../../components/shared/spinner";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types";
import { TParamsType } from "../../../types/global";

type TDataType = {
  name: TAcademicDepartment["name"];
  academicFaculty: TAcademicDepartment["academicFaculty"]["name"];
};

export default function AcademicDepartment() {
  const location = useLocation();
  const currentPage = Number(location.state?.currentPage) || 1;
  const [page, setPage] = useState<number>(currentPage);
  const [params, setParams] = useState<TParamsType[]>([]);
  const {
    data: academicSemesterData,
    isFetching,
    isLoading,
  } = useGetAllAcademicDepartmentQuery([
    { name: "page", value: page },
    ...params,
  ]);
  const data = academicSemesterData?.data.map((item) => ({
    key: item._id,
    name: item.name,
    academicFaculty: item.academicFaculty.name,
  }));

  const columns: TableColumnsType<TDataType> = [
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

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link
              to={`/admin/academic-management/update-academic-department/${item.key}`}
              state={{ page }}
            >
              <Button>Update</Button>
            </Link>
            <Button>Delete</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

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
    <>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={data}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        total={academicSemesterData?.meta?.total}
        pageSize={academicSemesterData?.meta?.limit}
        onChange={(page) => setPage(page)}
      />
    </>
  );
}
