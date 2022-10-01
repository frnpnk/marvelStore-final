import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import { Box, Card, CardContent, CardMedia } from "@mui/material";
import Image from "next/image";

export interface CardProps {
  name: string;
  image: string;
  price: string;
}

const OrderCard: FC<CardProps> = (props) => {
  return (
    <Box>
      <Card variant="outlined" sx={{ maxWidth: 300 }}>
        <CardMedia
          component="img"
          height="300"
          image={props.image}
          alt={props.name}
        />
        <CardContent>
          <Typography variant="h5" color="initial">
            {props.name}
          </Typography>
          <Typography variant="h6" color="initial">
            ${props.price}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderCard;
