export interface UserLoginRequest {
  taiKhoan: string;
  matKhau: string;
}
export interface UserRegisterRequest {
  taiKhoan: string;
  matKhau: string;
  email: string,
  maNhom: string;
  soDt: string,
  hoTen: string
}

export interface CurrentUser {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  accessToken: string;
}

export interface UserItem {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: null;
  maLoaiNguoiDung: string;
  hoTen: string;
}
export interface DataListUser {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: UserItem[];
}
