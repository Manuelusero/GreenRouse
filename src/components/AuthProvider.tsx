'use client'

import { SessionProvider } from 'next-auth/react'

export default function AuthProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <SessionProvider 
      refetchInterval={5 * 60} // Refetch cada 5 minutos
      refetchOnWindowFocus={false} // No refetch al cambiar de ventana
    >
      {children}
    </SessionProvider>
  )
}