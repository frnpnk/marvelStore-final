import { render , screen} from "@testing-library/react";
import { FaqsType } from "dh-marvel/components/faqs/faqsData";
import FaqsPage from "dh-marvel/pages/preguntas-frecuentes.page";

describe("faqs page", () => {
  describe("When rendering default faqs", () => {
    it("should render the header", async () => {
      render(<FaqsPage data={[] as FaqsType[]} />);

      const titulo = screen.getByRole("heading", {name: "Preguntas Frecuentes"});
      expect(titulo).toBeInTheDocument()
    });
  });
});
