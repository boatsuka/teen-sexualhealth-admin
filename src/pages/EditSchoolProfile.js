import React from 'react'
import * as axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
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

function EditSchoolProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setValue, register, handleSubmit } = useForm()

  const GetSchoolById = React.useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/school/teacher/${id}`)
      .then((res) => {
        const fields = [
          'school_thai_name',
          'school_address_number',
          'school_zone',
          'school_english_name',
          'school_road',
          'school_subdistrict',
          'school_district',
          'school_province',
          'school_postcode',
          'teacher',
        ]
        fields.forEach((field) => {
          setValue(field, res.data[0][field])
        })
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [id, setValue])

  const onEditSchool = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API}/school/${id}`, {
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
        school_code_url: `${process.env.REACT_APP_WEB_BASE}?school=${id}`,
      })
      .then(async () => {
        await toast.success('บันทึกข้อมูลเรียบร้อยแล้ว')
        await navigate(`/school`)
      })
      .catch((err) => console.err(err))
  }

  React.useEffect(() => {
    GetSchoolById()
  })

  return (
    <div>
      <Card>
        <Grid container>
          <form onSubmit={handleSubmit(onEditSchool)}>
            <Box p='1em'>
              <Box display='flex'>
                <Box mr='1em'>
                  <Avatar
                    variant='square'
                    sx={{ width: 180, height: 250 }}
                  ></Avatar>
                </Box>
                <Box flex={1} mr='1em'>
                  <Typography variant='h6' gutterBottom>
                    ชื่อ
                  </Typography>
                  <Box display='flex'>
                    <Box flex={2} mr='0.5em'>
                      <TextField
                        size='small'
                        type={'text'}
                        // label='ชื่อโรงเรียน'
                        style={{ marginTop: 16 }}
                        inputProps={{
                          'aria-label': 'ชื่อโรงเรียน',
                        }}
                        {...register('school_thai_name')}
                      />
                      <TextField
                        size='small'
                        type={'text'}
                        // label='ชื่อโรงเรียน ภาษาอังกฤษ'
                        style={{ marginTop: 16 }}
                        {...register('school_english_name')}
                      />
                    </Box>
                    <Box flex={1} ml='0.5em'></Box>
                  </Box>
                  <Box mt='1em' />
                  <Typography variant='h5' gutterBottom>
                    ที่อยู่ติดต่อ
                  </Typography>
                  <TextField
                    size='small'
                    type={'text'}
                    // label='บ้านเลขที่'
                    style={{ marginTop: 16 }}
                    {...register('school_address_number')}
                  />
                  <TextField
                    size='small'
                    type={'text'}
                    // label='ถนน'
                    style={{ marginTop: 16, marginLeft: 10 }}
                    {...register('school_road')}
                  />
                  <TextField
                    size='small'
                    type={'text'}
                    // label='ตำบล'
                    style={{ marginTop: 16, marginLeft: 10 }}
                    {...register('school_subdistrict')}
                  />
                  <TextField
                    size='small'
                    type={'text'}
                    // label='อำเภอ'
                    style={{ marginTop: 16 }}
                    {...register('school_district')}
                  />
                  <TextField
                    size='small'
                    type={'text'}
                    // label='จังหวัด'
                    style={{ marginTop: 16, marginLeft: 10 }}
                    {...register('school_province')}
                  />
                  <TextField
                    size='small'
                    type={'text'}
                    // label='รหัสไปรษณีย์'
                    style={{ marginTop: 16, marginLeft: 10 }}
                    {...register('school_postcode')}
                  />
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
                  แก้ไข
                </Button>
              </Box>
            </Toolbar>
          </form>
        </Grid>
      </Card>
    </div>
  )
}

export default EditSchoolProfile
