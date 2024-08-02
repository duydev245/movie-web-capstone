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

//List Banner
export interface DataListBanner {
  statusCode: number;
  message: string;
  content: BannerItem[];
  dateTime: Date;
  messageConstants: null;
}

export interface BannerItem {
  maBanner: number;
  maPhim: number;
  hinhAnh: string;
}

// Cinemas

export interface Content {
  lstCumRap: ListCumRap[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  mahom: string;
}

export interface ListCumRap {
  danhSachPhim: DanhSachPhim[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
} 

export interface DanhSachPhim {
  lstLichChieuTheoPhim: ListLichChieuTheoPhim[];
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

export interface ListLichChieuTheoPhim {
  maLichChieu: number;
  maRap: string;
  tenRap: TenRap;
  ngayChieuGioChieu: Date;
  giaVe: number;
}

export enum TenRap {
  Rạp1 = "Rạp 1",
  Rạp10 = "Rạp 10",
  Rạp2 = "Rạp 2",
  Rạp3 = "Rạp 3",
  Rạp4 = "Rạp 4",
  Rạp5 = "Rạp 5",
  Rạp6 = "Rạp 6",
  Rạp7 = "Rạp 7",
  Rạp8 = "Rạp 8",
  Rạp9 = "Rạp 9",
}
