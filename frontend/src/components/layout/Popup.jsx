import { Cross, Delete, DeleteIcon, Music } from 'lucide-react'
import React from 'react'

const Popup = () => {
  return (
    <div className='flex items-center justify-between fixed bottom-5 left-5 bg-gray-100 shadow-sm shadow-white p-3 rounded-md max-w-[25rem] w-full text-black  text-sm dark:bg-slate-950 dark:text-white animate-bounce duration-300 '>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, placeat.
        <div><DeleteIcon/></div>
    </div>
  )
}

export default Popup