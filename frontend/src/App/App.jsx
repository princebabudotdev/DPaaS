import React from 'react'
import IndexRoute from '../routes/IndexRoute'
import Navbar from '../components/layout/Navbar'
import Popup from '../components/layout/Popup'

const App = () => {
  IndexRoute
  return (
    <div className='h-screen w-screen bg-white text-slate-950 dark:bg-slate-900 text-white'>
      <Navbar/>
      <Popup/>
      <IndexRoute/>
    </div>
  )
}

export default App