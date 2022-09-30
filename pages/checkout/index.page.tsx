import { FormContext } from "dh-marvel/components/checkout/context/FormContext";
import { OrderProvider } from "dh-marvel/components/checkout/context/OrderContext";
import FormStepper from "dh-marvel/components/checkout/FormStepper.component";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import React, { useState } from "react";


const Index= () => {

  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
    <OrderProvider>
      <FormContext.Provider value={{activeStep: activeStep, setActiveStep: setActiveStep}} >
        <FormStepper/>
      </FormContext.Provider>
    </OrderProvider>
    </>
  );
};



(Index as any).layout = LayoutCheckout;

export default Index;
