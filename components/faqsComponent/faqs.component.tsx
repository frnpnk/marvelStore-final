import { FC } from "react";
import { FaqsType } from "../faqs/faqsData";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  data: FaqsType[];
}

const Faqs: FC<Props> = ({ data }) => {
  return (

    <>
      {data?.map((d) => (
        <Accordion key={d.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={"panel-content" + d.id}
            id={"panel-header" + d.id}
          >
            <Typography variant="h3">{d.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{d.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default Faqs;
