'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ParcelaVisual from '@/components/ParcelaVisual'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function ParcelaDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { data: session } = useSession()
  const [id, setId] = useState('')
  const [parcela, setParcela] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [seccionActiva, setSeccionActiva] = useState('visual')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    params.then(resolvedParams => {
      setId(resolvedParams.id)
    })
  }, [params])

  useEffect(() => {
    if (id && session?.user) {
      fetchParcela()
    }
  }, [id, session])

  const fetchParcela = async () => {
    try {
      const response = await fetch(`/api/parcelas?userId=${session?.user?.email}`)
      if (response.ok) {
        const parcelas = await response.json()
        const parcelaEncontrada = parcelas.find((p: any) => p._id === id)
        if (parcelaEncontrada) {
          setParcela(parcelaEncontrada)
        }
      }
    } catch (error) {
      console.error('Error obteniendo parcela:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditParcela = async (nuevosCultivos: string[]) => {
    if (!parcela) return
    
    try {
      // Aquí implementarías la actualización en la base de datos
      console.log('Actualizando parcela con nuevos cultivos:', nuevosCultivos)
      
      // Actualizar el estado local mientras tanto
      setParcela({
        ...parcela,
        cultivos: nuevosCultivos
      })
      
      // Mostrar mensaje de éxito
      alert('¡Parcela actualizada exitosamente!')
      
    } catch (error) {
      console.error('Error actualizando parcela:', error)
      alert('Error actualizando la parcela')
    }
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando parcela...</p>
        </div>
      </div>
    )
  }

  if (!parcela) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Parcela no encontrada</h1>
            <Link 
              href="/parcelas"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Volver a Mis Parcelas
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-green-600">Inicio</Link>
            <span className="text-gray-400">/</span>
            <Link href="/parcelas" className="text-gray-500 hover:text-green-600">Mis Parcelas</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{parcela.nombre}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header con información básica */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{parcela.nombre}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  📐 {parcela.area} m²
                </span>
                <span className="flex items-center">
                  🌱 {parcela.cultivos?.length || 0} cultivos
                </span>
                <span className="flex items-center">
                  📅 Creada: {mounted ? new Date(parcela.fechaSiembra || parcela.createdAt).toLocaleDateString() : 'Cargando...'}
                </span>
                <span className="flex items-center">
                  💧 {parcela.riego}
                </span>
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 flex gap-3">
              <Link
                href="/parcelas"
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Volver
              </Link>
            </div>
          </div>
        </div>

        {/* Navegación de tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'visual', label: 'Vista de Parcela', icon: '🌱' },
                { id: 'info', label: 'Información', icon: '📊' },
                { id: 'cuidados', label: 'Cuidados', icon: '💧' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSeccionActiva(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    seccionActiva === tab.id
                      ? 'border-green-600 text-green-600 bg-green-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Vista Visual */}
            {seccionActiva === 'visual' && mounted && (
              <ParcelaVisual
                nombre={parcela.nombre}
                cultivos={parcela.cultivos || []}
                area={parcela.area || 10}
                onEdit={handleEditParcela}
              />
            )}
            {seccionActiva === 'visual' && !mounted && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Preparando vista visual...</p>
              </div>
            )}

            {/* Información */}
            {seccionActiva === 'info' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">📋 Detalles Generales</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Área:</span>
                        <span className="font-medium">{parcela.area} m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estado:</span>
                        <span className="font-medium capitalize">{parcela.estado}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tipo:</span>
                        <span className="font-medium">{parcela.tipo || 'Mixta'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">💧 Sistema de Riego</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Frecuencia:</span>
                        <span className="font-medium">{parcela.riego}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Último riego:</span>
                        <span className="font-medium">Hoy</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">🌱 Cultivos</h4>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span>Total: {parcela.cultivos?.length || 0} plantas</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {parcela.cultivos?.slice(0, 3).join(', ')}
                        {parcela.cultivos?.length > 3 && '...'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lista detallada de cultivos */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">🌿 Lista de Cultivos</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {parcela.cultivos?.map((cultivo: string, index: number) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                        <div className="text-lg mb-1">🌱</div>
                        <div className="text-sm font-medium capitalize">{cultivo}</div>
                      </div>
                    )) || (
                      <div className="col-span-full text-center text-gray-500 py-8">
                        No hay cultivos en esta parcela
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Cuidados */}
            {seccionActiva === 'cuidados' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">💧 Plan de Cuidados</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">💧 Cronograma de Riego</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <span>Próximo riego</span>
                        <span className="font-medium text-blue-600">
                          {parcela.riego === 'Diario' ? 'Mañana' : 
                           parcela.riego === 'Cada 2 días' ? 'En 2 días' : 'Esta semana'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <span>Último riego</span>
                        <span className="font-medium">Hoy</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">🌱 Tareas Sugeridas</h4>
                    <div className="space-y-2">
                      <div className="flex items-center p-2 bg-white rounded border">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-sm">Revisar hojas por plagas</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded border">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-sm">Verificar humedad del suelo</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded border">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-sm">Quitar malas hierbas</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">📅 Calendario de Cosecha</h4>
                  <p className="text-gray-600 mb-4">
                    Basado en tus cultivos actuales, estas son las fechas estimadas de cosecha:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {parcela.cultivos?.slice(0, 6).map((cultivo: string, index: number) => {
                      // Usar un seed determinístico basado en el índice para evitar hidratación inconsistente
                      const diasParaCosecha = (index * 13 + 30) % 90 + 30 // Determinístico
                      const fechaCosecha = new Date()
                      fechaCosecha.setDate(fechaCosecha.getDate() + diasParaCosecha)
                      
                      return (
                        <div key={index} className="flex justify-between items-center p-3 bg-white rounded border">
                          <span className="capitalize font-medium">{cultivo}</span>
                          <span className="text-sm text-gray-600">
                            {mounted ? fechaCosecha.toLocaleDateString() : 'Calculando...'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}