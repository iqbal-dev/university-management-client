/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Table, TableColumnsType, TableProps } from "antd";
import { TParamsType } from "../../types/global";
import Spinner from "../shared/spinner";

// Define a reusable type for the dynamic table component props
type DynamicListProps<TDataType> = {
  title: string;
  fetchResult: {
    data: any;
    isFetching: boolean;
    isLoading: boolean;
  };
  columns: TableColumnsType<any>; // Use 'any' type here to match antd requirements
  transformData: (data: any) => TDataType[];
  itemActions?: (item: TDataType) => JSX.Element;
  queryParams: any; // Pass queryParams as props
  updateSearchParams: (params: any) => void; // Pass updateSearchParams function as props
  setParams: (params: TParamsType[]) => void; // Pass updateSearchParams function as props
};

export default function DynamicTable<TDataType>({
  title,
  fetchResult,
  columns,
  transformData,
  itemActions,
  queryParams,
  updateSearchParams,
  setParams,
}: DynamicListProps<TDataType>) {
  const currentPage = Number(queryParams.page) || 1;

  const { data, isFetching, isLoading } = fetchResult;

  const transformedData = transformData(data);

  const extendedColumns: TableColumnsType<any> = [
    ...columns,
    ...(itemActions
      ? [
          {
            title: "Actions",
            key: "x",
            render: (item: any) => itemActions(item),
            width: "1%",
          },
        ]
      : []),
  ];

  const onChange: TableProps<any>["onChange"] = (
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
      <h2>{title}</h2>
      <Table
        columns={extendedColumns}
        loading={isFetching}
        dataSource={transformedData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={currentPage}
        total={data?.meta?.total}
        pageSize={data?.meta?.limit}
        onChange={(page) => {
          const newQueryParams = { page: String(page) };
          updateSearchParams(newQueryParams);
        }}
      />
    </>
  );
}
