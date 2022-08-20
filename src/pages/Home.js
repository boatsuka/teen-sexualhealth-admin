import React from 'react'
import * as axios from 'axios'
import { Box } from '@mui/material'
import { toast } from 'react-toastify'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'

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
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon />} label='Edit' onClick={() => console.log(params.id)}/>,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label='Delete'
          onClick={() => DeleteUserData(params.id)}
        />,
      ],
    },
  ]

  const GetUserData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/user/all`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }

  const DeleteUserData = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API}/user/delete/${id}`)
      .then(() => {
        toast.success('ลบข้อมูลสำเร้จแล้ว')
        GetUserData()
      })
      .catch((err) => {
        toast.error(`เกิดข้อผิดพลาด ${err}`)
      })
  }

  React.useEffect(() => {
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
