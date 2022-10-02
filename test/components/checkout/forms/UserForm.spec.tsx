import { render, screen, waitFor } from "@testing-library/react";
import UserForm from "dh-marvel/components/checkout/forms/UserForm.component";
import React from "react";
import { OrderProvider } from "dh-marvel/components/checkout/context/OrderContext";
import userEvent from "@testing-library/user-event";

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

    describe("When rendering submitting form", () => {
      xit("should hit the dispatch", async () => {
        const mockonsubmit = jest.fn()
        render(
          <OrderProvider>
            <UserForm />
          </OrderProvider>
        );
        userEvent.type(screen.getByRole('textbox', {name: /nombre/i}), "bart")
        userEvent.type(screen.getByRole('textbox', {name: /Apellido/i}), "simpson")
        userEvent.type(screen.getByRole('textbox', {name: /email/i}), "bart@simpson.haha")
        userEvent.click(screen.getByRole('button', {name: /siguiente/i}));


        await waitFor(() => {
          expect(onsubmit).toBeCalled();
      })
     /*  expect(mockDispatch).toBeCalledWith({
          payload: {
              firstname: "bart",
              lastname: 'simpson',
              email: 'bart@simpson.haha'
          },
          type: "SET_USER"
      })
 */
      });
    });
  });
});
