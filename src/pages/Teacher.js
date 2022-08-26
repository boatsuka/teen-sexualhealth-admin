import React from 'react'
import * as axios from 'axios'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Toolbar,
} from '@mui/material'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PreviewIcon from '@mui/icons-material/Preview'
import { SchoolOutlined } from '@mui/icons-material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'

import StockCard from '../components/StockCard'

function Teacher() {
  const [data, setData] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [school, setSchool] = React.useState([])
  const { reset, register, handleSubmit } = useForm()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
          onClick={() => DeleteTeacherData(params.id)}
        />,
      ],
    },
  ]

  const onSubmit = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API}/teacher/create`, {
        teacher_thai_firstname: data.teacher_thai_firstname,
        teache_thai_lastname: data.teache_thai_lastname,
        teacher_nick_name: data.teacher_nick_name,
        teacher_nickname_sound_path: 'string',
        teacher_image_path: 'string',
        school: data.school_id
      })
      .then(() => {
        toast.success('เพิ่มข้อมูลคุณครูสำเร็จ')
        setOpen(false)
        reset()
        GetTeacherData()
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  const GetTeacherData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/teacher`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }

  const GetSchoolData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/school`)
      .then((res) => setSchool(res.data))
      .catch((err) => toast.error(err))
  }

  const DeleteTeacherData = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API}/teacher/remove/${id}`)
      .then(() => {
        toast.success('ลบข้อมูลสำเร็จแล้ว')
        GetTeacherData()
      })
      .catch((err) => {
        toast.error(`เกิดข้อผิดพลาด ${err}`)
      })
  }

  React.useEffect(() => {
    GetTeacherData()
    GetSchoolData()
  }, [])

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
              {...register('teacher_thai_firstname')}
            />
            <TextField
              fullWidth
              label='นามสกุล'
              style={{ marginTop: 16 }}
              {...register('teache_thai_lastname')}
            />
            <TextField
              fullWidth
              label='ชื่อเล่น'
              style={{ marginTop: 16, marginBottom: 16 }}
              {...register('teacher_nick_name')}
            />
            <Select
              fullWidth
              {...register('school_id')}
              style={{ marginBottom: 18 }}
            >
              {school.map((item, index) => (
                <MenuItem key={index} value={item.school_id}>
                  {item.school_thai_name}
                </MenuItem>
              ))}
            </Select>
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
            icon={SchoolOutlined}
            title='คุณครูทั้งหมด'
            subtitle='9 คน'
            color='#00a65a'
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <StockCard
            icon={SchoolOutlined}
            title='คุณครูผู้รับผิดชอบระบบ'
            subtitle='3 คน'
            color='#F4D03F'
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <StockCard
            icon={SchoolOutlined}
            title='คุณครูที่ใช้งานอยู่'
            subtitle='6'
            color='#E67E22'
          />
        </Grid>
      </Grid>
      <Toolbar>
        <Button variant='contained' onClick={handleClickOpen}>
          เพิ่มข้อมูลครู
        </Button>
      </Toolbar>
      <Box sx={{ height: 400, width: '100%', top: 100 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.teacher_id}
        />
      </Box>
      {ShowDialog()}
    </>
  )
}

export default Teacher
