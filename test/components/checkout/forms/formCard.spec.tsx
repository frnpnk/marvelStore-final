import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormContext } from "dh-marvel/components/checkout/context/FormContext";
import {
  OrderProvider,
  OrderState,
} from "dh-marvel/components/checkout/context/OrderContext";
import useOrder from "dh-marvel/components/checkout/context/useOrder";
import CardForm from "dh-marvel/components/checkout/forms/formCard.component";



jest.mock("dh-marvel/components/checkout/context/useOrder");
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>;
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
  state: {} as OrderState,
  dispatch: mockDispatch,
});

describe("FormCard", () => {
  describe("When rendering default form", () => {
    it("should render the label & input fields", async () => {
      render(
        <OrderProvider>
          <CardForm />
        </OrderProvider>
      );
      const number = screen.getByRole("textbox", {
        name: /Numero de tarjeta/i,
      });
      const nameOnCard = screen.getByRole("textbox", {
        name: /Nombre completo/i,
      });
      const expDate = screen.getByRole("textbox", {
        name: /Fecha de caducidad/i,
      });
      const cvc = screen.getByLabelText("numero de seguridad");

      expect(number).toBeInTheDocument();
      expect(nameOnCard).toBeInTheDocument();
      expect(expDate).toBeInTheDocument();
      expect(cvc).toBeInTheDocument();
    });
  });
  describe("When haven't data in form ", () => {
    it("should render required fields", async () => {
      render(
        <OrderProvider>
          <CardForm />
        </OrderProvider>
      );
      const number = screen.getByRole("textbox", {
        name: /Numero de tarjeta/i,
      });
      const nameOnCard = screen.getByRole("textbox", {
        name: /Nombre completo/i,
      });
      const expDate = screen.getByRole("textbox", {
        name: /Fecha de caducidad/i,
      });
      const cvc = screen.getByLabelText("numero de seguridad");
      const botonSiguiente = screen.getByRole("button", {
        name: /Comprar/i,
      });

      await userEvent.clear(number);
      await userEvent.clear(nameOnCard);
      await userEvent.clear(expDate);
      await userEvent.clear(cvc);
      await userEvent.click(botonSiguiente);
      expect(
        await screen.findByText("El numero de tarjeta es requerido")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("Su nombre completo es requerido")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("La fecha de caducidad es requerida")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("El numero de seguridad es requerido")
      ).toBeInTheDocument();
    });

    describe("When rendering submitting form", () => {
      let setActiveStep = () => {};
      it("should hit the dispatch", async () => {
        let activeStep = 2;
        render(
          <OrderProvider>
            <FormContext.Provider
              value={{ activeStep: activeStep, setActiveStep: setActiveStep }}
            >
              <CardForm />
            </FormContext.Provider>
          </OrderProvider>
        );

        const number = screen.getByRole("textbox", {
          name: /Numero de tarjeta/i,
        });
        const nameOnCard = screen.getByRole("textbox", {
          name: /Nombre completo/i,
        });
        const expDate = screen.getByRole("textbox", {
          name: /Fecha de caducidad/i,
        });
        const cvc = screen.getByLabelText("numero de seguridad");
        const botonSiguiente = screen.getByRole("button", {
          name: /Comprar/i,
        });

        await userEvent.clear(number);
        await userEvent.clear(nameOnCard);
        await userEvent.clear(expDate);
        await userEvent.clear(cvc);
        await userEvent.type(number, "4242424242424242");
        await userEvent.type(nameOnCard, "bart simpson");
        await userEvent.type(expDate, "1111");
        await userEvent.type(cvc, "123");
        await userEvent.click(botonSiguiente);

        await waitFor(() => {
          expect(mockDispatch).toBeCalledWith({
            payload: {
              cvc: "123",
              expDate: "1111",
              nameOnCard: "bart simpson",
              number: "4242424242424242",
            },
            type: "SET_CARD",
          });
        });
      });
    });
    describe("When clicking back button", () => {
      let setActiveStep = jest.fn();
      it("should hit handleback", async () => {
        let activeStep = 1;

        render(
          <OrderProvider>
            <FormContext.Provider
              value={{ activeStep: activeStep, setActiveStep: setActiveStep }}
            >
              <CardForm />
            </FormContext.Provider>
          </OrderProvider>
        );
        const botonAtras = screen.getByRole("button", {
          name: /atras/i,
        });
        await userEvent.click(botonAtras);
        expect(setActiveStep).toBeCalledTimes(1);
      });
    });
  });
});
