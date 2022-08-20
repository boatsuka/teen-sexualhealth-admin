import React from 'react'
import * as axios from 'axios'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

function Teacher() {
  const [data, setData] = React.useState([])

  const columns = [
    {
      field: 'teacher_thai_firstname',
      headerName: 'ชื่อ',
      width: 150,
    },
    {
      field: 'teache_thai_lastname',
      headerName: 'นามสกุล',
      width: 150,
    },
    {
      field: 'teacher_nick_name',
      headerName: 'ชื่อเล่น',
      width: 150,
    },
  ]

  React.useEffect(() => {
    const GetSchoolData = async () => {
      await axios
        .get(`${process.env.REACT_APP_API}/teacher`)
        .then((res) => setData(res.data))
        .catch((err) => console.error(err))
    }
    GetSchoolData()
  }, [])

  return (
    <div>
      {' '}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.teacher_id}
        />
      </Box>
    </div>
  )
}

export default Teacher
