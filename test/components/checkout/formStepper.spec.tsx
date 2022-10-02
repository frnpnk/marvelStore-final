import { render, screen } from "@testing-library/react";
import { FormContext } from "dh-marvel/components/checkout/context/FormContext";
import { OrderProvider } from "dh-marvel/components/checkout/context/OrderContext";
import FormStepper from "dh-marvel/components/checkout/FormStepper.component";

describe("Formstepper", () => {
  let setActiveStep = () => {};
  describe("When rendering default stepper", () => {
    it("should render the heading", async () => {
      let activeStep = 0;
      render(
        <OrderProvider>
          <FormContext.Provider
            value={{ activeStep: activeStep, setActiveStep: setActiveStep }}
          >
            <FormStepper />
          </FormContext.Provider>
        </OrderProvider>
      );

      const heading = screen.getByText(/Checkout/i);
      expect(heading).toBeInTheDocument();
      const name = screen.getByRole("textbox", { name: /nombre/i });
      expect(name).toBeInTheDocument();
    });
  });
  describe("When rendering first step of stepper", () => {
    it("should render the first text input", async () => {
      let activeStep = 1;

      render(
        <OrderProvider>
          <FormContext.Provider
            value={{ activeStep: activeStep, setActiveStep: setActiveStep }}
          >
            <FormStepper />
          </FormContext.Provider>
        </OrderProvider>
      );

      const address1 = screen.getByRole("textbox", { name: /direccion/i });
      expect(address1).toBeInTheDocument();
    });
  });
  describe("When rendering second step of stepper", () => {
    it("should render the first text input", async () => {
      let activeStep = 2;

      render(
        <OrderProvider>
          <FormContext.Provider
            value={{ activeStep: activeStep, setActiveStep: setActiveStep }}
          >
            <FormStepper />
          </FormContext.Provider>
        </OrderProvider>
      );

      const number = screen.getByRole("textbox", {
        name: /Numero de tarjeta/i,
      });
      expect(number).toBeInTheDocument();
    });
  });
});
