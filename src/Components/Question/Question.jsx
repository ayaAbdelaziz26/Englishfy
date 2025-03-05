import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@mui/material';

const Question = ({ question, answer }) => {
  return (
    <Box sx={{ m: 2 }}>
      <Accordion
        sx={{
          backgroundColor: '#415A77',
          color: 'white',
          fontFamily: 'Josefin Sans',
          '& .MuiAccordionSummary-content': {
            fontFamily: 'Josefin Sans',
            fontSize: '17px',
            fontWeight: 'normal',
          },
          '& .MuiTypography-root': {
            fontFamily: 'Josefin Sans',
            fontSize: '19px',
            fontWeight: '600',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon sx={{ color: '#0D1B2A' }} />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography >{question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#0D1B2A' }}>{answer}</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Question;