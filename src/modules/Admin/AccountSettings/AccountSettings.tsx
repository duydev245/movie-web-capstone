import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
} from "antd";
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { FormValues } from "../UserManagement/AddOrEditUserModal";
import { userApi } from "../../../apis/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AccountSettings = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { currentUser } = useSelector((state: any) => state.user);

  const { data, isLoading, error } = useQuery({
    queryKey: ["info-user"],
    queryFn: () =>
      userApi.getInfoUser(currentUser.maNhom, currentUser.taiKhoan),
  });

  // Update Info Api
  const { mutate: handleUpdateUserApi, isPending } = useMutation({
    mutationFn: (payload: FormData) => userApi.updateUser(payload),
    onSuccess: (data) => {
      console.log("🚀 ~ UserManagement ~ data:", data);
      messageApi.open({
        content: "Update thông tin thành công",
        type: "success",
        duration: 3,
      });
      queryClient.refetchQueries({
        queryKey: ["info-user"],
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

  const schema = yup.object({
    taiKhoan: yup
      .string()
      .trim()
      .required("*Tài khoản không được bỏ trống !")
      .min(4, "*Tài khoản phải trên 3 kí tự !"),
    matKhau: yup
      .string()
      .trim()
      .required("*Mật khẩu không được bỏ trống !")
      .min(5, "*Mật khẩu phải trên 5 kí tự !"),
    hoTen: yup.string().trim().required("*Họ và tên không được bỏ trống !"),
    email: yup
      .string()
      .trim()
      .required("*Email không được bỏ trống !")
      .email("*Email không hợp lệ !"),
    soDt: yup
      .string()
      .trim()
      .required("*Số điện thoại không được bỏ trống !")
      .matches(/^[0-9]+$/, "*Số điện thoại không được là kí tự !")
      .min(9, "*Số điện thoại phải trên 9 kí tự !")
      .max(15, "*Số điện thoại không được quá 15 kí tự !"),
    maLoaiNguoiDung: yup
      .string()
      .trim()
      .required("*Mã loại người dùng không được bỏ trống !"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      taiKhoan: data?.taiKhoan || "",
      matKhau: data?.matKhau || "",
      hoTen: data?.hoTen || "",
      email: data?.email || "",
      soDt: data?.soDt || "",
      maLoaiNguoiDung: data?.maLoaiNguoiDung || "",
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const onSubmit = (formValues: FormValues) => {
    const formData = new FormData();
    formData.append("taiKhoan", formValues.taiKhoan);
    formData.append("matKhau", formValues.matKhau);
    formData.append("email", formValues.email);
    formData.append("soDT", formValues.soDt);
    formData.append("maNhom", currentUser.maNhom);
    formData.append("maLoaiNguoiDung", formValues.maLoaiNguoiDung);
    formData.append("hoTen", formValues.hoTen);
    console.log("🚀 ~ handleSubmit ~ formData:", formData);

    handleUpdateUserApi(formData);
  };

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const userData = data[0];
      setValue("taiKhoan", userData?.taiKhoan || "");
      setValue("matKhau", userData?.matKhau || "");
      setValue("hoTen", userData?.hoTen || "");
      setValue("email", userData?.email || "");
      setValue("soDt", userData?.soDT || "");
      setValue("maLoaiNguoiDung", userData?.maLoaiNguoiDung || "");
    }
  }, [data]);

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
              title: "Account Settings",
              href: "",
            },
          ]}
        />
      </div>
      <h3 className="font-medium text-3xl mb-3"> Your information:</h3>

      <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 24]}>
          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Tài Khoản
            </label>
            {errors?.taiKhoan && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.taiKhoan?.message}
              </span>
            )}
            <Controller
              name="taiKhoan"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  size="large"
                  className="mt-1"
                  disabled={true}
                  placeholder="Vui lòng nhập tài khoản..."
                />
              )}
            />
          </Col>

          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Mật khẩu
            </label>
            {errors?.matKhau && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.matKhau?.message}
              </span>
            )}
            <Controller
              name="matKhau"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  className="mt-1"
                  placeholder="Vui lòng nhập mật khẩu..."
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              )}
            />
          </Col>

          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Họ và tên
            </label>
            {errors?.hoTen && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.hoTen?.message}
              </span>
            )}
            <Controller
              name="hoTen"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  size="large"
                  className="mt-1"
                  placeholder="Vui lòng nhập họ và tên..."
                />
              )}
            />
          </Col>

          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Email
            </label>
            {errors?.email && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.email?.message}
              </span>
            )}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  size="large"
                  className="mt-1"
                  placeholder="Vui lòng nhập email..."
                />
              )}
            />
          </Col>

          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Số điện thoại
            </label>
            {errors?.soDt && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.soDt?.message}
              </span>
            )}
            <Controller
              name="soDt"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  size="large"
                  className="mt-1"
                  placeholder="Vui lòng nhập số điện thoại..."
                />
              )}
            />
          </Col>

          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Loại người dùng
            </label>
            {errors?.maLoaiNguoiDung && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.maLoaiNguoiDung?.message}
              </span>
            )}
            <Controller
              name="maLoaiNguoiDung"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  disabled={true}
                  defaultValue="Khách Hàng"
                  className="mt-1"
                  style={{ width: `100%`, height: 45, display: "block" }}
                  options={[
                    { value: "KhachHang", label: "Khách Hàng" },
                    { value: "QuanTri", label: "Quản Trị" },
                  ]}
                />
              )}
            />
          </Col>

          <Col span={24} className="flex justify-end">
            <Button
              loading={isPending}
              htmlType="submit"
              size="large"
              type="primary"
              className="ml-3"
            >
              <EditOutlined />
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AccountSettings;
