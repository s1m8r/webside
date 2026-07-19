import { z } from "zod";
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { registerSchema } from "@/schemas/user";
// import { Spinner } from "@/components/ui/spinner";
import InputForm from "./inputForm";
import { Calendar, Lock, Mail, UserRound } from "lucide-react";
import { Link } from "@tanstack/react-router";
import TitleContent from "../title";
import { Button } from "@/components/ui/button";
// import TitleContent from "@/components/layout/titleContent";

type registerFormData = z.infer<typeof registerSchema>;

type Props = {
  title: string;
  handleSubmit: UseFormHandleSubmit<registerFormData>;
  onsubmit: (data: registerFormData) => void;
  errors: FieldErrors<registerFormData>;
  register: UseFormRegister<registerFormData>;
  isPending?: boolean;
  isRegister?: boolean;
};

export default function RegisterForm({
  title,
  handleSubmit,
  onsubmit,
  errors,
  register,
  isPending,
  isRegister,
}: Props) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm p-5
      animate__animated animate__fadeIn
      animate-duration
      "
      >
        <TitleContent title={title} isRegister={isRegister} />
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          <div className="space-y-1">
            <InputForm
              register={register}
              icon={<UserRound />}
              name="firstName"
              placeholder="First Name"
              label="First Name"
              ariaInvalid={!!errors.firstName?.message}
              errorMessage={errors.firstName?.message}
            />
          </div>

          <div className="space-y-1">
            <InputForm
              register={register}
              icon={<UserRound size={22} />}
              name="lastName"
              placeholder="Last Name"
              label="Last Name"
              ariaInvalid={!!errors.lastName?.message}
              errorMessage={errors.lastName?.message}
            />
          </div>

          <div className="space-y-1">
            <InputForm
              register={register}
              icon={<Mail size={22} />}
              name="email"
              placeholder="Email"
              label="Email"
              ariaInvalid={!!errors.email?.message}
              errorMessage={errors.email?.message}
            />
          </div>

          <div className="space-y-1">
            <InputForm
              register={register}
              icon={<Lock size={22} />}
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
              ariaInvalid={!!errors.password?.message}
              errorMessage={errors.password?.message}
              isPassword={true}
            />
          </div>

          <div className="space-y-1">
            <InputForm
              register={register}
              icon={<Calendar size={22} />}
              name="age"
              placeholder="Age"
              label="Age"
              type="number"
              options={{ valueAsNumber: true }}
              ariaInvalid={!!errors.age?.message}
              errorMessage={errors.age?.message}
            />
          </div>

          <Button className="w-full" disabled={isPending}>
            Register
          </Button>
        </form>

        <Link
          to="/login"
          className="text-sm text-gray-500 hover:text-black transition underline underline-offset-4 flex justify-center mb-2 mt-2"
        >
          I have account go to login
        </Link>
      </div>
    </div>
  );
}
