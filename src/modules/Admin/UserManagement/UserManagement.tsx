import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  message,
  Pagination,
  Popconfirm,
  Table,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { userApi } from "../../../apis/user.api";
import { GROUP_CODE, USER_TYPES_MAPPING } from "../../../constants";
import { UserItem } from "../../../interfaces/user.interface";
import { useOpenModal } from "../../../hooks/useOpenModal";
import AddOrEditUserModal, { FormValues } from "./AddOrEditUserModal";

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataEdit, setDataEdit] = useState<UserItem | undefined>(undefined);

  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { isOpen, openModal, closeModal } = useOpenModal();

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-user", { currentPage }],
    queryFn: () => userApi.getListUser({ page: currentPage }),
  });

  // Add user
  const { mutate: handleAddUserApi, isPending: isCreating } = useMutation({
    mutationFn: (payload: FormData) => userApi.addUser(payload),
    onSuccess: (data) => {
      console.log("🚀 ~ UserManagement ~ data:", data);
      messageApi.open({
        content: "Thêm user thành công",
        type: "success",
        duration: 3,
      });
      closeModal();
      queryClient.refetchQueries({
        queryKey: ["list-user", { currentPage }],
        type: "active",
      });
    },
    onError: (error: any) => {
      console.log("🚀 ~ UserManagement ~ error:", error?.message);
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  // Update User
  const { mutate: handleUpdateUserApi, isPending: isUpdating } = useMutation({
    mutationFn: (payload: FormData) => userApi.updateUser(payload),
    onSuccess: (data) => {
      console.log("🚀 ~ UserManagement ~ data:", data);
      messageApi.open({
        content: "Update user thành công",
        type: "success",
        duration: 3,
      });
      closeModal();
      queryClient.refetchQueries({
        queryKey: ["list-user", { currentPage }],
        type: "active",
      });
    },
    onError: (error: any) => {
      console.log("🚀 ~ UserManagement ~ error:", error?.message);
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  // Delete user
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
      console.log("🚀 ~ UserManagement ~ error:", error);
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
              onClick={() => {
                setDataEdit(record);
                openModal();
              }}
              loading={isUpdating}
            >
              <EditOutlined />
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
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const dataSource = data?.items || [];
  const total = data?.totalCount || 0;

  const handleSubmit = (formValues: FormValues) => {
    const formData = new FormData();
    formData.append("taiKhoan", formValues.taiKhoan);
    formData.append("matKhau", formValues.matKhau);
    formData.append("email", formValues.email);
    formData.append("soDT", formValues.soDt);
    formData.append("maNhom", GROUP_CODE);
    formData.append("maLoaiNguoiDung", formValues.maLoaiNguoiDung);
    formData.append("hoTen", formValues.hoTen);

    dataEdit ? handleUpdateUserApi(formData) : handleAddUserApi(formData);
  };

  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
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

        <Button
          size="large"
          type="primary"
          onClick={() => {
            setDataEdit(undefined);
            openModal();
          }}
        >
          <UserAddOutlined />
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

      <AddOrEditUserModal
        key={dataEdit ? "edit" : "add"}
        dataEdit={dataEdit}
        isOpen={isOpen}
        isPending={isCreating || isUpdating}
        onCloseModal={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default UserManagement;
