import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React, { SetStateAction } from 'react';
import { FC, useState } from "react";


interface Props{
    count:number,
    page:number,
}




const BasicPagination: FC<Props> = (Props) => {
   
  return (
    <Stack spacing={2}>
      <Pagination count={Props.count}  />
    </Stack>
  );
}


export default BasicPagination;  


