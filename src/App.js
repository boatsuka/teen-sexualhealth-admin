import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Error from './pages/Error'
import School from './pages/School'
import Teacher from './pages/Teacher'
import Student from './pages/Student'
import Dashboard from './pages/Dashboard'
import SchoolProfile from './pages/SchoolProfile'

import Layout from './components/Layout'
import StudentProfile from './pages/StudentProfile'
import TeacherProfile from './pages/TeacherProfile'
import Module from './pages/Module'


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
              <Route path='/' element={<Dashboard />} />
              <Route path='school' element={<School />} />
              <Route path='school/:id' element={<SchoolProfile />} />
              <Route path='student' element={<Student />} />
              <Route path='student/:id' element={<StudentProfile />} />
              <Route path='teacher' element={<Teacher />} />
              <Route path='teacher/:id' element={<TeacherProfile />} />
              <Route path="module" element={<Module />}/>
              <Route path='*' element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer autoClose={3000} />
    </React.Fragment>
  )
}

export default App
