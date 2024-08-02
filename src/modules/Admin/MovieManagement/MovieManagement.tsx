import { ClockCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  message,
  Pagination,
  Popconfirm,
  Rate,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { format } from "date-fns";
import { useState } from "react";
import { movieApi } from "../../../apis/movie.api";
import { useListMovies } from "../../../hooks/useListMovie";
import { useOpenModal } from "../../../hooks/useOpenModal";
import { MovieItem } from "../../../interfaces/movie.interface";
import AddOrEditMovieModal, { FormValues } from "./AddOrEditMovieModal";
import { GROUP_CODE } from "../../../constants";

const MovieManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataEdit, setDataEdit] = useState<MovieItem | undefined>(undefined);
  const { isOpen, openModal, closeModal } = useOpenModal();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useListMovies(currentPage);
  const [messageApi, contextHolder] = message.useMessage();

  // add movie
  const { mutate: handleAddMovieApi, isPending: isCreating } = useMutation({
    mutationFn: (payload: FormData) => movieApi.addMovie(payload),
    onSuccess: (data) => {
      console.log("data", data);
      messageApi.open({
        content: "Thêm phim thành công",
        type: "success",
        duration: 3,
      });
      closeModal();
      queryClient.refetchQueries({
        queryKey: ["list-movies", { currentPage }],
        type: "active",
      });
    },
    onError: (error: any) => {
      console.log("🚀 ~ MovieManagement ~ error:", error?.message);
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  // update movie
  const { mutate: handleUpdateMovieApi, isPending: isUpdating } = useMutation({
    mutationFn: (payload: FormData) => movieApi.updateMovie(payload),
    onSuccess: (data) => {
      console.log("data", data);
      messageApi.open({
        content: "Cập nhật phim thành công",
        type: "success",
        duration: 3,
      });
      closeModal();
      queryClient.refetchQueries({
        queryKey: ["list-movies", { currentPage }],
        type: "active",
      });
    },
    onError: (error: any) => {
      console.log("🚀 ~ MovieManagement ~ error:", error?.message);
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  // delete movie
  const { mutate: handleDeleteMovieApi, isPending: isDeleting } = useMutation({
    mutationFn: (idMovie: string) => movieApi.deleteMovie(idMovie),
    onSuccess: () => {
      messageApi.open({
        content: "Xóa phim thành công",
        type: "success",
        duration: 3,
      });
      queryClient.refetchQueries({
        queryKey: ["list-movies", { currentPage }],
        type: "active",
      });
    },
    onError: (error: any) => {
      console.log("🚀 ~ MovieManagement ~ error:", error?.message);
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
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
              rows: 4,
            }}
            className="w-[150px]"
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
              onClick={() => {
                setDataEdit(record);
                openModal();
              }}
              loading={isUpdating}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the movie"
              description="Are you sure to delete this movie?"
              onConfirm={() => handleDeleteMovieApi(record.maPhim)}
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

  const handleSubmit = (formValues: FormValues) => {
    const formData = new FormData();
    formData.append("tenPhim", formValues.tenPhim);
    formData.append("trailer", formValues.trailer);
    formData.append("danhGia", formValues.danhGia);
    formData.append("moTa", formValues.moTa);

    if (formValues.hinhAnh) {
      formData.append("hinhAnh", formValues.hinhAnh);
    }

    formData.append("hot", formValues.hot.toString());
    formData.append("dangChieu", formValues.trangThai ? "true" : "false");
    formData.append("sapChieu", formValues.trangThai ? "false" : "true");
    formData.append(
      "ngayKhoiChieu",
      format(new Date(formValues.ngayKhoiChieu), "dd/MM/yyyy")
    );
    formData.append("maNhom", GROUP_CODE);
    if (dataEdit) {
      formData.append("maPhim", dataEdit.maPhim.toString());
      handleUpdateMovieApi(formData);
    } else {
      handleAddMovieApi(formData);
    }
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      {contextHolder}
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

        <Space wrap>
          <Select
            defaultValue="Upcoming.."
            style={{ width: 120, height: 40 }}
            onChange={handleChange}
            options={[
              { value: "GP01", label: "GP01", disabled: true },
              { value: "GP02", label: "GP02", disabled: true },
              { value: "GP03", label: "GP03", disabled: true },
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
            Add Movie
          </Button>
        </Space>
      </div>

      <h3 className="font-medium text-2xl mb-3">List movies</h3>

      <Table
        rowKey="maPhim"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={isLoading}
      />
      <div className="flex justify-end my-3">
        <Pagination
          total={total}
          defaultCurrent={currentPage}
          onChange={(page: number) => {
            setCurrentPage(page);
          }}
          showSizeChanger={false}
        />
      </div>

      <AddOrEditMovieModal
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

export default MovieManagement;
