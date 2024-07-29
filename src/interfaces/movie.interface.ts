export interface DataListMovie {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: MovieItem[];
}

export interface MovieItem {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: Date;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}
