import { render, screen, waitFor } from "@testing-library/react";
import UserForm from "dh-marvel/components/checkout/forms/UserForm.component";
import React from "react";
import {
  OrderProvider,
  OrderState,
} from "dh-marvel/components/checkout/context/OrderContext";
import useOrder from "dh-marvel/components/checkout/context/useOrder";
import userEvent from "@testing-library/user-event";
import { FormContext } from "dh-marvel/components/checkout/context/FormContext";

jest.mock("dh-marvel/components/checkout/context/useOrder");
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>;
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
  state: {} as OrderState,
  dispatch: mockDispatch,
});

describe("FormUser", () => {
  describe("When rendering default form", () => {
    it("should render the label & input fields", async () => {
      render(
        <OrderProvider>
          <UserForm />
        </OrderProvider>
      );
      const firstName = screen.getByRole("textbox", { name: /nombre/i });
      const lastName = screen.getByRole("textbox", { name: /Apellido/i });
      const email = screen.getByRole("textbox", { name: /email/i });
      expect(firstName).toBeInTheDocument();
      expect(lastName).toBeInTheDocument();
      expect(email).toBeInTheDocument();
    });
    it("should have focus on username", () => {
      render(
        <OrderProvider>
          <UserForm />
        </OrderProvider>
      );

      const usernameInput = screen.getByRole("textbox", { name: /nombre/i });
      expect(usernameInput).toHaveFocus();
    });
    describe("When rendering submitting form", () => {
      let setActiveStep = () => {};
      it("should hit the dispatch", async () => {
        let activeStep = 0;
        render(
          <OrderProvider>
            <FormContext.Provider
              value={{ activeStep: activeStep, setActiveStep: setActiveStep }}
            >
              <UserForm />
            </FormContext.Provider>
          </OrderProvider>
        );
        const nombre = screen.getByRole("textbox", { name: "Nombre" });
        await userEvent.clear(nombre);
        await userEvent.type(nombre, "bart");
        const apellido = screen.getByRole("textbox", { name: "Apellido" });
        await userEvent.clear(apellido);
        await userEvent.type(apellido, "simpson");
        const email = screen.getByRole("textbox", { name: "email" });
        await userEvent.clear(email);
        await userEvent.type(email, "bart@simpson.haha");
        const botonSiguiente = screen.getByRole("button", {
          name: /siguiente/i,
        });
        await userEvent.click(botonSiguiente);
        await waitFor(() => {
          expect(mockDispatch).toBeCalledWith({
            payload: {
              Apellido: "simpson",
              email: "bart@simpson.haha",
              lastname: "Apellido",
              name: "bart",
            },
            type: "SET_USER",
          });
        });
      });
    });
  });
});
