import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { theme } from "dh-marvel/styles/material-theme";
import { OrderProvider } from "dh-marvel/components/checkout/context/OrderContext";

function MyApp({ Component, pageProps }: AppProps) {
  const LayoutComponent = (Component as any).layout;

  return (
    <OrderProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {LayoutComponent ? (
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        ) : (
          <Component {...pageProps} />
        )}
        <style jsx global>{`
          /* Other global styles such as 'html, body' etc... */

          #__next {
            height: 100%;
          }
        `}</style>
      </ThemeProvider>
    </OrderProvider>
  );
}

export default MyApp;
