import React from 'react'
import { download } from '../assets'
import { downloadImage } from '../utils'


const Card = ({ _id, name, photo, prompt }) => {
   return (
      <section className='rounded-xl relative group shadow-card hover:shadow-cardhover transition-all delay-300 card'>
         <img src={photo} alt={prompt} className='h-auto w-full object-cover rounded-xl' />

         <div className="group-hover:flex max-h-[94.5%] hidden">
            <div className="flex flex-col bg-black absolute bottom-1 left-1 right-1 p-4 h-auto rounded-lg">
               <div className="text-white text-clip">{prompt}</div>
               <div className="flex justify-between mt-3">
                  <div className="flex gap-2 justify-start align-center">
                     <div className="text-white text-xs font-bold rounded-full h-8 w-8 bg-green-600 flex items-center justify-center">{name[0]}</div>
                     <p className="text-gray-400 capitalize">{name}</p>
                  </div>
                  <button type='btn' className="h-7 w-7 font-bold rounded-full bg-blue-600 outline-none border-transparent"
                     onClick={() => downloadImage(_id, photo)}>
                     <img src={download} alt="download" />
                  </button>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Card