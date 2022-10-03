import { createContext } from "react";

export const FormContext = createContext<any>({activeStep:0});

export const initialState = { activeStep: 0 };
