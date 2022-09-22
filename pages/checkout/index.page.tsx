import CheckoutForm from "dh-marvel/components/checkout/old/CheckoutForm.component";
import StepperForm from "dh-marvel/components/checkout/stepperForm.Component";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import React from "react";

const index = () => {
  return (
    <>
      <StepperForm />
    </>
  );
};
(index as any).layout = LayoutCheckout

export default index;
