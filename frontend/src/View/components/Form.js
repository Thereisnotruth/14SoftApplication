import React from 'react';
import { Grid, Input, Button } from '@material-ui/core';
const Form = () => {
  return (
    <Grid item>
      <Input className='input'></Input>
      <Button variant="contained" onClick={() => { alert('clicked') }}>검색</Button>
    </Grid>
  )
}

export default Form;