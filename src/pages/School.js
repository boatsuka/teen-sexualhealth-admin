import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Toolbar,
} from '@mui/material'
import React from 'react'
import * as axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PreviewIcon from '@mui/icons-material/Preview'
import { SchoolOutlined } from '@mui/icons-material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import StockCard from '../components/StockCard'

function School() {
  const [data, setData] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const { reset, register, handleSubmit } = useForm()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const GetSchoolData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/school`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }

  const columns = [
    {
      field: 'school_thai_name',
      headerName: 'ชื่อโรงเรียน',
      width: 250,
    },
    {
      field: 'school_english_name',
      headerName: 'ชื่อโรงเรียน อังกฤษ',
      width: 300,
    },
    {
      field: 'school_last_update',
      headerName: 'เวลา',
      width: 200,
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
          onClick={() => console.log(params.id)}
        />,
      ],
    },
  ]

  const onSubmit = async (data) => {
    await axios.post(`${process.env.REACT_APP_API}/school/create`, {
      school_thai_name: data.school_thai_name,
      school_address_number: data.school_address_number,
      school_zone: data.school_zone,
      school_english_name: data.school_english_name,
      school_road: data.school_road,
      school_subdistrict: data.school_subdistrict,
      school_district: data.school_district,
      school_province: data.school_province,
      school_postcode: data.school_postcode,
      coordinate_teacher_id: 0,
      school_code_url: data.school_code_url,
    })
    await toast.success('เพิ่มข้อมูลโรงเรียนสำเร็จ')
    await setOpen(false)
    await reset()
    await GetSchoolData()
  }

  React.useEffect(() => {
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
              label='ชื่อโรงเรียน'
              style={{ marginTop: 16 }}
              {...register('school_thai_name')}
              school_english_name
            />
            <TextField
              fullWidth
              label='ชื่อโรงเรียนภาษาอังกฤษ'
              style={{ marginTop: 16 }}
              {...register('school_english_name')}
            />
            <TextField
              fullWidth
              label='ที่อยุ่'
              style={{ marginTop: 16 }}
              {...register('school_address_number')}
            />
            <TextField
              fullWidth
              label='โซน'
              style={{ marginTop: 16 }}
              {...register('school_zone')}
            />
            <TextField
              fullWidth
              label='ถนน'
              style={{ marginTop: 16 }}
              {...register('school_road')}
            />
            <TextField
              fullWidth
              label='ตำบล'
              style={{ marginTop: 16 }}
              {...register('school_subdistrict')}
            />
            <TextField
              fullWidth
              label='อำเภอ'
              style={{ marginTop: 16 }}
              {...register('school_district')}
            />
            <TextField
              fullWidth
              label='จังหวัด'
              style={{ marginTop: 16 }}
              {...register('school_province')}
            />
            <TextField
              fullWidth
              label='รหัสไปรษณีย์'
              style={{ marginTop: 16 }}
              {...register('school_postcode')}
            />
            <TextField
              fullWidth
              label='ลิ้งค์โรงเรียน'
              style={{ marginTop: 16, marginBottom: 16 }}
              {...register('school_code_url')}
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
            icon={SchoolOutlined}
            title='โรงเรียนทั้งหมด'
            subtitle='3 แห่ง'
            color='#00a65a'
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <StockCard
            icon={SchoolOutlined}
            title='ครู'
            subtitle='8 คน'
            color='#F4D03F'
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <StockCard
            icon={SchoolOutlined}
            title='นักเรียน'
            subtitle='50 คน'
            color='#E67E22'
          />
        </Grid>
      </Grid>
      <Toolbar>
        <Button variant='contained' onClick={handleClickOpen}>
          เพิ่มข้อมูลโรงเรียน
        </Button>
      </Toolbar>
      <Box sx={{ height: 400, width: '100%', top: 100 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.school_id}
        />
      </Box>
      {ShowDialog()}
    </>
  )
}

export default School
