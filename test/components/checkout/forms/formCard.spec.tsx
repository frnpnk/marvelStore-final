import { render, screen } from "@testing-library/react";
import { OrderProvider } from "dh-marvel/components/checkout/context/OrderContext";
import CardForm from "dh-marvel/components/checkout/forms/formCard.component";


describe("FormCard", () => {
  describe("When rendering default form", () => {
    it("should render the label & input fields", async () => {
      render(
        <OrderProvider>
          <CardForm/>
        </OrderProvider>
      );
      const number = screen.getByRole("textbox", { name: /Numero de tarjeta/i });
      const nameOnCard = screen.getByRole("textbox", { name: /Nombre completo/i });
      const expDate = screen.getByRole("textbox", { name: /Fecha de caducidad/i });
      const cvc = screen.getByLabelText ("numero de seguridad");
    
      expect(number).toBeInTheDocument();
      expect(nameOnCard).toBeInTheDocument();
      expect(expDate).toBeInTheDocument();
      expect(cvc).toBeInTheDocument();
      
    });
  });
});
