import { GROUP_CODE, PAGE_SIZE } from "../constants";
import { ApiResponse } from "../interfaces";
import {
  CurrentUser,
  DataListUser,
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

  getListUser: async (payload: { page: number; }) => {
    try {
      const params = {
        MaNhom: GROUP_CODE,
        soTrang: payload.page,
        soPhanTuTrenTrang: PAGE_SIZE,
      };
      const response = await fetcher.get<ApiResponse<DataListUser>>(
        `QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${GROUP_CODE}&soTrang=${
          payload.page
        }&soPhanTuTrenTrang=${PAGE_SIZE}`,
        {
          params
        }
      );
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
};
