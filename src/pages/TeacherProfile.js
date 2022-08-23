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

function TeacherProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = React.useState([])
  const { setValue, register, handleSubmit } = useForm()

  const GetSchoolById = React.useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/student/teacherbystudent/${id}`)
      .then((res) => {
        setStudent(res.data)
        const fields = [
          'teacher_id',
          'teacher_thai_firstname',
          'teache_thai_lastname',
          'teacher_nick_name',
          'teacher_nickname_sound_path',
          'teacher_image_path',
          'teacher_isdelete',
        ]
        fields.forEach((field) => setValue(field, res.data[0].teacher[field]))
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [id, setValue])

  const onEditTeacher = async (data) => {
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
          <form onSubmit={handleSubmit(onEditTeacher)}>
            <Box p='1em'>
              <Box display='flex'>
                <Box flex={3} mr='1em'>
                  <Avatar
                    variant='square'
                    sx={{ width: 200, height: 180 }}
                  ></Avatar>
                </Box>
                <Box flex={6} mr='1em'>
                  <Typography variant='h6' gutterBottom>
                    ชื่อ
                  </Typography>
                  <Box display='flex'>
                    <Box flex={10} mr='0.5em'>
                      <TextField
                        disabled
                        fullWidth
                        size='small'
                        type={'text'}
                        // label='ชื่อโรงเรียน'
                        style={{ marginTop: 16 }}
                        inputProps={{
                          'aria-label': 'ชื่อโรงเรียน',
                        }}
                        {...register('teacher_thai_firstname')}
                      />
                      <TextField
                        disabled
                        fullWidth
                        size='small'
                        type={'text'}
                        // label='ชื่อโรงเรียน ภาษาอังกฤษ'
                        style={{ marginTop: 16 }}
                        {...register('teache_thai_lastname')}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Toolbar>
              <Box display='flex' justifyContent='space-between' width='100%'>
                <Button type='submit' fullWidth variant='contained' autoFocus>
                  แก้ไข
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
                  นักเรียนของคุณครู {}
                </Typography>
                <Box flex={2} mr='0.5em'>
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                  >
                    {student.map((item, index) => (
                      <ListItem
                        key={index}
                        onClick={() => navigate(`/teacher/${item.teacher_id}`)}
                      >
                        <ListItemAvatar>
                          <Avatar></Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            item.student_fisrtname +
                            '  ' +
                            item.student_lastname
                          }
                          secondary={item.student_nickname}
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

export default TeacherProfile
