import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,

  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import React from 'react'
import * as axios from 'axios'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AddSubmoduleVideo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const AddSubmoduleVDO = async (data) => {
    await axios
      .get(`${process.env.REACT_APP_API}/submodule/vdo`, {
        vdopath_level: data.vdopath_level,
        vdopath_gender: data.vdopath_gender,
        vdopath_path: data.vdopath_path,
        submodul: id,
      })
      .then((res) => toast.success('เพิ่มวีดีโอแล้ว'))
      .catch((err) => toast.error(err))
  }

  return (
    <div>
      <Card>
        <Grid container>
          <form onSubmit={handleSubmit(AddSubmoduleVDO)}>
            <Box p='1em'>
              <Box>
                <Box>
                  <Typography variant='h6' gutterBottom>
                    รายละเอียดวีดีโอ
                  </Typography>
                  <Box display='flex'>
                    <Box flex={1} mr='0.5em'>
                      <TextField
                        size='small'
                        type={'text'}
                        label='ระดับของวีดีโอ'
                        style={{ marginTop: 16 }}
                        inputProps={{
                          'aria-label': 'ชื่อโรงเรียน',
                        }}
                        {...register('vdopath_level')}
                      />
                      <TextField
                        size='small'
                        type={'text'}
                        label='ประเภทของวีดีโอ'
                        style={{ marginTop: 16 }}
                        {...register('vdopath_gender')}
                      />
                    </Box>
                    <TextField
                      size='small'
                      type={'text'}
                      label='ลิ้งค์วีดีโอ'
                      style={{ marginTop: 16 }}
                      {...register('vdopath_path')}
                    />
                    <Box flex={1} ml='0.5em'></Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Toolbar>
              <Box display='flex' justifyContent='space-between' width='100%'>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  autoFocus
                  onClick={() => navigate(`/school/edit/${id}`)}
                >
                  บันทึก
                </Button>
              </Box>
            </Toolbar>
          </form>
        </Grid>
      </Card>
    </div>
  )
}

export default AddSubmoduleVideo
