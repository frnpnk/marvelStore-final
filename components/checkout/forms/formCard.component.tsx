import { Stack } from "@mui/system";
import { FC, useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTexInput from "../controlledTextInput";
import ControlledPassInput from "../controlledPassInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { FormContext } from "../context/FormContext";
import { useOrder } from "../context/OrderContext";
import { postCheckout } from "../postCheckout.component";

export const cardSchema = yup
  .object({
    number: yup
      .string()
      .required("El numero de tarjeta es requerido")
      .min(19, "Corrobore la cantidad de caracteres")
      .max(19, "Corrobore la cantidad de caracteres"),
    nameOnCard: yup
      .string()
      .required("Su nombre completo es requerido")
      .min(5, "Su nombre debe tener al menos 5 caracteres"),
    expDate: yup
      .string()
      .required("La fecha de caducidad es requerido")
      .min(4, "La fecha de caducidad debe tener al menos 4 caracteres"),
    cvc: yup
      .string()
      .required("El numero de seguridad es requerido")
      .min(3, "El codigo de seguridad debe tener al menos 3 caracteres"),
  })
  .required();

export type cardFormData = {
  number: string,
  cvc: string,
  expDate: string,
  nameOnCard: string
};




const CardForm: FC = () => {
  
  const { state, dispatch } = useOrder();

  const methods = useForm<cardFormData>({
    resolver: yupResolver(cardSchema),
    defaultValues: {
      number: "4242 4242 4242 4242",
      nameOnCard: "señor jhonson",
      expDate: "1234",
      cvc: "123",
    },
  });
  const { setFocus, handleSubmit } = methods;

  const { activeStep, setActiveStep } = useContext(FormContext);

  const onSubmit = (data: cardFormData) => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    dispatch({
      type: "SET_CARD",
      payload: data
    });
    postCheckout(state.order)

  };

  useEffect(() => {
    setFocus("number");
    console.log(state.order);
  }); 

  const handleBack=()=>{
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  }
  
  return (
    <Stack>
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <ControlledTexInput
            name="number"
            defaultValue=""
            label="Numero de tarjeta"
          />
          <ControlledTexInput
            name="nameOnCard"
            defaultValue=""
            label="Nombre completo"
          />
          <ControlledTexInput
            name="expDate"
            defaultValue=""
            label="Fecha de caducidad"
          />
          <ControlledPassInput
            name="cvc"
            defaultValue=""
            label="numero de seguridad"
          />
          <Stack direction="row" mt={2}>
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Atras
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              color="inherit"
              onClick={handleSubmit(onSubmit)}
              sx={{ mr: 1 }}
            >
              Comprar
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default CardForm;
