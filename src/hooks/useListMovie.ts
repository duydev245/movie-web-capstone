import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { movieApi } from "../apis/movie.api";
import { DataListMovie } from "../interfaces/movie.interface";

type UseListMoviesOptions = Omit<
  UseQueryOptions<DataListMovie>,
  "queryKey" | "queryFn"
>;

export const useListMovies = (
  currentPage: number,
  options?: UseListMoviesOptions
) => {
  const queryResult = useQuery({
    queryKey: ["list-movies", { currentPage }],
    queryFn: () => movieApi.getListMovies<DataListMovie>({ page: currentPage }),
    ...options,
  });
  return {
    dataMovie: queryResult.data,
    ...queryResult,
  };
};
