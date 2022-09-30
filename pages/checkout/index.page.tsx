import { FormContext } from "dh-marvel/components/checkout/context/FormContext";
import { OrderProvider } from "dh-marvel/components/checkout/context/OrderContext";
import StepperForm from "dh-marvel/components/checkout/stepperForm.component";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import React, { useState } from "react";


const Index= () => {

  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
    <OrderProvider>
      <FormContext.Provider value={{activeStep: activeStep, setActiveStep: setActiveStep}} >
        <StepperForm />
      </FormContext.Provider>
    </OrderProvider>
    </>
  );
};



(Index as any).layout = LayoutCheckout;

export default Index;
