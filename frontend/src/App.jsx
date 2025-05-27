import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
  const [sports, setSports] = useState([])

  useEffect(() => {
    axios.get('/api/sports')
      .then((response) => {
        setSports(response.data)
      })
      .catch((error) => {
        console.error('Error fetching sports data:', error)
      })
  }, [])

  return (
    <>
      <div>FrontEnd</div>
      <h1>Sports: {sports.length}</h1>

      {
      sports.map((sport) => {
        return (
          <div key={sport.id}>
            <h2>{sport.name}</h2>
            <h3>{sport.players}</h3>
            <h2>{sport.description}</h2>
          </div>
        )
      })
      }

    </>
  )
}

export default App
