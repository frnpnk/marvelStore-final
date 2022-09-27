import { Box, Button, Stack } from "@mui/material";

import { useRouter } from "next/router";
import React, { FC, useContext, useState } from "react";
import { FormContext } from "./context/FormContext";

const FormNavigator: FC<any> = () => {
  const router = useRouter();

  const { activeStep, setActiveStep } = useContext(FormContext);

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  return (
    <Stack direction="row" mt={2}>
      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Atras
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button
        color="inherit"
        onClick={
          activeStep === 2
            ? () => router.push("/confirmacion-compra")
            : handleNext
        }
        sx={{ mr: 1 }}
      >
        {activeStep === 2 ? "Comprar" : "Siguiente"}
      </Button>
    </Stack>
  );
};

export default FormNavigator;
