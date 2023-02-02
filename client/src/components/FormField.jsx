import React from 'react'

const FormField = ({ labelName, type, name, value, placeholder, handleChange, isSurpriseMe, handleSurpriseMe }) => {
   return (
      <div>
         <div className="flex items-center gap-2 mb-2">
            <label
               htmlFor='name'
               className='block text-sm font-medium text-gray-900 dark:text-gray-100'
            >{labelName}</label>
            {isSurpriseMe && (
               <button
                  type='button'
                  onClick={handleSurpriseMe}
                  className='font-semibold p-1 rounded-lg text-xs bg-[#ECECF1]'>Surprise me</button>
            )}
         </div>
         <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required
            className='bg-gray-50 border-2 dark:bg-gray-700 border-gray-300 dark:border-zinc-600 dark:text-gray-100 text-sm rounded-lg outline-none focus:ring-[#4649ff] dark:focus:ring-[#4649ff] focus:border-[#4649ff] dark:focus:border-[#4649ff] w-full p-2'
         />
      </div>
   )
}

export default FormField