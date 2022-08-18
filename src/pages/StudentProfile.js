import React from 'react'
import { useParams } from 'react-router-dom'

function StudentProfile() {
  const param = useParams()
  return (
    <div>
      <h3>StudentProfile: {param.id}</h3>
    </div>
  )
}

export default StudentProfile
