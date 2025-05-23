import './App.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from './store/authslice'
import {Header, Footer} from "../src/components/index"
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((user) => {
      if (user) {
        dispatch(login({ user }))
      } else {
        dispatch(logout())
      }
    }
    )
    .catch((error) => {
      console.error("Error fetching user:", error)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-500 text-center text-2xl font-bold">
    <div className='w-full block'>
      <Header/>
      <main>
        Todooo: <Outlet/>
      </main>
      <Footer/>
    </div>
    </div>
  ) : null
}

export default App
