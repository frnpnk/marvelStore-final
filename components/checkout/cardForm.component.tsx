import { Stack } from "@mui/system";
import { type } from "os";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTexInput from "./controlledTextInput";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { maxHeaderSize } from "http";

/* 
Número de tarjeta
Nombre como aparece en la tarjeta
Fecha de expiración
Código de seguridad (secreto estilo contraseña ***) */


export const cardSchema = yup.object({
  num:yup.string().required('El numero de tarjeta es requerido').min(16, 'Corrobore la cantidad de caracteres').max(16, 'Corrobore la cantidad de caracteres'),
  name:yup.string().required('Su nombre completo es requerido').min(5, 'Su nombre debe tener al menos 5 caracteres'),
  exp:yup.string().required('La fecha de caducidad es requerido').min(4, 'La fecha de caducidad debe tener al menos 4 caracteres'),
  seccode:yup.string().required('El numero de seguridad es requerido').min(3, 'El codigo de seguridad debe tener al menos 3 caracteres'),
}).required();

export type cardFormData = {
  num: number
  name: string,
  exp: string,
  seccode: number
  }


const CardForm: FC = () => {
  const methods = useForm<cardFormData>();

  return (
    <Stack>
      <FormProvider {...methods}>
        <form action="">
          <ControlledTexInput name="num" defaultValue="" label="Numero de tarjeta" />
          <ControlledTexInput name="name" defaultValue=""label="Nombre completo"/>
          <ControlledTexInput name="exp" defaultValue="" label="Fecha de caducidad" />
          <ControlledTexInput name="seccode" defaultValue="" label="numero de seguridad" />
        </form>
      </FormProvider>
    </Stack>
  );
};

export default CardForm;