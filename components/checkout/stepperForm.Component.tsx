import Button from "@mui/material/Button";
import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import { Box, Stack, Step, StepLabel } from "@mui/material";
import UserForm from "./userForm.component copy";
import AdressForm from "./adressForm.component";
import CardForm from "./cardForm.component";

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  return (
    <>
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

      <Stack>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Atras
        </Button>

        <Button
          color="inherit"
          onClick={/*activeStep === 2  ? {console.log("falta post")}  :*/  handleNext}
          sx={{ mr: 1 }}
        >
          {activeStep === 2 ? "Comprar" : "Siguiente"}
        </Button>
      </Stack>
      <Box>
        {
            <UserForm/>
  
    
    
        }
      </Box>
    </>
  );
};

export default StepperForm;
