import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import React from 'react'
import * as axios from 'axios'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Toolbar,
} from '@mui/material'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PreviewIcon from '@mui/icons-material/Preview'

import StockCard from '../components/StockCard'
import { People } from '@mui/icons-material'

function Home() {
  const [data, setData] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const { reset, register, handleSubmit } = useForm()

  React.useEffect(() => {
    GetUserData()
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const columns = [
    {
      field: 'user_loginname',
      headerName: 'ชื่อผู้ใช้งาน',
      width: 150,
    },
    {
      field: 'user_full_name',
      headerName: 'ชื่อ-นามสกุล',
      width: 150,
    },
    {
      field: 'user_email',
      headerName: 'อีเมล์',
      width: 180,
      editable: true,
    },
    {
      field: 'user_telephone',
      headerName: 'เบอร์โทรศัพท์',
      width: 150,
      editable: true,
    },
    {
      field: 'user_last_update',
      headerName: 'เวลา',
      width: 180,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<PreviewIcon />}
          label='Preview'
          onClick={() => console.log(params.id)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label='Edit'
          onClick={() => console.log(params.id)}
        />,
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
        toast.success('ลบข้อมูลสำเร็จแล้ว')
        GetUserData()
      })
      .catch((err) => {
        toast.error(`เกิดข้อผิดพลาด ${err}`)
      })
  }

  const onSubmit = async (data) => {
    await axios.post(`${process.env.REACT_APP_API}/user/create`, {
      user_loginname: data.user_loginname,
      user_password: data.user_password,
      user_full_name: data.user_full_name,
      user_email: data.user_email,
      user_telephone: data.user_telephone,
    })
    await toast.success('เพิ่มข้อมูลผุ้ใช้งานสำเร็จ')
    await setOpen(false)
    await reset()
    await GetUserData()
  }

  const ShowDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label='ชื่อผู้ใช้งาน'
              style={{ marginTop: 16 }}
              {...register('user_loginname')}
            />
            <TextField
              fullWidth
              label='รหัสผ่าน'
              type={"password"}
              style={{ marginTop: 16 }}
              {...register('user_password')}
            />
            <TextField
              fullWidth
              label='ชื่อ-นามสกุล'
              style={{ marginTop: 16 }}
              {...register('user_full_name')}
            />
            <TextField
              fullWidth
              label='อีเมล์'
              style={{ marginTop: 16 }}
              {...register('user_email')}
            />
            <TextField
              fullWidth
              label='เบอร์โทรศัพท์'
              style={{ marginTop: 16, marginBottom: 16 }}
              {...register('user_telephone')}
            />
            <Button type='submit' fullWidth variant='outlined' autoFocus>
              ยืนยัน
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <Grid
        container
        sx={{ m: 5 }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <StockCard
            icon={People}
            title='ผู้ใช้ทั้งหมด'
            subtitle='10 คน'
            color='#00a65a'
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <StockCard
            icon={People}
            title='ผู้ใช้งานที่เปิดใช้งาน'
            subtitle='10 คน'
            color='#F4D03F'
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <StockCard
            icon={People}
            title='ผู้ใช้งานที่ไม่ได้เปิดใช้งาน'
            subtitle='0 คน'
            color='#E67E22'
          />
        </Grid>
      </Grid>
      <Toolbar>
        <Button variant='contained' onClick={handleClickOpen}>
          เพิ่มข้อมูลผู้ใช้งาน
        </Button>
      </Toolbar>
      <Box sx={{ height: 400, width: '100%', top: 100 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.user_id}
        />
      </Box>
      {ShowDialog()}
    </>
  )
}

export default Home
