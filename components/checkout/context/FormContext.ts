import { createContext } from "react";

export interface FormContextType {

    activeStep: Number,
    setActiveStep: (step:number)=>{}
  }


export const initialValues = {activeStep:0, setActiveStep: (step:number)=>{}}

export const FormContext = createContext(initialValues)

