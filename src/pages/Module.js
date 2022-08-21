import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import React from 'react'
import * as axios from 'axios'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  InputLabel,
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

import StockCard from '../components/StockCard'
import { People } from '@mui/icons-material'

function Module() {
  const [data, setData] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const { reset, register, handleSubmit } = useForm()

  React.useEffect(() => {
    GetModuleData()
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const columns = [
    {
      field: 'module_name',
      headerName: 'ชื่อหน่วยการเรียนรู้',
      width: 300,
    },
    {
      field: 'module_level',
      headerName: 'ระดับการเรียนรู้',
      width: 120,
    },
    {
      field: 'module_description',
      headerName: 'รายละเอียดหน่วยการเรียนรู้',
      width: 220,
      editable: true,
    },
    {
      field: 'module_legth',
      headerName: 'ขอบเขตการเรียนรู้',
      width: 150,
      editable: true,
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
          onClick={() => DeleteModuleData(params.id)}
        />,
      ],
    },
  ]

  const GetModuleData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/module`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }

  const DeleteModuleData = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API}/module/delete/${id}`)
      .then(() => {
        toast.success('ลบข้อมูลสำเร็จแล้ว')
        GetModuleData()
      })
      .catch((err) => {
        toast.error(`เกิดข้อผิดพลาด ${err}`)
      })
  }

  const onSubmit = async (data) => {
    await axios.post(`${process.env.REACT_APP_API}/module/create`, {
      module_name: data.module_name,
      module_level: data.module_level,
      module_description: data.module_description,
      module_image_path: 'string',
      modulecol: data.modulecol,
      module_legth: data.module_legth,
    })
    await toast.success('เพิ่มข้อมูลผุ้ใช้งานสำเร็จ')
    await setOpen(false)
    await reset()
    await GetModuleData()
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
              label='ชื่อหน่วยการเรียนรู้'
              style={{ marginTop: 16 }}
              {...register('module_name')}
            />
            <InputLabel
              id='demo-simple-select-standard-label'
              style={{ marginTop: 18 }}
            >
              ระดับกาเรียนรู้
            </InputLabel>
            <Select
              fullWidth
              label='ระดับกาเรียนรู้'
              style={{ marginTop: 18 }}
              {...register('module_level')}
              labelId='demo-simple-select-standard-label'
            >
              <MenuItem value='A'>Advance</MenuItem>
              <MenuItem value='B'>Basic</MenuItem>
            </Select>
            <TextField
              fullWidth
              label='รายละเอียด'
              style={{ marginTop: 16 }}
              {...register('module_description')}
            />
            <TextField
              fullWidth
              label='อื่นๆ'
              style={{ marginTop: 16 }}
              {...register('modulecol')}
            />
            <TextField
              fullWidth
              label='ขอบเขตหน่วยการเรียนรู้'
              style={{ marginTop: 16, marginBottom: 16 }}
              {...register('module_legth')}
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
          เพิ่มข้อมูลหน่วยการเรียนรู้
        </Button>
      </Toolbar>
      <Box sx={{ height: 400, width: '100%', top: 100 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.module_id}
        />
      </Box>
      {ShowDialog()}
    </>
  )
}

export default Module
