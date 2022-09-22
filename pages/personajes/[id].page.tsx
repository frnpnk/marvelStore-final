import {
  getCharacter,
  getCharacters,
} from "dh-marvel/services/marvel/marvel.service";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import Image from "next/image";

export async function getStaticPaths(): Promise<any> {
  const res = await getCharacters();

  const paths = res.map((e: any) => ({
    params: {
      id: `${e.id}`,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let tonum = params?.id;
  const character = await getCharacter(Number(tonum));

  return {
    props: {
      id: params?.id,
      characterDetail: character,
    },
    revalidate: 60,
  };
};

type Props = {
  characterDetail: any;
};

const CharacterDetails: NextPage<Props> = ({ characterDetail }) => {
  return (
    <>
      <Head>
        <title>{characterDetail.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Grid container spacing={2}>
          <Container>
            <Typography>{characterDetail.name}</Typography>
          </Container>

          <Box>
            <Image
              src={characterDetail.thumbnail.path + ".jpg"}
              width="350px"
              alt="book cover"
              height="350px"
            />
          </Box>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Descripcion</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {characterDetail.description || "sin descripcion diponible"}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Box>
    </>
  );
};

(CharacterDetails as any).layout = LayoutGeneral

export default CharacterDetails;
