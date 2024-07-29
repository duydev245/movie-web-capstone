import { GROUP_CODE, PAGE_SIZE } from "../constants";
import { ApiResponse } from "../interfaces";
import { DataListMovie } from "../interfaces/movie.interface";
import fetcher from "./fetcher";

export const movieApi = {
  getListMovies: async (payload: { page: number; pageSize?: number }) => {
    const params = {
      maNhom: GROUP_CODE,
      soTrang: payload.page,
      soPhanTuTrenTrang: payload.pageSize || PAGE_SIZE,
    };

    try {
      const response = await fetcher.get<ApiResponse<DataListMovie>>(
        `/QuanLyPhim/LayDanhSachPhimPhanTrang`,
        { params }
      );

      return response.data.content;

    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
};
