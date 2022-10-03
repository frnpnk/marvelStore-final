import type { NextPage } from "next";
import { FaqsType } from "dh-marvel/components/faqs/faqsData";
import { faqsData } from "dh-marvel/components/faqs/faqsData";
import Faqs from "dh-marvel/components/faqsComponent/faqs.component";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Head from "next/head";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

interface Props {
  data: FaqsType[];
}

export const getStaticProps = async () => {
  const res = faqsData;
  const data: FaqsType[] = res;

  return {
    props: {
      data,
    },
    revalidate: 60,
  };
};

const FaqsPage: NextPage<Props> = (data) => {
  return (
    <>
      <Head>
        <title> FAQS</title>
        <meta name="description" content="Frequently asked question about marvel store"></meta>
      </Head>

      <Container>
        <Box
          sx={{
            display: "block",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h2">Preguntas Frecuentes</Typography>
          <Faqs {...data} />
        </Box>
      </Container>
    </>
  );
};

(FaqsPage as any).layout = LayoutGeneral

export default FaqsPage;
