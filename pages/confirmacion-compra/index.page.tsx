import { useOrder } from "dh-marvel/components/checkout/context/OrderContext";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { NextPage } from "next";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Grid } from "@mui/material";
import OrderCard from "dh-marvel/components/orderCard.component";
import { useRouter } from "next/router";
import CheckoutConfirmaction from "dh-marvel/components/checkout/CheckoutConfirmaction.component";

const Index: NextPage = () => {
  return (
    <>
      <CheckoutConfirmaction />
    </>
  );
};

(Index as any).layout = LayoutCheckout;
export default Index;
