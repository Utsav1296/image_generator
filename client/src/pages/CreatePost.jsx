import React, { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'
import './CreatePost.css'

const CreatePost = () => {
   const navigate = useNavigate()
   const [form, setForm] = useState({
      name: '',
      prompt: '',
      photo: '',
   })

   const [generatingImg, setGeneratingImg] = useState(false)
   const [loading, setLoading] = useState(false)


   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value })
   }
   const handleSurpriseMe = (e) => {
      const randomPrompt = getRandomPrompt(form.prompt)
      setForm({ ...form, prompt: randomPrompt })
   }
   const generateImage = async (e) => {
      if (form.prompt) {
         try {
            setGeneratingImg(true)
            const response = await fetch('https://genimaze.onrender.com/api/v1/dalle', {
               method: 'POST',
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify({ prompt: form.prompt })
            })
            if (!response.ok) {
               throw new Error(`Error! status: ${response.status}`);
            }
            const data = await response.json()
            setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
         } catch (error) {
            console.log(error)
         } finally {
            setGeneratingImg(false)
         }
      } else {
         alert("Please enter a prompt")
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (form.prompt && form.photo) {
         setLoading(true)
         try {
            const response = await fetch('https://genimaze.onrender.com/api/v1/post', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ ...form })
            })

            { console.log(await response.json()) };
            alert('Success')
            navigate('/')
         } catch (error) {
            console.log('err in handleSubmit function', error)
         } finally {
            setLoading(false)
         }
      } else {
         alert('Enter a prompt and generate an image')
      }
   }
   return (
      <section className='max-w-7xl flex flex-col justify-center items-center'>
         <div>
            <h1 className="font-extrabold text-[#222328] dark:text-[#dddcd7] text-[32px] capitalize">Create</h1>
            <p className='mt-2 text-[#666e75] max-w-[500px]'>Create through a collection of imaginative and visually stunning image through DALL-E-AI and share them with community.</p>
         </div>

         <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
               <FormField
                  labelName='Your name'
                  type='text'
                  name='name'
                  value={form.name}
                  placeholder='Your name'
                  handleChange={handleChange}
               />
               <FormField
                  labelName='Prompt'
                  type='text'
                  name='prompt'
                  value={form.prompt}
                  placeholder='an oil painting by Matisse of a humanoid robot playing chess'
                  handleChange={handleChange}
                  isSurpriseMe
                  handleSurpriseMe={handleSurpriseMe}
               />

               {/* preview  */}
               <div className="relative bg-gray-50 border-2 border-gray-300 text-gray-900 dark:text-gray-50 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 w-64 flex justify-center items-center rounded-lg">
                  {
                     form.photo ? (
                        <img
                           src={form.photo}
                           alt={form.prompt}
                           className='w-full h-full object-contain'
                        />
                     ) : (
                        <img
                           src={preview}
                           alt='preview'
                           className='w-9/12 h-9/12 object-contain opacity-40'
                        />
                     )}
                  {generatingImg &&
                     <div className='absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                        <Loader />
                     </div>
                  }
               </div>
            </div>

            <div className="mt-5 flex gap-5">
               <button
                  type='button'
                  onClick={generateImage}
                  className='btn-donate w-full bg-[#31baff] text-black'
               >
                  {generatingImg ? "Generating..." : "Generate"}
               </button>
            </div>

            <div className="mt-10">
               <p className='dark:text-gray-300 mt-2 text-[#666e75] text-[14px] sm:w-auto'>Once you have created the image you want, you can share it with others in the community.</p>
            </div>

            <button
               type='submit'
               className='mt-3 text-white bg-[#6469ff] px-5 py-2.5 w-full sm:w-auto text-center rounded-md'
            >
               {loading ? 'Sharing' : 'Share to Community'}
            </button>
         </form>
      </section>
   )
}

export default CreatePost