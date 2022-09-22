import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import {
  CardContent,
  Button,
  Card,
  CardActions,
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
import Link from "next/link";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

let firstComic = 0;
let quantityComic = 12;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const comic = await getComic(Number(query.id));

  return {
    props: {
      id: query,
      comicDetail: comic,
    },
  };
};

type Props = {
  comicDetail: any;
};

const ComicDetails: NextPage<Props> = ({ comicDetail }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={2}>
        <Container>
          <Typography>{comicDetail.title}</Typography>
        </Container>

        <Box>
          <Image
            src={comicDetail.thumbnail.path + ".jpg"}
            width="185px"
            alt="book cover"
            height="350px"
          />
        </Box>
        <Box>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {comicDetail.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Antes: ${comicDetail.oldPrice}
              </Typography>
              <Typography variant="body2">${comicDetail.oldPrice}</Typography>
            </CardContent>
            <CardActions>
              <Link href={`/checkout`}>
                <Button size="small">
                  COMPRAR
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
        <Box>
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
                {comicDetail.description || "sin descripcion diponible"}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>personajes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {comicDetail.characters.items.map((e: any) => (
                <Link
                  href={`/personajes/${e.resourceURI.slice(47)}`}
                  key={e.resourceURI.slice(47)}
                >
                  <Button>{e.name}</Button>
                </Link>
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
    </>
  );
};

(ComicDetails as any).layout = LayoutGeneral;

export default ComicDetails;
