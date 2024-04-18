
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/testNav'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
const App = () => {

  const pathname = useLocation();

  useEffect(() => {       // Scroll to top at every re render
    window.scrollTo(0,0);
  }
  ,[pathname])

  return (
    <>
      <Navbar />
      <main id='main_app'>
          <Outlet />
      </main>

      <ToastContainer />
      <Footer />
    </>
  )
}

export default App