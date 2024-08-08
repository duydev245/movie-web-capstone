import { GROUP_CODE, PAGE_SIZE } from "../constants";
import { ApiResponse } from "../interfaces";
import { DataListBanner } from "../interfaces/movie.interface";
import fetcher from "./fetcher";

export const movieApi = {
  getListMovies: async <T>(payload: { page: number; pageSize?: number }) => {
    const params = {
      maNhom: GROUP_CODE,
      soTrang: payload.page,
      soPhanTuTrenTrang: payload.pageSize || PAGE_SIZE,
    };

    try {
      const response = await fetcher.get<ApiResponse<T>>(
        `/QuanLyPhim/LayDanhSachPhimPhanTrang`,
        { params }
      );

      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },

  addMovie: async (payload: FormData) => {
    try {
      const response = await fetcher.post(
        "/QuanLyPhim/ThemPhimUploadHinh",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.content;
    } catch (error: any) {
      console.error("Error details:", error.response.data);
      throw Error(error.response.data.content);
    }
  },

  updateMovie: async (payload: FormData) => {
    try {
      const response = await fetcher.post(
        "/QuanLyPhim/CapNhatPhimUpload",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.content;
    } catch (error: any) {
      console.error("Error details:", error.response.data); 
      throw Error(error.response.data.content);
    }
  },

  deleteMovie: async (idMovie: string) => {
    try {
      const response = await fetcher.delete(
        `/QuanLyPhim/XoaPhim?MaPhim=${idMovie}`
      );
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },

  listBanner: async () => {
    try {
      const response = await fetcher.get<ApiResponse<DataListBanner>>(
        "/QuanLyPhim/LayDanhSachBanner"
      );
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  listMovie: async () => {
    try {
      const response = await fetcher.get<ApiResponse<DataListBanner>>(
        `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_CODE}`
      );

      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  listCinemasId: async () => {
    try {
      const response = await fetcher.get<ApiResponse<any>>(
        `/QuanLyRap/LayThongTinHeThongRap`
      );

      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  listCinemasName: async (cinema: any) => {
    try {
      const response = await fetcher.get<ApiResponse<any>>(
        `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinema}`
      );

      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  listMovieByCinemas: async (cinema: any) => {
    try {
      const response = await fetcher.get<ApiResponse<any>>(
        `/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinema}&maNhom=${GROUP_CODE}`
      );

      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  movieDetails: async (maPhim: any) => {
    try {
      const response = await fetcher.get<ApiResponse<any>>(
        `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
      );

      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  movieBooking: async (maLichChieu: any) => {
    try {
      const response = await fetcher.get<ApiResponse<any>>(
        `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
      );

      return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
};
