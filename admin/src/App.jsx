import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import List from './pages/List/List'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
  import { ToastContainer } from 'react-toastify';



const App = () => {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <hr />
    <div className="app-content">
      <Sidebar/>
      <Routes>

        <Route path="/list" element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="/orders" element={<Orders />} />




      </Routes>
    </div>
    </>
  )
}

export default App