import { Cross, Delete, DeleteIcon, Music } from 'lucide-react'
import React from 'react'
import { UseData } from '../../context/MainContext'

const Popup = () => {
  const {Popup} = UseData();
  return (
    <div className='flex items-center justify-between fixed bottom-5 left-5 bg-gray-100 shadow-sm shadow-white p-3 rounded-md max-w-[25rem] w-full text-black  text-sm dark:bg-slate-950 dark:text-white animate-bounce duration-300 '>
       {Popup}
        <div><DeleteIcon/></div>
    </div>
  )
}

export default Popup