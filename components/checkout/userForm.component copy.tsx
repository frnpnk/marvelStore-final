import { Stack } from "@mui/system";
import { type } from "os";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTexInput from "./controlledTextInput";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'




export const userSchema = yup.object({
  name:yup.string().required('Su nombre es requerido').min(3, 'Su nombre debe tener al menos 3 caracteres'),
  lastName:yup.string().required('Su apellido es requerido').min(3, 'Su apellido debe tener al menos 3 caracteres'),
  email:yup.string().required('Su email es requerido').email('Su email no es valido'),
}).required();

export type UserFormData = {
  name: string,
  lastName: string,
  email: string
}


const UserForm: FC = () => {
  const methods = useForm<UserFormData>();

  return (
    <Stack>
      <FormProvider {...methods}>
        <form action="">
          <ControlledTexInput name="name" defaultValue="" label="Nombre" />
          <ControlledTexInput name="lastName" defaultValue=""label="Apellido"/>
          <ControlledTexInput name="email" defaultValue="" label="email" />
        </form>
      </FormProvider>
    </Stack>
  );
};

export default UserForm;