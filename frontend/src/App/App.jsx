import React from 'react'
import IndexRoute from '../routes/IndexRoute'
import Navbar from '../components/layout/Navbar'

const App = () => {
  IndexRoute
  return (
    <div>
      <Navbar/>
      <IndexRoute/>
    </div>
  )
}

export default App