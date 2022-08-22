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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'

function SchoolProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [teacher, setTeacher] = React.useState([])
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
        ]
        fields.forEach((field) => setValue(field, res.data[0][field]))
        setTeacher(res.data[0].teacher)
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [id, setValue, setTeacher])

  const onEditSchool = async (data) => {
    const linkHref = await window.location.href
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
        school_code_url: linkHref,
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
                        style={{ marginTop: 16, marginLeft: 10 }}
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
                <Button type='submit' fullWidth variant='contained' autoFocus>
                  บันทึก
                </Button>
              </Box>
            </Toolbar>
          </form>
        </Grid>
      </Card>
      <Box style={{ marginTop: 16 }}>
        <Card>
          <Box p='1em'>
            <Box display={'flex'}>
              <Box flex={1} mr='1em'>
                <Typography variant='h6' gutterBottom>
                  ครู
                </Typography>
                <Box flex={2} mr='0.5em'>
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                  >
                    {teacher.map((item, index) => (
                      <ListItem
                        key={index}
                        onClick={() => navigate(`/teacher/${item.teacher_id}`)}
                      >
                        <ListItemAvatar>
                          <Avatar></Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            item.teacher_thai_firstname +
                            '  ' +
                            item.teache_thai_lastname
                          }
                          secondary={item.teacher_nick_name}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </div>
  )
}

export default SchoolProfile
