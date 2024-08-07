import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  GetProps,
  Input,
  Modal,
  Radio,
  Row,
  Typography,
  Upload,
} from "antd";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { MovieItem } from "../../../interfaces/movie.interface";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

export interface FormValues {
  maPhim: string;
  tenPhim: string;
  trailer: string;
  moTa: string;
  trangThai: boolean;
  hot: boolean;
  danhGia: string;
  ngayKhoiChieu: string | null;
  hinhAnh: any;
}

interface AddOrEditMovieModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  isPending: boolean;
  onSubmit: (formValues: FormValues) => void;
  dataEdit?: MovieItem;
}

const AddOrEditMovieModal: FC<AddOrEditMovieModalProps> = ({
  isOpen,
  onCloseModal,
  isPending,
  dataEdit,
  onSubmit,
}) => {
  const schema = yup.object({
    maPhim: yup.string().optional(),
    tenPhim: yup
      .string()
      .trim()
      .required("* Movie name không được bỏ trống ! "),
    trailer: yup.string().trim().required("* Trailer không được bỏ trống ! "),
    moTa: yup.string().trim().required("* Description không được bỏ trống ! "),
    danhGia: yup.string().trim().required("* Rate không được bỏ trống ! "),
    trangThai: yup.boolean().optional(),
    hot: yup.boolean().optional(),
    ngayKhoiChieu: yup
      .string()
      .nullable()
      .required("* Release date không được bỏ trống ! "),
    hinhAnh: yup
      .mixed()
      .nullable()
      .required("* Hình ảnh không được bỏ trống ! "),
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      trangThai: false,
      hot: false,
      danhGia: "",
      ngayKhoiChieu: null,
      hinhAnh: undefined,
    },
    resolver: yupResolver(schema as any),
    criteriaMode: "all",
  });

  const [imageUpload, setImageUpload] = useState("");

  const watchHinhAnh = watch("hinhAnh");
  const statusMovie = watch("trangThai");

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  useEffect(() => {
    setValue("hinhAnh", imageUpload);
  }, [imageUpload])

  useEffect(() => {
    if (dataEdit) {
      setValue("maPhim", dataEdit.maPhim.toString());
      setValue("tenPhim", dataEdit.tenPhim);
      setValue("trailer", dataEdit.trailer);
      setValue("moTa", dataEdit.moTa);
      setValue("trangThai", dataEdit.dangChieu);
      setValue("hot", dataEdit.hot);
      setValue("danhGia", dataEdit.danhGia.toString());
      setValue(
        "ngayKhoiChieu",
        dataEdit.ngayKhoiChieu
          ? dayjs(new Date(dataEdit.ngayKhoiChieu)).format("YYYY-MM-DD")
          : null
      );
      setImageUpload(dataEdit.hinhAnh);
    }
  }, [dataEdit, setValue]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, []);

  const getErrorMessage = (error: any): string | undefined => {
    if (!error) return undefined;
    if (typeof error === "string") return error;
    if ("message" in error) return error.message;
    return undefined;
  };
  return (
    <Modal
      open={isOpen}
      title={
        <Typography className="text-2xl font-medium">
          {dataEdit ? "Edit movie" : "Add movie"}
        </Typography>
      }
      centered
      onCancel={() => {
        onCloseModal();
        dataEdit?.hinhAnh && setImageUpload(dataEdit.hinhAnh);
        // window.location.reload();
      }}
      footer={false}
      width={700}
    >
      <Form className=" my-4 " onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 24]}>
          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Movie name
            </label>
            {errors.tenPhim && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.tenPhim.message}
              </span>
            )}
            <Controller
              name="tenPhim"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  placeholder="Movie name"
                  className="mt-1"
                />
              )}
            />
          </Col>
          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Trailer
            </label>
            {errors.trailer && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.trailer.message}
              </span>
            )}
            <Controller
              name="trailer"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  placeholder="Trailer"
                  className="mt-1"
                />
              )}
            />
          </Col>
          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Description
            </label>
            {errors.moTa && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.moTa.message}
              </span>
            )}
            <Controller
              name="moTa"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  rows={4}
                  size="large"
                  placeholder="Description"
                  className="mt-1"
                />
              )}
            />
          </Col>
          <Col span={24}>
            <label className="text-sm block">Status</label>
            <Controller
              name="trangThai"
              control={control}
              render={({ field }) => (
                <Radio.Group {...field} className="mt-1" defaultValue={false}>
                  <Radio value={true}>Showing</Radio>
                  <Radio value={false}>Coming soon</Radio>
                </Radio.Group>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              control={control}
              name="hot"
              render={({ field }) => (
                <Checkbox checked={field.value} {...field}>
                  Film hot
                </Checkbox>
              )}
            />
          </Col>
          <Col span={12}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Rate
            </label>
            {errors.danhGia && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {errors.danhGia.message}
              </span>
            )}
            <Controller
              control={control}
              name="danhGia"
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  placeholder="Rate"
                  type="number"
                  className="mt-1"
                  max={10}
                />
              )}
            />
          </Col>
          <Col span={12}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Release date
            </label>
            {errors.ngayKhoiChieu && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {getErrorMessage(errors.ngayKhoiChieu)}
              </span>
            )}
            <Controller
              name="ngayKhoiChieu"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  size="large"
                  className="mt-1 w-full"
                  placeholder="YYYY-MM-DD"
                  format={"YYYY-MM-DD"}
                  disabledDate={!statusMovie ? disabledDate : undefined}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? date.format("YYYY-MM-DD") : null)
                  }
                />
              )}
            />
          </Col>
          <Col span={24}>
            {errors.hinhAnh && (
              <span className="mt-1 text-sm text-red-500">
                {" "}
                {getErrorMessage(errors.hinhAnh)}
              </span>
            )}
            <Controller
              control={control}
              name="hinhAnh"
              render={({ field: { onChange, ...field } }) => {
                return (
                  <Upload
                    {...field}
                    multiple={false}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader w-fit"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={({ file }) => {
                      onChange(file);
                    }}
                  >
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      {watchHinhAnh || imageUpload ? (
                        <div className="relative w-full h-full">
                          <img
                            className="w-[105px] h-[105px] rounded-lg"
                            src={
                              imageUpload ||
                              (watchHinhAnh instanceof File
                                ? URL.createObjectURL(watchHinhAnh)
                                : undefined)
                            }
                            onClick={(event) => {
                              event.stopPropagation();
                            }}
                          />

                          <div
                            className="absolute top-1 right-1 cursor-pointer text-red-500 text-base"
                            onClick={(event) => {
                              event.stopPropagation();
                              setValue("hinhAnh", undefined);
                              setImageUpload("");
                            }}
                          >
                            <DeleteOutlined />
                          </div>
                        </div>
                      ) : (
                        <>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </>
                      )}
                    </button>
                  </Upload>
                );
              }}
            />
          </Col>
          <Col span={24} className="flex justify-end">
            <Button
              size="large"
              type="default"
              onClick={() => {
                onCloseModal();
                dataEdit?.hinhAnh && setImageUpload(dataEdit.hinhAnh);
                // window.location.reload();
              }}
            >
              Cancel
            </Button>
            <Button
              loading={isPending}
              disabled={isPending}
              htmlType="submit"
              size="large"
              type="primary"
              className="ml-3"
            >
              {dataEdit ? "Edit movie" : "Add movie"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddOrEditMovieModal;
