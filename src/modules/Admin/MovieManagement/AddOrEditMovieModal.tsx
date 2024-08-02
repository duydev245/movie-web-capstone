import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  GetProps,
  Image,
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

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

export interface FormValues {
  tenPhim: string;
  trailer: string;
  moTa: string;
  trangThai: boolean;
  hot: boolean;
  danhGia: string;
  ngayKhoiChieu: any;
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
  const { handleSubmit, control, setValue, watch, reset } = useForm<FormValues>(
    {
      defaultValues: {
        tenPhim: "",
        trailer: "",
        moTa: "",
        trangThai: false,
        hot: false,
        danhGia: "",
        ngayKhoiChieu: "",
        hinhAnh: undefined,
      },
    }
  );

  const [imageUpload, setImageUpload] = useState("");

  const watchHinhAnh = watch("hinhAnh");
  const statusMovie = watch("trangThai");

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  useEffect(() => {
    if (dataEdit) {
      setValue("tenPhim", dataEdit.tenPhim);
      setValue("trailer", dataEdit.trailer);
      setValue("moTa", dataEdit.moTa);
      setValue("trangThai", dataEdit.dangChieu);
      setValue("hot", dataEdit.hot);
      setValue("danhGia", dataEdit.danhGia.toString());
      setValue("ngayKhoiChieu", dayjs(new Date(dataEdit.ngayKhoiChieu)));
      setImageUpload(dataEdit.hinhAnh);
    }
  }, [dataEdit]);

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
          {dataEdit ? "Edit movie" : "Add movie"}
        </Typography>
      }
      centered
      onCancel={onCloseModal}
      footer={false}
      width={700}
    >
      <Form className=" my-4 " onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 24]}>
          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Movie name
            </label>
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
            <Controller
              name="ngayKhoiChieu"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  size="large"
                  className="mt-1 w-full"
                  placeholder="DD/MM/YYYY"
                  format={"DD/MM/YYYY"}
                  disabledDate={!statusMovie ? disabledDate : undefined}
                />
              )}
            />
          </Col>
          <Col span={24}>
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
                              URL.createObjectURL(new Blob([watchHinhAnh]))
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
            <Button size="large" type="default" onClick={onCloseModal}>
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
