import React from 'react'
import AppLayout from './AppLayout'
import IndexRoute from '../routes/IndexRoute'

const App = () => {
  return (
    <div>
      <AppLayout>
        <IndexRoute/>
      </AppLayout>
    </div>
  )
}

export default App