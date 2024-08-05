import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Popconfirm, Table } from "antd";
import { CinemaItem } from "../../../interfaces/cinema.interface";
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { cineApi } from "../../../apis/cinema.api";

const CinemaManagement = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["list-cinema"],
    queryFn: () => cineApi.getListCines(),
  });

  const dataSource: CinemaItem[] = data || [];

  const columns = [
    {
      title: "No",
      key: "Number",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Cinema ID",
      key: "cinema-id",
      dataIndex: "maHeThongRap",
    },
    {
      title: "Cinema Logo",
      key: "cinema-logo",
      width: 300,
      render: (record: CinemaItem) => {
        return (
          <img
            src={record.logo}
            alt={record.biDanh}
            className="w-[200px] object-cover"
          />
        );
      },
    },
    {
      title: "Cinema Name",
      key: "cinema-name",
      dataIndex: "tenHeThongRap",
    },

    {
      title: "Action",
      key: "action",
      render: (record: CinemaItem) => {
        return (
          <div className="flex">
            <Button
              type="primary"
              className="mr-2"
              onClick={() => {
                alert(record.maHeThongRap);
              }}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Delete cinema"
              description="Are you sure to delete this cinema?"
              onConfirm={() => alert(record.maHeThongRap)}
              onCancel={() => {}}
              placement="left"
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Dashboard",
            },
            {
              title: "Cinema Management",
              href: "",
            },
          ]}
        />

        <Button
          size="large"
          type="primary"
        >
          <PlusSquareOutlined  />
        </Button>
      </div>
      <h3 className="font-medium text-3xl mb-3">List Cinema</h3>
      <Table
        rowKey="maHeThongRap"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={isLoading}
      />
    </>
  );
};

export default CinemaManagement;
