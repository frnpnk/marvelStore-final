import { FormContext } from "dh-marvel/components/checkout/context/FormContext";
import StepperForm from "dh-marvel/components/checkout/stepperForm.Component";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import React, { useState } from "react";


const Index= () => {

  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <FormContext.Provider value={{activeStep: activeStep, setActiveStep: setActiveStep}} >
        <StepperForm />
      </FormContext.Provider>
    </>
  );
};



(Index as any).layout = LayoutCheckout;

export default Index;
