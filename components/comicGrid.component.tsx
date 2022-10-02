import { FC } from "react";
import { Comic } from "dh-marvel/features/comic/comic.types";
import {
  Grid,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
} from "@mui/material";
import { sizing } from '@mui/system';
import Link from "next/link";

interface Props {
  results: Comic[];
}
const ComicGrid: FC<Props> = ({ results }) => {
  return (
    <>
      <Grid container spacing={2}>
        {results?.map((d) => (
          
            <Grid item xs={12} md={4} key={d.id}>
              <Card sx={{ minWidth: 400 }  }>
                
                <CardMedia
                  sx={{objectFit: "contain"}}
                  component="img"
                  height="194"
                  src={d.thumbnail.path + ".jpg"}
                  alt={d.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" color="initial">
                    {d.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="text" color="primary">
                    COMPRA EN 1 CLICK
                  </Button>
                  <Link href={`/comics/${d.id}`}>
                    <Button variant="text" color="primary">
                      VER DETALLE
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
        
        ))}
      </Grid>
    </>
  );
};

export default ComicGrid;
