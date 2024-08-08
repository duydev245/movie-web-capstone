import { Button, Col, Form, Input, Modal, Row, Select, Typography } from "antd";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { UserItem } from "../../../interfaces/user.interface";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface FormValues {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: string;
}

interface AddOrEditUserModalProps {
  isOpen: boolean;
  isPending: boolean;
  onCloseModal: () => void;
  onSubmit: (formValues: FormValues) => void;
  dataEdit?: UserItem;
}

const AddOrEditUserModal: FC<AddOrEditUserModalProps> = ({
  isOpen,
  isPending,
  onCloseModal,
  dataEdit,
  onSubmit,
}) => {
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
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  useEffect(() => {
    if (dataEdit) {
      setValue("taiKhoan", dataEdit.taiKhoan);
      setValue("matKhau", dataEdit.matKhau);
      setValue("hoTen", dataEdit.hoTen);
      setValue("email", dataEdit.email);
      setValue("soDt", dataEdit.soDt);
      setValue("maLoaiNguoiDung", dataEdit.maLoaiNguoiDung);
    }
  }, [dataEdit, setValue]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, []);

  return (
    <Modal
      open={isOpen}
      title={
        <Typography className="text-2xl font-medium">
          {dataEdit ? "Edit user" : "Add user"}
        </Typography>
      }
      centered
      onCancel={onCloseModal}
      footer={null}
      width={700}
    >
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
                  placeholder="Vui lòng nhập tài khoản..."
                  disabled={!!dataEdit}
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
                <Input
                  {...field}
                  type="password"
                  size="large"
                  className="mt-1"
                  disabled={!!dataEdit} 
                  placeholder="Vui lòng nhập mật khẩu..."
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
                  defaultValue="Khách Hàng"
                  disabled={!!dataEdit} 
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
            <Button size="large" type="default" onClick={onCloseModal}>
              Cancel
            </Button>
            <Button
              loading={isPending}
              htmlType="submit"
              size="large"
              type="primary"
              className="ml-3"
            >
              {dataEdit ? "Edit user" : "Add user"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddOrEditUserModal;
