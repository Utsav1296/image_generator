import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { logo } from './assets'
import { Home, CreatePost } from './pages/index'
import ThemeSwitch from './components/ThemeSwitch'

function App() {

  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white dark:bg-black sm-px-8 px-4 py-4 border-b border-b-[#e6ebf4] dark:border-b-gray-600 ease-in duration-300'>
        <Link to='/' className='bg-gradient-to-t from-green-50 via-blue-300 to-purple-200 p-2 rounded-2xl'>
          <img src={logo} alt="logo" className='w-28 object-contain' />
        </Link>
        <div className="flex gap-2">
          <ThemeSwitch />
          <Link to='/create-post' className='font-inter font-medium bg-[rgb(100,105,255)] text-white dark:bg-[rgb(96,104,255)]  px-4 py-2 rounded-md'>
            Create
          </Link>
        </div>
      </header>

      <main className='w-full px-4 py-8 sm:p-8 bg-[#f9fafe] dark:bg-gray-800 min-h[cal(100vh-73px)] ease-in duration-700'>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
