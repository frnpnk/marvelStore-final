import { Stack } from "@mui/system";
import { type } from "os";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTexInput from "./controlledTextInput";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'

/* Dirección (requerido)
Departamento, piso, etc (opcional)
Ciudad (requerido)
Provincia (requerido)
Código postal (requerido) */


export const adressSchema = yup.object({
  adress:yup.string().required('Su direccion es requerida').min(3, 'Su nombre debe tener al menos 3 caracteres'),
  dept:yup.string().optional(),
  city:yup.string().required('Su ciudad es requerida').min(3, 'Su ciudad debe tener al menos 3 caracteres'),
  state:yup.string().required('Su provincia es requerida').min(3, 'Su provincia debe tener al menos 3 caracteres'),
  postal:yup.string().required('Su codigo postal es requerido').min(3, 'Su codigo postal debe tener al menos 3 caracteres')
}).required();

export type adressFormData = {
  adress: string,
  dept: string,
  city: string,
  state: string,
  postal: string
}


const AdressForm: FC = () => {
  const methods = useForm<adressFormData>();

  return (
    <Stack>
      <FormProvider {...methods}>
        <form action="">
          <ControlledTexInput name="adress" defaultValue="" label="direccion" />
          <ControlledTexInput name="dept" defaultValue=""label="departamento"/>
          <ControlledTexInput name="city" defaultValue="" label="ciudad" />
          <ControlledTexInput name="state" defaultValue="" label="provincia" />
          <ControlledTexInput name="postal" defaultValue="" label="codigo postal" />
        </form>
      </FormProvider>
    </Stack>
  );
};

export default AdressForm;