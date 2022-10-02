import { render, screen } from "@testing-library/react";
import OrderCard from "dh-marvel/components/orderCard.component";

describe("orderCard", () => {
  describe("When rendering default card", () => {
    it("should render the heading", async () => {});
    const CardProps = {
      name: "bart",
      image:
        "https://en.wikipedia.org/wiki/Bart_Simpson#/media/File:Bart_Simpson_200px.png",
      price: "666",
    };
    render(<OrderCard {...CardProps} />);

    const imagen = screen.getByAltText(/bart/i);
    const title = screen.getByText(/bart/i);
    const price = screen.getByText(/666/i);

    expect(imagen).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
