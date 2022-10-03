import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
 
  useMemo,
  useReducer,
} from "react";
import { addressFormData } from "../forms/formAddress.component";
import { cardFormData } from "../forms/formCard.component";
import { UserFormData } from "../forms/UserForm.component";

export interface OrderDataType {
  customer: UserFormData;
  card: cardFormData;
  order: ComicDataType;
}

export interface ComicDataType {
  name: string;
  image: string;
  price: string;
}

export interface OrderState {
  order: OrderDataType;
}
export interface OrderContextState {
  state: { order: OrderDataType };
  dispatch: Dispatch<OrderActionType>;
}

export interface setOrderUserType {
  type: "SET_USER";
  payload: UserFormData;
}

export interface setOrderAddressType {
  type: "SET_ADDRESS";
  payload: addressFormData;
}
export interface setOrderCardType {
  type: "SET_CARD";
  payload: cardFormData;
}
export interface setOrderComicType {
  type: "SET_COMIC";
  payload: ComicDataType;
}

export type OrderActionType =
  | setOrderUserType
  | setOrderAddressType
  | setOrderCardType
  | setOrderComicType;

const initialStore: OrderState = {
  order: {
    customer: {} as UserFormData,
    card: {} as cardFormData,
    order: {} as ComicDataType,
  },
};

const reducer = (state: OrderState, action: OrderActionType) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, order: { ...state.order, customer: action.payload } };
    case "SET_ADDRESS":
      return { ...state, order: { ...state.order, customer:{...state.order.customer, address: action.payload} } };
    case "SET_CARD":
      return { ...state, order: { ...state.order, card: action.payload } };
    case "SET_COMIC":
      return { ...state, order: { ...state.order, order: action.payload } };
    default:
      return state;
  }
};

const OrderContext = createContext<OrderContextState | undefined>(undefined);

export const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStore);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export { OrderContext };

