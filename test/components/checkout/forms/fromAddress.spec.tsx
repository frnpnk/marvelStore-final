import { render, screen } from "@testing-library/react";
import { OrderProvider } from "dh-marvel/components/checkout/context/OrderContext";
import AddressForm from "dh-marvel/components/checkout/forms/formAddress.component";


describe("FormAddress", () => {
  describe("When rendering default form", () => {
    it("should render the label & input fields", async () => {
      render(
        <OrderProvider>
          <AddressForm/>
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
});
