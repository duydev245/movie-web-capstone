import { Col, Form, Input, message, Row, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/path";
import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../../apis/user.api";
import { UserRegisterRequest } from "../../../interfaces/user.interface";
import { GROUP_CODE } from "../../../constants";

interface FormValues {
  username: string;
  password: string;
  confirmPassword: string;
  fullname: string;
  mail: string;
  phone: string;
}

const Register = () => {
  const schema = yup.object({
    username: yup
      .string()
      .trim()
      .required("*Tài khoản không được bỏ trống !")
      .min(4, "*Tài khoản phải trên 3 kí tự !"),
    password: yup
      .string()
      .trim()
      .required("*Mật khẩu không được bỏ trống !")
      .min(5, "*Mật khẩu phải trên 5 kí tự !"),
    confirmPassword: yup
    .string()
    .trim()
    .notRequired()
    .required("*Xác Nhận mật khẩu không được bỏ trống !")
    .oneOf([yup.ref("password")], "Xác Nhận Mật Khẩu Sai"),
    fullname: yup.string().trim().required("*Họ và tên không được bỏ trống !"),
    mail: yup
      .string()
      .trim()
      .required("*Email không được bỏ trống !")
      .email("*Email không hợp lệ !"),
    phone: yup
      .string()
      .trim()
      .required("*Số điện thoại không được bỏ trống !")
      .matches(/^[0-9]+$/, "*Số điện thoại không được là kí tự !")
      .min(9, "*Số điện thoại phải trên 9 kí tự !")
      .max(15, "*Số điện thoại không được quá 15 kí tự !"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      fullname: "",
      mail: "",
      phone: "",
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate: handleRegister } = useMutation({
    mutationFn: (payload: UserRegisterRequest) => userApi.register(payload),
    onSuccess: () => {
      // console.log("🚀 ~ Register ~ data:", data);
      messageApi.open({
        content: "Đăng ký thành công",
        type: "success",
        duration: 3,
      });
      navigate(PATH.LOGIN);
    },
    onError: (error: any) => {
      messageApi.open({
        content: error.message,
        type: "error",
        duration: 3,
      });
    },
  });

  const onSubmit = (values: FormValues) => {
    const payload = {
      taiKhoan: values.username,
      matKhau: values.password,
      email: values.mail,
      soDt: values.phone,
      hoTen: values.fullname,
      maNhom: GROUP_CODE,
    };
    handleRegister(payload);
  };

  return (
    <div className="container">
      {contextHolder}
      <div className="mt-3 mb-3 text-center">
        <Typography className="text-white text-lg">
          Đăng ký để được nhiều ưu đãi, mua vé và bảo mật thông tin!
        </Typography>
      </div>

      <Form
        layout="vertical"
        className="overflow-visible"
        style={{ maxHeight: `100vh` }}
        onFinish={handleSubmit(onSubmit)}
      >
        <Row gutter={[24, 10]}>
          <Col span={24}>
            <label className="text-base text-white">*Tài Khoản:</label>
            {errors?.username && (
              <>
                {" "}
                <span className="mt-1 text-sm text-red-500">
                  {errors.username?.message}
                </span>
              </>
            )}
            <Controller
              name="username"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập tài khoản..."
                  />
                );
              }}
            />
          </Col>

          <Col span={24}>
            <label className="text-base text-white">*Mật khẩu:</label>
            {errors?.password && (
              <>
                {" "}
                <span className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </span>
              </>
            )}
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <Input.Password
                    {...field}
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập mật khẩu..."
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                );
              }}
            />
          </Col>

          <Col span={24}>
            <label className="text-base text-white">*Xác nhận mật khẩu:</label>
            {errors?.confirmPassword && (
              <>
                {" "}
                <span className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </span>
              </>
            )}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => {
                return (
                  <Input.Password
                    {...field}
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập mật khẩu..."
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                );
              }}
            />
          </Col>

          <Col span={24}>
            <label className="text-base text-white">*Họ và tên:</label>
            {errors?.fullname && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.fullname.message}
              </span>
            )}
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập họ và tên..."
                  />
                );
              }}
            />
          </Col>

          <Col span={24}>
            <label className="text-base text-white">*Email:</label>
            {errors?.mail && (
              <>
                {" "}
                <span className="mt-1 text-sm text-red-500">
                  {errors.mail.message}
                </span>
              </>
            )}
            <Controller
              name="mail"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="mail"
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập email..."
                  />
                );
              }}
            />
          </Col>

          <Col span={24}>
            <label className="text-base text-white">*Số điện thoại:</label>
            {errors?.phone && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.phone.message}
              </span>
            )}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập số điện thoại..."
                  />
                );
              }}
            />
          </Col>

          <Col span={24}>
            <Typography className="text-sm text-white">
              Đã có tài khoản?{" "}
              <span
                className="text-blue-400 font-medium cursor-pointer"
                onClick={() => navigate(PATH.LOGIN)}
              >
                Đăng nhập
              </span>
            </Typography>
          </Col>

          <Col span={24} className="text-center">
            <button
              className="button2 text-base border-none rounded-lg px-8 py-2"
              type="submit"
            >
              Đăng ký
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Register;
