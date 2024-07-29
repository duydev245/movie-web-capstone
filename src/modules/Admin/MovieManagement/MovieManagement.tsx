import {
  ClockCircleOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Pagination,
  Radio,
  Rate,
  Row,
  Table,
  Tag,
  Typography,
  Upload,
} from "antd";
import { format } from "date-fns";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { movieApi } from "../../../apis/movie.api";
import { MovieItem } from "../../../interfaces/movie.interface";

interface FormValues {
  tenPhim: string;
  trailer: string;
  moTa: string;
  trangThai: boolean;
  hot: boolean;
  danhGia: string;
  ngayKhoiChieu: string;
  hinhAnh: any;
}

const MovieManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { handleSubmit, control, setValue, watch } = useForm<FormValues>({
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
  });
  const { data, isLoading, error } = useQuery({
    queryKey: ["list-movies", { currentPage }],
    queryFn: () => movieApi.getListMovies({ page: currentPage }),
  });

  const columns = [
    {
      title: "Movie name",
      key: "movie-name",
      dataIndex: "tenPhim",
      width: 100,
    },
    {
      title: "Image",
      key: "image",
      render: (record: MovieItem) => {
        return (
          <img
            src={record.hinhAnh}
            alt={record.biDanh}
            className="w-[100px] h-[120px] rounded-sm object-cover"
          />
        );
      },
    },
    {
      title: "Description",
      key: "description",
      render: (record: MovieItem) => {
        return (
          <Typography.Paragraph
            ellipsis={{
              rows: 2,
            }}
            className="w-[100px]"
          >
            {record.moTa}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: "Show time",
      key: "show-time",
      dataIndex: "ngayKhoiChieu",
      render: (date: string) => {
        return <Typography>{format(date, "dd/MM/yyyy")}</Typography>;
      },
    },
    {
      title: "Rate",
      key: "rate",
      dataIndex: "danhGia",
      render: (rate: number) => {
        return <Rate disabled allowHalf value={(rate || 0) / 2} count={5} />;
      },
    },
    {
      title: "Hot",
      key: "hot",
      dataIndex: "hot",
      render: (isHot: boolean) => {
        return isHot ? (
          <Tag color="red">Hot 🔥 </Tag>
        ) : (
          <Tag color="green">Normal</Tag>
        );
      },
    },
    {
      title: "Showing",
      key: "dangChieu",
      dataIndex: "dangChieu",
      render: (isShowing: boolean) => {
        return isShowing ? (
          <Tag icon={<SyncOutlined spin />} color="processing">
            Showing
          </Tag>
        ) : (
          <Tag>N/A</Tag>
        );
      },
    },
    {
      title: "Coming soon",
      key: "sapChieu",
      dataIndex: "sapChieu",
      render: (isComingSoon: boolean) => {
        return isComingSoon ? (
          <Tag color="success" icon={<ClockCircleOutlined />}>
            Coming soon
          </Tag>
        ) : (
          <Tag>N/A</Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => {
        return (
          <div className="flex">
            <Button
              type="primary"
              className="mr-2"
              onClick={() => alert(record.maPhim)}
            >
              Edit
            </Button>
            <Button type="primary" danger onClick={() => alert(record.maPhim)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const dataSource = data?.items || [];
  const total = data?.totalCount || 0;

  const watchHinhAnh = watch("hinhAnh");

  console.log("watchHinhAnh", watchHinhAnh);

  const onSubmit = (formValues: FormValues) => {
    console.log("formValues", formValues);
    let formData = new FormData();
  };

  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  // we can assume that `isLoading` is false

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Dashboard",
            },
            {
              title: "Movie Management",
              href: "",
            },
          ]}
        />

        <Button
          size="large"
          type="primary"
          onClick={() => setIsOpenModal(true)}
        >
          Add Movie
        </Button>
      </div>
      <h3 className="font-medium text-2xl mb-3">List movies</h3>
      <Table
        rowKey="maPhim"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={isLoading}
      />
      <div className="flex justify-end mt-10">
        <Pagination
          total={total}
          defaultCurrent={currentPage}
          onChange={(page: number, pSize: number) => {
            setCurrentPage(page);
          }}
          showSizeChanger={false}
        />
      </div>

      <Modal
        open={isOpenModal}
        title={
          <Typography className="text-2xl font-medium">Add movie</Typography>
        }
        centered
        onCancel={() => setIsOpenModal(false)}
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
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={() => false}
                      onChange={(info) => {
                        onChange(info.file);
                        // setValue('hinhAnh', info.file);
                      }}
                    >
                      <button
                        style={{ border: 0, background: "none" }}
                        type="button"
                      >
                        {watchHinhAnh ? (
                          <div>
                            <img
                              className="w-[60px] h-[80px] object-cover"
                              src={URL.createObjectURL(
                                new Blob([watchHinhAnh])
                              )}
                            />
                            {/* icon delete */}
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
              <Button size="large" type="default" onClick={() => setIsOpenModal(false)}>
                Cancel
              </Button>
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                className="ml-3"
              >
                Add movie
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default MovieManagement;
