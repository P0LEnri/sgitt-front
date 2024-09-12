'use client'

import React, { useState } from 'react'
import { login } from '../app/utils/api'
import { BiSearchAlt } from 'react-icons/bi'
import { FiClock } from "react-icons/fi";
import { FaComputer } from "react-icons/fa6";
import { UserIcon, KeyIcon } from 'lucide-react'

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await login(credentials)
      console.log(response)
      // Handle success (e.g., save token and redirect to dashboard)
      window.location.href = '/home'
    } catch (error) {
      console.error(error)
      setError('Boleta o contraseña inválida. Por favor, intente de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-4xl w-full space-y-8">
          <div className='buscadorDiv grid gap-10 bg-secondary rounded-lg p-[3rem]'>
            <h1 className='text-3xl font-bold text-center text-oscure'>Bienvenido</h1>
            <p className='text-center text-gray-600'>Ingresa tus credenciales para iniciar sesión</p>
            <form onSubmit={handleSubmit}>
              <div className='primerDiv flex flex-col justify-between items-center rounded-xl gap-4 p-5 shadow-sm shadow-oscure bg-white'>
                <div className='flex gap-2 items-center w-full relative'>
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    className='bg-transparent text-oscure focus:outline-none w-full pl-10'
                    placeholder='Ingresa tu número de boleta'
                    required
                  />
                </div>
                <div className='flex gap-2 items-center w-full relative'>
                  <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className='bg-transparent text-oscure focus:outline-none w-full pl-10'
                    placeholder='Ingresa tu contraseña'
                    required
                  />
                </div>
                {error && (
                  <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}
                <button 
                  type="submit"
                  className='bg-oscure w-full p-3 rounded-xl text-white cursor-pointer hover:bg-primary'
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login