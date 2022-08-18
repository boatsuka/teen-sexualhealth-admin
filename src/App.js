import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Error from './pages/Error'
import School from './pages/School'
import Teacher from './pages/Teacher'
import Student from './pages/Student'
import SchoolProfile from './pages/SchoolProfile'

import Layout from './components/Layout'
import StudentProfile from './pages/StudentProfile'
import TeacherProfile from './pages/TeacherProfile'

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['Prompt'].join(','),
    },
  })

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='school' element={<School />} />
              <Route path='school/:id' element={<SchoolProfile />} />
              <Route path='student' element={<Student />} />
              <Route path='student/:id' element={<StudentProfile />} />
              <Route path='teacher' element={<Teacher />} />
              <Route path='teacher/:id' element={<TeacherProfile />} />
              <Route path='*' element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
