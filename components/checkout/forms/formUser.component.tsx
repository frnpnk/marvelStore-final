import { Stack } from "@mui/system";
import { FC, useEffect, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTexInput from "../controlledTextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { FormContext } from "../context/FormContext";
import { useOrder } from "../context/OrderContext";
import { addressFormData } from "./formAddress.component";

export const userSchema = yup
  .object({
    name: yup
      .string()
      .required("Su nombre es requerido")
      .min(3, "Su nombre debe tener al menos 3 caracteres"),
    lastname: yup
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
  name: string,
  lastname: string,
  email: string,
  address: addressFormData
  };



const UserForm: FC = () => {
  const { state, dispatch } = useOrder();

  const methods = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "señor",
      lastname: "Jhonson",
      email: "Hola@SrJhonson.com",
    },
  });
  const { setFocus, handleSubmit } = methods;

  const { activeStep, setActiveStep } = useContext(FormContext);

  const onSubmit = (data: UserFormData) => {

    
    dispatch({
      type: "SET_USER",
      payload: data
    });

    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };


  useEffect(() => {
    setFocus("name");

  });

  return (
    <>
      <Stack>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ControlledTexInput name="name" label="Nombre" />
            <ControlledTexInput name="lastname" label="Apellido" />
            <ControlledTexInput name="email" label="email" />
            <Stack direction="row" mt={2}>
              <Button disabled={true} sx={{ mr: 1 }}>
                Atras
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                color="inherit"
                onClick={handleSubmit(onSubmit)}
                sx={{ mr: 1 }}
              >
                Siguiente
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </>
  );
};

export default UserForm;
