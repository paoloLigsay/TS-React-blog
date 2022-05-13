import React, { useState, useEffect, createContext } from 'react';
import './App.scss';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Blog from './components/Blog'

interface users {
  data?: []
}

interface user {
  id: number
  name: string
}

interface loginContext {
  user: user | null
  setUser: React.Dispatch<React.SetStateAction<user | null>>
  users?: users | null
}

export const loginContext = createContext<loginContext | null>(null)

const App = () => {
 
  const getUserData = async () => {
    const userData:users = await axios.get('https://jsonplaceholder.typicode.com/users')
    setUsers(userData)
  }
  
  const [user, setUser] = useState<user | null>(null)
  const [users, setUsers] = useState<users | null>(null)
  
  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className="App">
      <loginContext.Provider value={{ user, setUser, users }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="blog" element={<Blog />} />
        </Routes>
      </loginContext.Provider>
    </div>
  )
}

export default App;
