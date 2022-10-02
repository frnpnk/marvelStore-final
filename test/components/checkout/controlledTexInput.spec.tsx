import { screen } from "@testing-library/react";
import ControlledTexInput from "dh-marvel/components/checkout/controlledTexInput";
import { renderWithReactHookForm } from "dh-marvel/test/testUtils/testingHelpers";

describe("ControlledTexInput", () => {
  describe("when rendering default", () => {
    it("should render a textbox", () => {
      renderWithReactHookForm(
        <ControlledTexInput name="firstName" label="Firstname" />
      );
      const textBox = screen.getByRole("textbox", { name: "Firstname" });
      expect(textBox).toBeInTheDocument();
    });
  });
});
