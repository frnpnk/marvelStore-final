import { createContext, SetStateAction } from "react";
import { adressFormData } from "../formAdress.component";
import { cardFormData } from "../formCard.component";
import { UserFormData } from "../formUser.component";

export interface Order {
  user: UserFormData;
  adress: adressFormData;
  card: cardFormData;
}
export interface FormContextType {
  activeStep: number;
  setActiveStep: number
}
export const FormContext =
  createContext<any>({activeStep:0});

export const initialState = { activeStep: 0 };
