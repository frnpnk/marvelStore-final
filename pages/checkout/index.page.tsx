import { FormContext } from "dh-marvel/components/checkout/context/FormContext";
import { useOrder } from "dh-marvel/components/checkout/context/OrderContext";
import FormStepper from "dh-marvel/components/checkout/FormStepper.component";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import OrderCard from "dh-marvel/components/orderCard.component";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

const Index: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const { state, dispatch } = useOrder();

  const { comicSelected }: any = router?.query;
  console.log(comicSelected);

  useEffect(() => {
    if (comicSelected) {
      const comicDetail = JSON.parse(comicSelected);
      dispatch({
        type: "SET_COMIC",
        payload: comicDetail,
      });
    } else {
      router.push("/");
    }
  }, [comicSelected]);

  return (
    <>
      <FormContext.Provider
        value={{ activeStep: activeStep, setActiveStep: setActiveStep }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <FormStepper />
          </Grid>
          <Grid item>
            <OrderCard {...state.order.order} />
          </Grid>
        </Grid>
      </FormContext.Provider>
    </>
  );
};

(Index as any).layout = LayoutCheckout;

export default Index;
