import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { NextPage } from "next";
import React from "react";

import CheckoutConfirmation from "dh-marvel/components/checkout/CheckoutConfirmation.component";

const Index: NextPage = () => {
  return (
    <>
      <CheckoutConfirmation />
    </>
  );
};

(Index as any).layout = LayoutCheckout;
export default Index;
