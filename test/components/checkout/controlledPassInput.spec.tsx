import { screen } from "@testing-library/react";
import ControlledPassInput from "dh-marvel/components/checkout/controlledPassInput";
import { renderWithReactHookForm } from "dh-marvel/test/testUtils/testingHelpers";


describe("ControlledPassInput", () => {
  describe("when rendering default", () => {
    it("should render a textbox", async () => {
      renderWithReactHookForm(
        <ControlledPassInput name="pass" label="Pass" />
      );
      expect(
        screen.getByLabelText(/pass/i)
      ).toBeInTheDocument();
    });

  });
});
