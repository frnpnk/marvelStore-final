import { Stack } from "@mui/system";
import { FC, useEffect, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTexInput from "../controlledTexInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@mui/material";
import { FormContext } from "dh-marvel/components/checkout/context/FormContext";
import useOrder from "dh-marvel/components/checkout/context/useOrder";
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
  name: string;
  lastname: string;
  email: string;
  address: addressFormData;
};

const UserForm: FC = () => {
  const { state, dispatch } = useOrder();
  const { activeStep, setActiveStep } = useContext(FormContext);

  const methods = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: 'Nombre',
      lastname: 'Apellido',
      email: "email@email.com",
    },
  });
  const { setFocus, handleSubmit } = methods;

  const onSubmit = (data: UserFormData) => {
    dispatch({
      type: "SET_USER",
      payload: data,
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
            <Box maxWidth={800}>
              <Grid container spacing={2} padding={"20px"}>
                <Grid item xs={11}>
                  <ControlledTexInput name="name" label="Nombre" />
                </Grid>
                <Grid item xs={11}>
                  <ControlledTexInput name="Apellido" label="Apellido" />
                </Grid>
                <Grid item xs={11}>
                  <ControlledTexInput name="email" label="email" />
                </Grid>
              </Grid>
            </Box>
            <Stack direction="row" mt={2}>
              <Button name="atras" disabled={true} sx={{ mr: 1 }}>
                Atras
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                name="siguiente"
                variant="contained"
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
