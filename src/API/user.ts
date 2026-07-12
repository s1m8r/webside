import { useMutation } from "@tanstack/react-query";
import api from "./axios";
import { loginScema, registerSchema } from "@/schemas/user";
import { useAuthStore } from "@/stores/userStore";
import z from "zod";
type loginSchemaType = z.infer<typeof loginScema>;
type registerFormData = z.infer<typeof registerSchema>;

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: loginSchemaType) => {
      const res = await api.post("/api/login", data);
      return res.data;
    },
    onSuccess: (res) => {
      useAuthStore.getState().setToken(res.token);
      useAuthStore.getState().setUser(res.user);
      window.location.href = "/";
    },
  });
};
export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: registerFormData) => {
      const res = await api.post("/api/users", data);
      return res.data.data;
    },
  });
};
