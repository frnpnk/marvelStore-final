import { Stack } from "@mui/system";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTexInput from "./controlledTextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { lstat } from "fs/promises";

export const userSchema = yup
  .object({
    name: yup
      .string()
      .required("Su nombre es requerido")
      .min(3, "Su nombre debe tener al menos 3 caracteres"),
    lastName: yup
      .string()
      .required("Su apellido es requerido")
      .min(3, "Su apellido debe tener al menos 3 caracteres"),
    email: yup
      .string()
      .required("Su email es requerido")
      .email("Su email no es valido"),
  })
  .required();

export type UserFormData = {
  name: string;
  lastName: string;
  email: string;
};

const UserForm: FC = () => {
  const methods = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "señor",
      lastName: "Jhonson",
      email: "Hola@SrJhonson.com",
    },
  });
  const { setFocus, handleSubmit } = methods;

  const onsubmit = (data: UserFormData) => {
    console.log(JSON.stringify(data));
  };
  useEffect(() => {
    setFocus("name");
  });
  return (
    <Stack>
      <form onSubmit={handleSubmit(onsubmit)}>
        <FormProvider {...methods}>
          <ControlledTexInput name="name" label="Nombre" />
          <ControlledTexInput name="lastName" label="Apellido" />
          <ControlledTexInput name="email" label="email" />
        </FormProvider>
      </form>
    </Stack>
  );
};

export default UserForm;
