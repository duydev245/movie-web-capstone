import fetcher from "./fetcher";

export const cineApi = {
  getListCines: async () => {
    try {
      const response = await fetcher.get(`/QuanLyRap/LayThongTinHeThongRap`);

      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
};
