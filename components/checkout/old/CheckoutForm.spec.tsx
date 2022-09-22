import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutForm, { userSchema } from "./CheckoutForm.component";
import {FormData} from "./CheckoutForm.component"


describe("CheckoutForm", () => {
  describe("when rendering default form", () => {
    it("Should render the Checkout title", () => {
      render(<CheckoutForm />);
      const title = screen.getByRole("heading", {
        name: /Checkout/i,
      });
      expect(title).toBeInTheDocument();
    });
    it("Should render the label and input fields", () => {
      render(<CheckoutForm />);
      const name = screen.getByLabelText("Nombre");
      const lastname = screen.getByLabelText("Apellido");
      const email = screen.getByLabelText("email");

      expect(name).toBeInTheDocument();
      expect(lastname).toBeInTheDocument();
      expect(email).toBeInTheDocument();
    });

    it("Should have focus on username", () => {
      render(<CheckoutForm />);
      const name = screen.getByRole("textbox", { name: /nombre/i });
      expect(name).toHaveFocus();
    });
  });

  describe("validating the schema", () => {
    it("Should match the data to schema", async () => {
      const user: FormData = {
        name: 'valid',
        lastName: 'valid',
        email: 'valid',
      };

      expect(await userSchema.isValid(user)).toBeTruthy();
    });
  });  

  describe("validating the schema", () => {
    it("Should not match the data to schema", async () => {
      const user: FormData = {
        name: '',
        lastName: '',
        email: 'valid',
      };

      expect(await userSchema.isValid(user)).toBeFalsy();
    });
  });

  describe("when Subbmiting valid form", () => {
    it("Should have focus on name", async () => {
      render(<CheckoutForm />);
      const name = screen.getByRole("textbox", { name: /nombre/i });
      const lastname = screen.getByRole("textbox", { name: /apellido/i });
      const email = screen.getByRole("textbox", { name: /email/i });
      await userEvent.type(name, "nombrevalido");
      await userEvent.type(lastname, "apellidovalido");
      await userEvent.type(email, "email@valido.punk");
      const direccion = await screen.findByText("direccion");
      expect(direccion).toBeInTheDocument();
    });
  });
});
