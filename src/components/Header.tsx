'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-leaf-green rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌱</span>
              </div>
              <span className="text-xl font-bold text-soil-dark">GreenRouse</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-leaf-green transition-colors">
              Inicio
            </Link>
            <Link href="/parcelas" className="text-gray-700 hover:text-leaf-green transition-colors">
              Mis Parcelas
            </Link>
            <Link href="/cursos" className="text-gray-700 hover:text-leaf-green transition-colors">
              Cursos
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-leaf-green transition-colors">
              Blog
            </Link>
            <Link href="/proveedores" className="text-gray-700 hover:text-leaf-green transition-colors">
              Proveedores
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-leaf-green border-t-transparent"></div>
            ) : session ? (
              <div className="relative flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-leaf-green rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {session.user?.name?.charAt(0).toUpperCase() || '👤'}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">
                    ¡Hola, {session.user?.name?.split(' ')[0] || 'Usuario'}!
                  </span>
                </div>
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="text-gray-600 hover:text-leaf-green transition-colors p-1"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                      <Link
                        href="/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        👤 Mi Perfil
                      </Link>
                      <Link
                        href="/parcelas"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        🌱 Mis Parcelas
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false)
                          signOut({ callbackUrl: '/' })
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        🚪 Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/auth/login"
                  className="bg-sage-green text-white px-4 py-2 rounded-md hover:bg-leaf-green transition-colors"
                >
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-leaf-green"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-leaf-green">
                Inicio
              </Link>
              <Link href="/parcelas" className="block px-3 py-2 text-gray-700 hover:text-leaf-green">
                Mis Parcelas
              </Link>
              <Link href="/cursos" className="block px-3 py-2 text-gray-700 hover:text-leaf-green">
                Cursos
              </Link>
              <Link href="/blog" className="block px-3 py-2 text-gray-700 hover:text-leaf-green">
                Blog
              </Link>
              <Link href="/proveedores" className="block px-3 py-2 text-gray-700 hover:text-leaf-green">
                Proveedores
              </Link>
              
              {/* Mobile auth section */}
              <div className="border-t pt-3 mt-3">
                {session ? (
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-leaf-green rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">
                          {session.user?.name?.charAt(0).toUpperCase() || '👤'}
                        </span>
                      </div>
                      <span className="text-gray-700 text-sm">
                        {session.user?.name || 'Usuario'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href="/perfil"
                        className="block text-gray-700 text-sm hover:text-leaf-green"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        👤 Mi Perfil
                      </Link>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false)
                          signOut({ callbackUrl: '/' })
                        }}
                        className="block text-red-600 text-sm hover:text-red-800"
                      >
                        🚪 Cerrar Sesión
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2">
                    <Link 
                      href="/auth/login"
                      className="block bg-sage-green text-white px-4 py-2 rounded-md text-center hover:bg-leaf-green transition-colors"
                    >
                      Iniciar Sesión
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}