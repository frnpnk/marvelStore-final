import { adressFormData } from "./formAdress.component";
import { cardFormData } from "./formCard.component";
import { UserFormData } from "./formUser.component";

export interface IForm {
    user: UserFormData,
    adress: adressFormData,
    card: cardFormData,
    activeStep: Number
  }
  export type FormContextType = {
    form: IForm,
    Saveform: (form: IForm) => void;
    updateTodo: (id: number) => void;
  };