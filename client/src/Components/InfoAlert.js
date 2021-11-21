import * as React from 'react';
import { Alert, AlertTitle } from '@mui/material';

export const InfoAlert = ({ messageText, showMessage }) => {
  
  return (
    <Alert sx={{display: showMessage ? '' : 'none', margin:'5px'}} severity="success" color="info" >
      <AlertTitle>Info</AlertTitle>
      {`${messageText}`}
    </Alert>
  )
}