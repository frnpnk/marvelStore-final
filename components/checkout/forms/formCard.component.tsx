import { Stack } from "@mui/system";
import { FC, useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTexInput from "../controlledTexInput";
import ControlledPassInput from "../controlledPassInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, IconButton, Snackbar, Grid } from "@mui/material";
import { FormContext } from "../context/FormContext";
import useOrder from "dh-marvel/components/checkout/context/useOrder";
import router from "next/router";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";

export const cardSchema = yup
  .object({
    number: yup
      .string()
      .required("El numero de tarjeta es requerido")
      .min(16, "Corrobore la cantidad de caracteres")
      .max(16, "Corrobore la cantidad de caracteres"),
    nameOnCard: yup
      .string()
      .required("Su nombre completo es requerido")
      .min(5, "Su nombre debe tener al menos 5 caracteres"),
    expDate: yup
      .string()
      .required("La fecha de caducidad es requerida")
      .min(4, "La fecha de caducidad debe tener al menos 4 caracteres"),
    cvc: yup
      .string()
      .required("El numero de seguridad es requerido")
      .min(3, "El codigo de seguridad debe tener al menos 3 caracteres"),
  })
  .required();

export type cardFormData = {
  number: string;
  cvc: string;
  expDate: string;
  nameOnCard: string;
};

const CardForm: FC = () => {
  const { state, dispatch } = useOrder();
  const { setActiveStep } = useContext(FormContext);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const methods = useForm<cardFormData>({
    resolver: yupResolver(cardSchema),
    defaultValues: {
      number: "4242424242424242",
      nameOnCard: "senor jhonson",
      expDate: "1234",
      cvc: "123",
    },
  });
  const { setFocus, handleSubmit } = methods;

  const onSubmit = async (data: cardFormData) => {
    dispatch({
      type: "SET_CARD",
      payload: data,
    });

    postCheckout({ ...state.order, card: data });
  };

  const postCheckout = async (dataPost: CheckoutInput) => {
    await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => {
        if (response.status === 405) {
          console.log("ERROR_METHOD_NOT_ALLOWED");
        } else {
          return response.json();
        }
      })
      .then((res) => {
        console.log(res);
        if (res.error) {
          setOpen(true);
          setMessage(res.message);
          return res.message;
        } else {
          router.push("/confirmacion-compra");
        }
      });
  };

  useEffect(() => {
    setFocus("number");
  });
  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Stack>
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Box maxWidth={800}>
            <Grid container spacing={2} padding={"20px"}>
              <Grid item xs={11}>
                <ControlledTexInput
                  name="number"
                  defaultValue=""
                  label="Numero de tarjeta"
                />
              </Grid>
              <Grid item xs={11}>
                <ControlledTexInput
                  name="nameOnCard"
                  defaultValue=""
                  label="Nombre completo"
                />
              </Grid>
              <Grid item xs={6}>
                <ControlledTexInput
                  name="expDate"
                  defaultValue=""
                  label="Fecha de caducidad"
                />
              </Grid>
              <Grid item xs={5}>
                <ControlledPassInput
                  name="cvc"
                  defaultValue=""
                  label="numero de seguridad"
                />
              </Grid>
            </Grid>
          </Box>
          <Stack direction="row" mt={2}>
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Atras
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ mr: 1 }}
            >
              Comprar
            </Button>
          </Stack>
        </form>
      </FormProvider>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </Stack>
  );
};

export default CardForm;
