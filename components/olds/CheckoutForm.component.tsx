import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'


/* const userRules={
  name:{
    required: 'Su nombre es requerido',
    minLength:{ value: 3, message: 'Su nombre debe tener al menos 3 caracteres'},
  },
  lastName:{
    required: 'su apellido es requerido',
    minLength:{ value: 2, message: 'Su apellido debe tener al menos 2 caracteres'},
  },
  email:{
    required: 'su nombre es requerido',
    minLength:{ value: 3, message: 'Su nombre debe tener al menos 3 caracteres'},
  }
} */

export const userSchema = yup.object({
  name:yup.string().required('Su nombre es requerido').min(3, 'Su nombre debe tener al menos 3 caracteres'),
  lastName:yup.string().required('Su apellido es requerido').min(3, 'Su apellido debe tener al menos 3 caracteres'),
  email:yup.string().required('Su email es requerido').min(3, 'Su email debe tener al menos 3 caracteres'),
}).required();

export type FormData = {
  name: string,
  lastName: string,
  email: string
}

const CheckoutForm: FC = (props) => {
  const {
    control,

    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({resolver : yupResolver(userSchema)});

  useEffect(() => {
    setFocus("name");
  });

  const onSubmit = (data: any): void => {
    console.log(data);
  };

  return (
    <>
      <h3>Checkout </h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Controller
            name="name"
            control={control}
        
            render={({field: {onChange, value, ref}}) => 
            <TextField
                onChange={onChange}
                value={value}
                label={"Nombre"}
                variant="outlined" 
                inputRef={ref}
                error={!!errors.name}
                helperText={`${errors.name?.message|| ""}`}
              />}
          />
        </div>

        <div>
          <Controller
            name="lastName"
            control={control}
     
            render={({field: {onChange, value, ref}}) => 
            <TextField
                onChange={onChange}
                value={value}
                label={"Apellido"}
                variant="outlined" 
                inputRef={ref}
                error={!!errors.lastName}
                helperText={`${errors.lastName?.message|| ""}`}
              />}
          />
        </div>
        <div>
          <Controller
            name="email"
            control={control}
          
            render={({field: {onChange, value, ref}}) => 
            <TextField
                onChange={onChange}
                value={value}
                label={"email"}
                variant="outlined" 
                inputRef={ref}
                fullWidth
                error={!!errors.email}
                helperText={`${errors.email?.message|| ""}`}
              />}
          />
        </div>
  

        <Button type="submit">SEGUIR</Button>
      </Box>
      <Box>{/* <Image src="ddd" alt="hola hola" /> */}</Box>
    </>
  );
};

export default CheckoutForm;
