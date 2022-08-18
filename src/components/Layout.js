import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

import Header from './Header'

function Layouts() {
  return (
    <>
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer />
    </>
  )
}

export default Layouts
