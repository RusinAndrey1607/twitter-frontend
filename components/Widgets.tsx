import React from 'react'
import {MagnifyingGlassIcon } from "@heroicons/react/24/outline"
type Props = {}

const Widgets = (props: Props) => {
  return (
    <div className='px-2 mt-2 col-span-2 hidden lg:inline'>
        {/* Search */}
        <div className="flex items-center space-x-2 p-3 rounded-full mt-2 bg-gray-100 ">
            <MagnifyingGlassIcon className='w-5 h-5' />
            <input type="text" placeholder='Search Twitter' className="bg-transparent outline-none flex-1 text-gray-400" />
        </div>
    </div>
  )
}

export default Widgets