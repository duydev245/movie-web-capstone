import { GROUP_CODE, PAGE_SIZE } from "../constants";
import { ApiResponse } from "../interfaces";
import {
  CurrentUser,
  DataListUser,
  UserLoginRequest,
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

  getListUser: async (payload: { page: number; pageSize?: number }) => {
    try {
      const params = {
        MaNhom: GROUP_CODE,
        soTrang: payload.page,
        soPhanTuTrenTrang: payload.pageSize || PAGE_SIZE,
      };
      const response = await fetcher.get<ApiResponse<DataListUser>>(
        `QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${GROUP_CODE}&soTrang=${
          payload.page
        }&soPhanTuTrenTrang=${payload.pageSize || PAGE_SIZE}`,
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
