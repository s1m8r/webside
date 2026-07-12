import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import api from "./axios";
import z from "zod";
import { CartCreateSchema } from "@/schemas/cart";

const queryKey = ["product"];
type productFormData = z.infer<typeof CartCreateSchema>;
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

export const useGetCart = (search = "") => {
  return useQuery<productAll>({
    queryKey: [...queryKey, search],

    queryFn: async () => {
      const res = await api.get(`api/collection/cart?search=${search}`);

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useCart = () => {
  return useMutation({
    mutationFn: async (data: productFormData) => {
      const res = await api.post("/api/collection/cart", data);
      return res.data.data;
    },
  });
};
