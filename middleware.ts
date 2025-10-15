import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Lógica adicional del middleware si es necesaria
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Rutas que requieren autenticación
        const protectedPaths = ['/parcelas', '/calendario', '/perfil']
        const pathname = req.nextUrl.pathname
        
        // Si está en una ruta protegida, verificar que tenga token
        if (protectedPaths.some(path => pathname.startsWith(path))) {
          return !!token
        }
        
        // Para todas las demás rutas, permitir acceso
        return true
      }
    }
  }
)

// Configurar en qué rutas aplicar el middleware
export const config = {
  matcher: [
    '/parcelas/:path*',
    '/calendario/:path*', 
    '/perfil/:path*',
    '/api/parcelas/:path*',
    '/api/onboarding/:path*'
  ]
}