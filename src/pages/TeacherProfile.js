import React from 'react'
import { useParams } from 'react-router-dom'

function TeacherProfile() {
  const param = useParams()
  
  return (
    <div>
      <h3>TeacherProfile: {param.id}</h3>
    </div>
  )
}

export default TeacherProfile
