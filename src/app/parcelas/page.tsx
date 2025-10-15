import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import ParcelasClient from '@/components/ParcelasClient'
import connectDB from '@/lib/mongodb'
import Parcela from '@/models/Parcela'

// Función para obtener las parcelas del usuario desde la base de datos
async function getUserParcelas(userId: string) {
  try {
    await connectDB()
    const parcelas = await Parcela.find({ usuarioEmail: userId }).sort({ createdAt: -1 })
    return JSON.parse(JSON.stringify(parcelas)) // Serializar para Next.js
  } catch (error) {
    console.error('Error fetching parcelas:', error)
    return []
  }
}

export default async function ParcelasPage() {
  const session = await getServerSession()
  
  // Redirigir si no está autenticado
  if (!session) {
    redirect('/auth/login')
  }

  // Obtener las parcelas del usuario
  const parcelas = await getUserParcelas(session.user?.email || '')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ParcelasClient parcelas={parcelas} userEmail={session.user?.email || ''} />
      <Footer />
    </div>
  )
}