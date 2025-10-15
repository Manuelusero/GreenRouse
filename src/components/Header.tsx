'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

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
              <div className="flex items-center space-x-3">
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
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-gray-600 hover:text-red-600 transition-colors text-sm"
                >
                  Cerrar Sesión
                </button>
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
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-leaf-green rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">
                          {session.user?.name?.charAt(0).toUpperCase() || '👤'}
                        </span>
                      </div>
                      <span className="text-gray-700 text-sm">
                        {session.user?.name || 'Usuario'}
                      </span>
                    </div>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="text-red-600 text-sm hover:text-red-800"
                    >
                      Cerrar Sesión
                    </button>
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