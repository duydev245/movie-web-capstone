import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Pagination, Table, Tag } from "antd";
import { useState } from "react";
import { userApi } from "../../../apis/user.api";
import { USER_TYPES_MAPPING } from "../../../constants";
import { UserItem } from "../../../interfaces/user.interface";

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-user", { currentPage }],
    queryFn: () => userApi.getListUser({ page: currentPage }),
  });

  const columns = [
    {
      title: "Account",
      key: "user-account",
      dataIndex: "taiKhoan",
    },
    {
      title: "Full Name",
      key: "full-name",
      dataIndex: "hoTen",
    },
    {
      title: "Email",
      key: "user-email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      key: "phone-number",
      dataIndex: "soDt",
    },
    {
      title: "Type User",
      key: "type-user",
      dataIndex: "maLoaiNguoiDung",
      render: (_: any, { maLoaiNguoiDung }: { maLoaiNguoiDung: string }) => (
        <Tag>{USER_TYPES_MAPPING[maLoaiNguoiDung] || ""}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: UserItem) => {
        return (
          <div className="flex">
            <Button
              type="primary"
              className="mr-2"
              onClick={() => alert(record.taiKhoan)}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => alert(record.taiKhoan)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const dataSource = data?.items || [];
  const total = data?.totalCount || 0;

  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Dashboard",
            },
            {
              title: "User Management",
              href: "",
            },
          ]}
        />

        <Button size="large" type="primary">
          Add User
        </Button>
      </div>

      <h3 className="font-medium text-3xl mb-3">List User</h3>
      <Table
        rowKey="taiKhoan"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={isLoading}
      />
      <div className="flex justify-end mt-10">
        <Pagination
          total={total}
          defaultCurrent={currentPage}
          onChange={(page: number) => {
            setCurrentPage(page);
          }}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default UserManagement;
