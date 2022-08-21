import React from 'react'
import { Typography, Grid, Card } from '@mui/material'

function StockCard(props) {
  return (
    <Card>
      <Grid container style={{ minHeight: 70 }}>
        <Grid
          item
          style={{
            backgroundColor: props.color,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 70,
          }}
        >
          <props.icon fontSize='large' />
        </Grid>
        <Grid item sx={{ flexGrow: 1, height: 100, padding: 1 }}>
          <Typography variant='h6' color='textPrimary'>
            {props.title}
          </Typography>
          <Typography variant='h5' color='textSecondary'>
            {props.subtitle}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default StockCard