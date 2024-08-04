import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, message, Pagination, Popconfirm, Table, Tag } from "antd";
import { useState } from "react";
import { userApi } from "../../../apis/user.api";
import { USER_TYPES_MAPPING } from "../../../constants";
import { UserItem } from "../../../interfaces/user.interface";

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();



  const { data, isLoading, error } = useQuery({
    queryKey: ["list-user", { currentPage }],
    queryFn: () => userApi.getListUser({ page: currentPage }),
  });

  // delete user 
  const { mutate: handleDeleteUserApi, isPending: isDeleting } = useMutation({
    mutationFn: (idUser: string) => userApi.deleteUser(idUser),
    onSuccess: () => {
      messageApi.open({
        content: "Xóa user thành công",
        type: "success",
        duration: 3,
      });
      queryClient.refetchQueries({
        queryKey: ["list-user", { currentPage }],
        type: "active",
      });
    },
    onError: (error: any) => {
      console.log("🚀 ~ UserManagement ~ error:", error)
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  const columns = [
    {
      title: "Account ID",
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
            <Popconfirm
              title="Delete user"
              description="Are you sure to delete this user?"
              onConfirm={() => handleDeleteUserApi(record.taiKhoan)}
              onCancel={() => {}}
              placement="left"
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger disabled={isDeleting}>
                Delete
              </Button>
            </Popconfirm>
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
      {contextHolder}
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
