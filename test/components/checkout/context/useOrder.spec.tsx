import { render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import {
  OrderContextState,
  OrderProvider,
} from "dh-marvel/components/checkout/context/OrderContext";
import useOrder from "dh-marvel/components/checkout/context/useOrder";
import { ReactNode } from "react";

describe("useOrder", () => {
  describe("When it have context", () => {
    it("should return the context", async () => {
      const wrapper = ({ children }: any) => (
        <OrderProvider>{children}</OrderProvider>
      );

      const { result } = renderHook(() => useOrder(), { wrapper });
      expect(result).toMatchObject({} as OrderContextState);
    });
  });
  describe("When it don't have context", () => {
    it("should trow a new error", async () => {
      expect(renderHook(() => useOrder())).toThrowError;
    });
  });
});
