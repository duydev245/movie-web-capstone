import { GROUP_CODE, PAGE_SIZE } from "../constants";
import { ApiResponse } from "../interfaces";
import {
  CurrentUser,
  DataListUser,
  UserItem,
  UserLoginRequest,
  UserRegisterRequest,
} from "./../interfaces/user.interface";
import fetcher from "./fetcher";

export const userApi = {
  login: async (data: UserLoginRequest) => {
    try {
      const response = await fetcher.post<ApiResponse<CurrentUser>>(
        "/QuanLyNguoiDung/DangNhap",
        data
      );

      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },

  register: async (payload: UserRegisterRequest) => {
    try {
      const response = await fetcher.post<ApiResponse<CurrentUser>>(
        "/QuanLyNguoiDung/DangKy",
        payload
      );

      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },

  getListUser: async (payload: { page: number }) => {
    try {
      const response = await fetcher.get<ApiResponse<DataListUser>>(
        `QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${GROUP_CODE}&soTrang=${payload.page}&soPhanTuTrenTrang=${PAGE_SIZE}`
      );
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },

  getInfoUser: async (maNhom: string, taiKhoan: string) => {
    try {
      const response = await fetcher.get<ApiResponse<UserItem>>(
        `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}&tuKhoa=${taiKhoan}`
      );
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },

  addUser: async (payload: FormData) => {
    try {
      const response = await fetcher.post(
        "/QuanLyNguoiDung/ThemNguoiDung",
        payload
      );

      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },

  updateUser: async (payload: FormData) => {
    try {
      const response = await fetcher.post(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        payload
      );

      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },

  deleteUser: async (idUser: string) => {
    try {
      const response = await fetcher.delete(
        `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${idUser}`
      );
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
};
