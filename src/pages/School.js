import React from 'react'
import * as axios from 'axios'
import { Box } from '@mui/material'
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
        .get(`http://147.50.231.136/api/school`)
        .then((res) => setData(res.data))
        .catch((err) => console.error(err))
    }
    GetSchoolData()
  }, [])
  return (
    <div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.school_id}
        />
      </Box>
    </div>
  )
}

export default School
