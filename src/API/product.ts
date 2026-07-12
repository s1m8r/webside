import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "./axios";
import { ProdectScema } from "@/schemas/product";
import z from "zod";

const queryKey = ["product"];
type productFormData = z.infer<typeof ProdectScema>;
type productAll = {
  data: productFormData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export const useGetProducts = (page = 1, search = "") => {
  return useQuery<productAll>({
    queryKey: [...queryKey, page, search],

    queryFn: async () => {
      const res = await api.get(
        `api/collection/product?page=${page}&search=${search}`,
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetProduct = (id: number) => {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const res = await api.get<productFormData>(
        `/api/collection/product/${id}`,
      );
      return res.data;
    },
    enabled: !!id,
  });
};
