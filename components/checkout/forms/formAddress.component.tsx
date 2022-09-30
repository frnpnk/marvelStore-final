import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTexInput from "../controlledTextInput";
import { FormContext } from "../context/FormContext";
import { useOrder } from "../context/OrderContext";

export const addressSchema = yup
  .object({
    address1: yup
      .string()
      .required("Su direccion es requerida")
      .min(3, "Su nombre debe tener al menos 3 caracteres"),
    address2: yup.string().optional(),
    city: yup
      .string()
      .required("Su ciudad es requerida")
      .min(3, "Su ciudad debe tener al menos 3 caracteres"),
    state: yup
      .string()
      .required("Su provincia es requerida")
      .min(3, "Su provincia debe tener al menos 3 caracteres"),
    zipCode: yup
      .string()
      .required("Su codigo postal es requerido")
      .min(3, "Su codigo postal debe tener al menos 3 caracteres"),
  })
  .required();

export type addressFormData = {
    address1: string,
    address2: string,
    city: string,
    state: string,
    zipCode: string
}




const AddressForm: FC = () => {
  
  const { state, dispatch } = useOrder();

  const methods = useForm<addressFormData>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      address1: "calle siempreviva",
      address2: "16",
      city: "sin city",
      state: "sin state",
      zipCode: "6666"
    },
  });
  const { setFocus, handleSubmit } = methods;

  const { activeStep, setActiveStep } = useContext(FormContext);

  const onSubmit = (data: addressFormData) => {
    dispatch({
      type: "SET_ADDRESS",
      payload: data
    });
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    console.log(data);
    console.log(state);
    
  };

  useEffect(() => {
    setFocus("address1");
  });
  const handleBack=()=>{
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  }

  return (
    <Stack>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTexInput name="address1" defaultValue="" label="direccion" />
          <ControlledTexInput
            name="address2"
            defaultValue=""
            label="departamento"
          />
          <ControlledTexInput name="city" defaultValue="" label="ciudad" />
          <ControlledTexInput name="state" defaultValue="" label="provincia" />
          <ControlledTexInput
            name="zipCode"
            defaultValue=""
            label="codigo postal"
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
              Siguiente
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default AddressForm;
