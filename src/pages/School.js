import React from 'react'
import * as axios from 'axios'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

function School() {
  const [data, setData] = React.useState([])

  const columns = [
    {
      field: 'school_thai_name',
      headerName: 'school name',
      width: 150,
    },
    {
      field: 'school_english_name',
      headerName: 'english name',
      width: 150,
    },
  ]

  React.useEffect(() => {
    const GetSchoolData = async () => {
      await axios
        .get(`${process.env.REACT_APP_API}/school`)
        .then((res) => setData(res.data))
        .catch((err) => console.error(err))
    }
    GetSchoolData()
  }, [])

  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{10}</Typography>
              <Typography variant="p">
                {10} {10}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{10}</Typography>
              <Typography variant="p">
                {10} {10}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{10}</Typography>
              <Typography variant="p">
                {10} {10}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ height: 400, width: "100%", top: 100 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.school_id}
        />
      </Box>
    </div>
  );
}

export default School
