'use client'

import { useState } from 'react'
import Link from 'next/link'
import Modal from './Modal'

interface Parcela {
  _id?: string
  nombre: string
  area: number
  cultivos: string[]
  fechaSiembra: string
  estado: string
  riego: string
  usuarioEmail: string
}

interface ParcelasClientProps {
  parcelas: Parcela[]
  userEmail: string
}

export default function ParcelasClient({ parcelas: initialParcelas, userEmail }: ParcelasClientProps) {
  const [parcelas, setParcelas] = useState<Parcela[]>(initialParcelas)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateParcela = async (nuevaParcela: Omit<Parcela, '_id' | 'usuarioEmail'>) => {
    setIsLoading(true)
    console.log('🚀 Creando parcela con datos:', { ...nuevaParcela, usuarioEmail: userEmail })
    
    try {
      const response = await fetch('/api/parcelas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...nuevaParcela,
          usuarioEmail: userEmail,
        }),
      })

      console.log('📡 Response status:', response.status)
      
      if (response.ok) {
        const parcelaCreada = await response.json()
        console.log('✅ Parcela creada exitosamente:', parcelaCreada)
        setParcelas([...parcelas, parcelaCreada])
        setIsModalOpen(false)
      } else {
        const errorData = await response.json()
        console.error('❌ Error creando parcela:', response.status, errorData)
        alert(`Error: ${errorData.error || 'No se pudo crear la parcela'}`)
      }
    } catch (error) {
      console.error('💥 Error de red:', error)
      alert('Error de conexión. Verifica tu conexión a internet.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-soil-dark mb-2">Mis Parcelas</h1>
          <p className="text-gray-600">Gestiona tus cultivos y monitorea el progreso de tu huerta</p>
        </div>
        {parcelas.length === 0 ? (
          <Link 
            href="/comenzar"
            className="bg-leaf-green text-white px-6 py-3 rounded-lg hover:bg-sage-green transition-colors font-semibold"
          >
            🌱 Comenzar Huerta
          </Link>
        ) : (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-leaf-green text-white px-6 py-3 rounded-lg hover:bg-sage-green transition-colors font-semibold"
          >
            + Nueva Parcela
          </button>
        )}
      </div>

      {/* Estado vacío - Sin parcelas */}
      {parcelas.length === 0 ? (
        <div className="text-center py-16">
          {/* Ilustración de estado vacío */}
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-leaf-green/10 to-sage-green/10 rounded-full flex items-center justify-center">
            <div className="text-6xl">🌱</div>
          </div>
          
          {/* Mensaje principal */}
          <h2 className="text-2xl font-bold text-soil-dark mb-4">
            ¡Comienza tu huerta orgánica!
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Te ayudaremos a crear el perfil perfecto para tu huerta. Responde unas preguntas y comenzaremos a diseñar tu espacio de cultivo ideal.
          </p>
          
          {/* Botón de acción principal */}
          <Link 
            href="/comenzar"
            className="inline-block bg-leaf-green text-white px-8 py-4 rounded-lg hover:bg-sage-green transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            � Comenzar Mi Huerta
          </Link>
          
          {/* Beneficios o tips */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-soil-dark mb-2">Monitoreo Completo</h3>
              <p className="text-gray-600 text-sm">
                Registra y supervisa el crecimiento de tus cultivos
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">💧</div>
              <h3 className="font-semibold text-soil-dark mb-2">Gestión de Riego</h3>
              <p className="text-gray-600 text-sm">
                Programa y controla el riego de cada parcela
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🌿</div>
              <h3 className="font-semibold text-soil-dark mb-2">Cultivo Orgánico</h3>
              <p className="text-gray-600 text-sm">
                Técnicas naturales para una agricultura sostenible
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Grid de parcelas existentes */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parcelas.map((parcela) => (
            <div key={parcela._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-leaf-green to-sage-green relative">
                <div className="absolute inset-0 earth-pattern opacity-20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{parcela.nombre}</h3>
                  <p className="text-green-100">{parcela.area} m²</p>
                </div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  parcela.estado === 'Creciendo' ? 'bg-yellow-100 text-yellow-800' :
                  parcela.estado === 'Plantado' ? 'bg-green-100 text-green-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {parcela.estado}
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-soil-dark mb-2">Cultivos Actuales</h4>
                  <div className="flex flex-wrap gap-2">
                    {parcela.cultivos.map((cultivo, index) => (
                      <span key={index} className="bg-sage-green/10 text-sage-green px-3 py-1 rounded-full text-sm">
                        {cultivo}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Fecha de siembra:</span>
                    <span className="font-medium">{new Date(parcela.fechaSiembra).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Riego:</span>
                    <span className="font-medium">{parcela.riego}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Link 
                    href={`/parcelas/${parcela._id}`}
                    className="flex-1 bg-leaf-green text-white text-center py-2 rounded-lg hover:bg-sage-green transition-colors text-sm font-medium"
                  >
                    Ver Detalles
                  </Link>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para crear nueva parcela */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-soil-dark mb-6">🌱 Nueva Parcela</h2>
          <FormularioNuevaParcela 
            onSubmit={handleCreateParcela} 
            onCancel={() => setIsModalOpen(false)}
            isLoading={isLoading}
          />
        </div>
      </Modal>
    </main>
  )
}

// Componente del formulario
function FormularioNuevaParcela({ 
  onSubmit, 
  onCancel, 
  isLoading 
}: { 
  onSubmit: (parcela: Omit<Parcela, '_id' | 'usuarioEmail'>) => void
  onCancel: () => void
  isLoading: boolean
}) {
  const [formData, setFormData] = useState({
    nombre: '',
    area: '',
    cultivos: '',
    fechaSiembra: new Date().toISOString().split('T')[0],
    estado: 'Preparando',
    riego: 'Diario'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      nombre: formData.nombre,
      area: parseInt(formData.area),
      cultivos: formData.cultivos.split(',').map(c => c.trim()).filter(c => c),
      fechaSiembra: formData.fechaSiembra,
      estado: formData.estado,
      riego: formData.riego
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Nombre de la Parcela
        </label>
        <input
          type="text"
          required
          value={formData.nombre}
          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 placeholder-gray-500"
          placeholder="Ej: Parcela Norte"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Área (m²)
        </label>
        <input
          type="number"
          required
          min="1"
          value={formData.area}
          onChange={(e) => setFormData({...formData, area: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 placeholder-gray-500"
          placeholder="25"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Cultivos (separados por coma)
        </label>
        <input
          type="text"
          value={formData.cultivos}
          onChange={(e) => setFormData({...formData, cultivos: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 placeholder-gray-500"
          placeholder="Tomates, Lechugas, Zanahorias"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Estado
          </label>
          <select
            value={formData.estado}
            onChange={(e) => setFormData({...formData, estado: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
          >
            <option value="Preparando">Preparando</option>
            <option value="Plantado">Plantado</option>
            <option value="Creciendo">Creciendo</option>
            <option value="Madurando">Madurando</option>
            <option value="Cosecha">Cosecha</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Frecuencia de Riego
          </label>
          <select
            value={formData.riego}
            onChange={(e) => setFormData({...formData, riego: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
          >
            <option value="Diario">Diario</option>
            <option value="Cada 2 días">Cada 2 días</option>
            <option value="Cada 3 días">Cada 3 días</option>
            <option value="Semanal">Semanal</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Fecha de Siembra
        </label>
        <input
          type="date"
          value={formData.fechaSiembra}
          onChange={(e) => setFormData({...formData, fechaSiembra: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-leaf-green text-white px-4 py-3 rounded-lg hover:bg-sage-green transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Creando...' : 'Crear Parcela'}
        </button>
      </div>
    </form>
  )
}