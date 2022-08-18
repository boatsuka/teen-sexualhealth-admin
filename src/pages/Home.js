import React from 'react'
import * as axios from 'axios'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'


function Home() {
  const [data, setData] = React.useState([])

  const columns = [
    {
      field: 'user_loginname',
      headerName: 'username',
      width: 150,
      editable: true,
    },
    {
      field: 'user_full_name',
      headerName: 'fullname',
      width: 150,
      editable: true,
    },
    {
      field: 'user_email',
      headerName: 'email',
      width: 110,
      editable: true,
    },
    {
      field: 'user_telephone',
      headerName: 'telephone',
      width: 110,
      editable: true,
    },
  ]

  React.useEffect(() => {
    const GetUserData = async () => {
      await axios
        .get(`http://147.50.231.136/api/user/all`)
        .then((res) => setData(res.data))
        .catch((err) => console.error(err))
    }
    GetUserData()
  }, [])

  return (
    <div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.user_id}
        />
      </Box>
    </div>
  )
}

export default Home
