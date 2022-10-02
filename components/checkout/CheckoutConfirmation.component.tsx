import { useOrder } from "dh-marvel/components/checkout/context/OrderContext";

import React, { FC, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Card, CardContent, Grid, Paper } from "@mui/material";
import OrderCard from "dh-marvel/components/orderCard.component";
import { useRouter } from "next/router";

const CheckoutConfirmation: FC = () => {
  const { state, dispatch } = useOrder();
  const [render, setRender] = useState(false)
  const router = useRouter();
  
  useEffect(() => {
    !state.order.customer.address.address1
      ? router.push("/")
      : setRender(true);
  }, [state, router]);
  return (
    (render)?
      (

      <>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={11} >
              <Paper sx={{ bgcolor: '#087502' }} >
                <Typography textAlign={"center"} variant="h3" color="white">
              FELICITACIONES
            </Typography>

          </Paper>
          </Grid>
    
          <Grid
            item
            xs={12}
            spacing={2}
            direction="row"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <OrderCard {...state.order.order} />
          </Grid>
    
          <Grid item xs={5} spacing={2} padding="20px">
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Datos Personales
                </Typography>
                <Typography color="text.secondary">
                  {" "}
                  {state.order.customer.name} {state.order.customer.lastname}
                </Typography>
                <Typography color="text.secondary">
                  {" "}
                  {state.order.customer.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5} spacing={2} padding="20px">
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Dirección de entrega
                </Typography>
                <Typography color="text.secondary">
                  {" "}
                  {state.order.customer.address.address1}{" "}
                  {state.order.customer.address.address2}{" "}
                </Typography>
                <Typography color="text.secondary">
                  {" "}
                  {state.order.customer.address.city},{" "}
                  {state.order.customer.address.state}{" "}
                  {state.order.customer.address.zipCode}{" "}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>)
    :(
  <>
  <div>nodata</div>
  </>)


  );
};

export default CheckoutConfirmation;
