import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faqs from "dh-marvel/components/faqsComponent/faqs.component";

describe("faqs componente", () => {
  describe("When rendering default faqs", () => {
    it("should render the titles", async () => {
      const Props = {
        data: [
          {
            id: 1,
            question: "¿Cuántos comics tienen?",
            answer:
              "Actualmente disponemos de toda la colección de Marvel. Algunos ejemplares pueden contar con poca o nula disponibilidad por el momento. Para mas información puede acceder a https://marvel.com",
          },
        ],
      };

      render(<Faqs {...Props} />);

      const question = screen.getByRole("heading", {
        name: "¿Cuántos comics tienen?"
      });
      const button = screen.getByRole("button");
      await userEvent.click(button);
      const answer = await screen.findByText(/actualmente/i);

      expect(question).toBeInTheDocument();
      expect(answer).toBeInTheDocument();
    });
  });
});
