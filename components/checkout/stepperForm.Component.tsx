import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import Stepper from "@mui/material/Stepper";
import { Box, Stack, Step, StepLabel } from "@mui/material";
import UserForm from "./formUser.component";
import AdressForm from "./formAdress.component";
import CardForm from "./formCard.component";
import FormNavigator from "./formNavigator.component";
import { FormContext } from "./context/FormContext";

const StepperForm = () => {
  const {activeStep, setActiveStep} = useContext(FormContext)

  return (
    <>
      <Box sx={{ width: "600px" }}>
        <h2>Checkout</h2>
        {activeStep === 0 && <UserForm />}
        {activeStep === 1 && <AdressForm />}
        {activeStep === 2 && <CardForm />}

        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>Datos personales</StepLabel>
          </Step>
          <Step>
            <StepLabel>Datos de entrega</StepLabel>
          </Step>
          <Step>
            <StepLabel>Datos del pago</StepLabel>
          </Step>
        </Stepper>
        <FormNavigator/>
      </Box>
    </>
  );
};

export default StepperForm;
