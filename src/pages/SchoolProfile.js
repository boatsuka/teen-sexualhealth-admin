import React from 'react'
import { useParams } from 'react-router-dom'

function SchoolProfile() {
  const param = useParams()

  return (
    <div>
      <h3>SchoolProfile : {param.id}</h3>
    </div>
  )
}

export default SchoolProfile
