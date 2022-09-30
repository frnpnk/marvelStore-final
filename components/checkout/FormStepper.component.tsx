import { FC, useContext } from "react";
import Stepper from "@mui/material/Stepper";
import { Box, Step, StepLabel } from "@mui/material";
import UserForm from "./forms/formUser.component";
import AddressForm from "./forms/formAddress.component";
import CardForm from "./forms/formCard.component";
import { FormContext } from "./context/FormContext";

const FormStepper: FC = () => {
  const {activeStep} = useContext(FormContext)

  return (
    <>
      <Box sx={{ width: "600px" }}>
        <h2>Checkout</h2>
        {activeStep === 0 && <UserForm />}
        {activeStep === 1 && <AddressForm />}
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
      </Box>
    </>
  );
};

export default FormStepper;
