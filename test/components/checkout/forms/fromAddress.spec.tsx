import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormContext } from "dh-marvel/components/checkout/context/FormContext";
import {
  OrderProvider,
  OrderState,
} from "dh-marvel/components/checkout/context/OrderContext";
import useOrder from "dh-marvel/components/checkout/context/useOrder";
import AddressForm from "dh-marvel/components/checkout/forms/formAddress.component";

jest.mock("dh-marvel/components/checkout/context/useOrder");
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>;
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
  state: {} as OrderState,
  dispatch: mockDispatch,
});

describe("FormAddress", () => {
  describe("When rendering default form", () => {
    it("should render the label & input fields", async () => {
      render(
        <OrderProvider>
          <AddressForm />
        </OrderProvider>
      );
      const address1 = screen.getByRole("textbox", { name: /direccion/i });
      const address2 = screen.getByRole("textbox", { name: /departamento/i });
      const city = screen.getByRole("textbox", { name: /ciudad/i });
      const state = screen.getByRole("textbox", { name: /provincia/i });
      const zipCode = screen.getByRole("textbox", { name: /codigo postal/i });
      expect(address1).toBeInTheDocument();
      expect(address2).toBeInTheDocument();
      expect(city).toBeInTheDocument();
      expect(state).toBeInTheDocument();
      expect(zipCode).toBeInTheDocument();
    });
  });
  describe("When rendering submitting form", () => {
    let setActiveStep = jest.fn()
    it("should hit the dispatch", async () => {
      let activeStep = 1;
      render(
        <OrderProvider>
          <FormContext.Provider
            value={{ activeStep: activeStep, setActiveStep: setActiveStep }}
          >
            <AddressForm />
          </FormContext.Provider>
        </OrderProvider>
      );

      const address1 = screen.getByRole("textbox", { name: /direccion/i });
      const address2 = screen.getByRole("textbox", { name: /departamento/i });
      const city = screen.getByRole("textbox", { name: /ciudad/i });
      const state = screen.getByRole("textbox", { name: /provincia/i });
      const zipCode = screen.getByRole("textbox", { name: /codigo postal/i });
      const botonSiguiente = screen.getByRole("button", {
        name: /siguiente/i,
      });

      await userEvent.clear(address1);
      await userEvent.clear(address2);
      await userEvent.clear(city);
      await userEvent.clear(state);
      await userEvent.clear(zipCode);
      await userEvent.type(address1, "calle siempreviva 487");
      await userEvent.type(city, "bart springfield");
      await userEvent.type(state, "fake state");
      await userEvent.type(zipCode, "0303");
      await userEvent.click(botonSiguiente);

      await waitFor(() => {
        expect(setActiveStep).toBeCalledTimes(1)
        expect(mockDispatch).toBeCalledWith({
          payload: {
            address1: "calle siempreviva 487",
            address2: "",
            city: "bart springfield",
            state: "fake state",
            zipCode: "0303",
          },
          type: "SET_ADDRESS",
        });
      });
    });
    describe("When clicking back button", () => {
      let setActiveStep = jest.fn()
      it("should hit handleback", async () => {
        let activeStep = 1;

        render(
          <OrderProvider>
            <FormContext.Provider
              value={{ activeStep: activeStep, setActiveStep: setActiveStep }}
            >
              <AddressForm />
            </FormContext.Provider>
          </OrderProvider>
        );
        const botonAtras = screen.getByRole("button", {
          name: /atras/i,
        });
        await userEvent.click(botonAtras);

        expect(setActiveStep).toBeCalledTimes(1)





      });
    });
  });
});
