import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { NextPage } from "next";
import React from "react";

import CheckoutConfirmaction from "dh-marvel/components/CheckoutConfirmaction.component";

const Index: NextPage = () => {
  return (
    <>
      <CheckoutConfirmaction />
    </>
  );
};

(Index as any).layout = LayoutCheckout;
export default Index;
