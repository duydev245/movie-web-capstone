import { useMutation } from "@tanstack/react-query";
import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { userApi } from "../../../apis/user.api";
import {
  CurrentUser,
  UserLoginRequest,
} from "../../../interfaces/user.interface";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/slices/user.slice";
import { setLocalStorage } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/path";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const schema = yup.object({
    username: yup
      .string()
      .trim()
      .required("*Tài khoản không được bỏ trống !")
      .min(4, "*Tài khoản phải trên 3 kí tự !"),
    password: yup.string().trim().required("*Mật khẩu không được bỏ trống !"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: handleLogin } = useMutation({
    mutationFn: (payload: UserLoginRequest) => userApi.login(payload),
    onSuccess: (currentUser) => {
      setLocalStorage<CurrentUser>("user", currentUser);
      dispatch(setUser(currentUser));
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
    };
    handleLogin(payload);
  };

  return (
    <div className="container">
      <div className="mt-3 mb-8 text-center">
        {contextHolder}
        <Typography className="text-white text-lg">
          Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!
        </Typography>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 16]}>
          <Col span={24}>
            <label className="text-base text-white">*Tài Khoản:</label>
            {errors?.username && (
              <>
                {" "}
                <span className="mt-1 text-sm text-red-500">
                  {errors.username.message}
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
                    status={errors.username ? "error" : ""}
                  />
                );
              }}
            />
          </Col>

          <Col span={24}>
            <label className="text-base text-white">*Mật khẩu:</label>
            {errors?.password && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.password.message}
              </span>
            )}
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="password"
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập mật khẩu..."
                    status={errors.password ? "error" : ""}
                  />
                );
              }}
            />
          </Col>

          <Col span={24}>
            <Typography className="text-sm text-white">
              Chưa có tài khoản?{" "}
              <span
                className="text-green-400 font-medium cursor-pointer"
                onClick={() => navigate(PATH.REGISTER)}
              >
                Tạo tài khoản
              </span>
            </Typography>
          </Col>

          <Col span={24}>
            <Button
              className="font-medium text-xl"
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Đăng nhập
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
