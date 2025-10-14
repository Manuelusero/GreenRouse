'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState } from 'react'

// Datos de ejemplo para una parcela específica
const parcelaData = {
  id: 1,
  nombre: 'Parcela Norte',
  area: 25,
  fechaCreacion: '2024-08-15',
  ubicacion: 'Sector Norte del jardín',
  tipoSuelo: 'Franco arcilloso',
  pH: 6.8,
  exposicion: 'Sol directo 6-8 horas',
  sistemaRiego: 'Goteo automatizado',
  cultivos: [
    {
      id: 1,
      nombre: 'Tomates Cherry',
      variedad: 'Red Cherry',
      fechaSiembra: '2024-09-15',
      fechaCosechaEstimada: '2024-12-05',
      estado: 'Floración',
      plantas: 8,
      espaciado: '50cm x 50cm',
      notas: 'Crecimiento excelente, primeras flores apareciendo'
    },
    {
      id: 2,
      nombre: 'Lechugas',
      variedad: 'Manteca',
      fechaSiembra: '2024-10-01',
      fechaCosechaEstimada: '2024-11-15',
      estado: 'Crecimiento',
      plantas: 12,
      espaciado: '25cm x 25cm',
      notas: 'Necesita más riego en días calurosos'
    },
    {
      id: 3,
      nombre: 'Zanahorias',
      variedad: 'Nantes',
      fechaSiembra: '2024-09-20',
      fechaCosechaEstimada: '2024-12-20',
      estado: 'Desarrollo',
      plantas: 40,
      espaciado: '5cm x 15cm filas',
      notas: 'Suelo bien preparado, germinación del 85%'
    }
  ],
  historialRiego: [
    { fecha: '2024-10-13', cantidad: '15L', tipo: 'Automático', notas: 'Riego matutino' },
    { fecha: '2024-10-11', cantidad: '20L', tipo: 'Manual', notas: 'Riego extra por calor' },
    { fecha: '2024-10-09', cantidad: '15L', tipo: 'Automático', notas: 'Programación normal' }
  ],
  tareas: [
    { id: 1, tarea: 'Podar tomates', fecha: '2024-10-15', completada: false, prioridad: 'alta' },
    { id: 2, tarea: 'Cosechar lechugas maduras', fecha: '2024-10-16', completada: false, prioridad: 'media' },
    { id: 3, tarea: 'Agregar compost', fecha: '2024-10-20', completada: false, prioridad: 'baja' },
    { id: 4, tarea: 'Revisar sistema de riego', fecha: '2024-10-10', completada: true, prioridad: 'alta' }
  ]
}

export default async function ParcelaDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [seccionActiva, setSeccionActiva] = useState('resumen')
  const [nuevaTarea, setNuevaTarea] = useState('')
  
  const parcela = parcelaData // En una app real, obtendríamos por id

  const tareasActivas = parcela.tareas.filter(t => !t.completada)
  const tareasCompletadas = parcela.tareas.filter(t => t.completada)

  const toggleTarea = (tareaId: number) => {
    // En una app real, esto actualizaría el estado
    console.log('Toggle tarea:', tareaId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-leaf-green">Inicio</Link>
            <span className="text-gray-400">/</span>
            <Link href="/parcelas" className="text-gray-500 hover:text-leaf-green">Mis Parcelas</Link>
            <span className="text-gray-400">/</span>
            <span className="text-soil-dark font-medium">{parcela.nombre}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header con información básica */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-soil-dark mb-2">{parcela.nombre}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a1 1 0 011-1h4m10 1v4a1 1 0 01-1 1h-4m-6 10v4a1 1 0 001 1h4m6-1v-4a1 1 0 00-1-1h-4" />
                  </svg>
                  {parcela.area} m²
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {parcela.ubicacion}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4h-8z" />
                  </svg>
                  {parcela.cultivos.length} cultivos activos
                </span>
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 flex gap-3">
              <button className="bg-leaf-green text-white px-4 py-2 rounded-lg hover:bg-sage-green transition-colors">
                Editar Parcela
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Exportar Datos
              </button>
            </div>
          </div>
        </div>

        {/* Navegación de tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'resumen', label: 'Resumen', icon: '📊' },
                { id: 'cultivos', label: 'Cultivos', icon: '🌱' },
                { id: 'riego', label: 'Riego', icon: '💧' },
                { id: 'tareas', label: 'Tareas', icon: '✅' },
                { id: 'historial', label: 'Historial', icon: '📅' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSeccionActiva(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    seccionActiva === tab.id
                      ? 'border-leaf-green text-leaf-green bg-green-50'
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
            {/* Resumen */}
            {seccionActiva === 'resumen' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-soil-dark mb-2">Estado del Suelo</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Tipo:</span>
                        <span className="font-medium">{parcela.tipoSuelo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>pH:</span>
                        <span className="font-medium">{parcela.pH}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-soil-dark mb-2">Condiciones</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Exposición:</span>
                        <span className="font-medium text-xs">{parcela.exposicion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Riego:</span>
                        <span className="font-medium text-xs">{parcela.sistemaRiego}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-semibold text-soil-dark mb-2">Próximas Tareas</h4>
                    <div className="space-y-1">
                      {tareasActivas.slice(0, 2).map((tarea) => (
                        <div key={tarea.id} className="text-sm">
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${
                              tarea.prioridad === 'alta' ? 'bg-red-400' :
                              tarea.prioridad === 'media' ? 'bg-yellow-400' : 'bg-green-400'
                            }`}></span>
                            <span className="text-xs">{tarea.tarea}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-soil-dark mb-4">Cultivos Activos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {parcela.cultivos.map((cultivo) => (
                      <div key={cultivo.id} className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium mb-2">{cultivo.nombre}</h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Variedad: {cultivo.variedad}</div>
                          <div>Estado: <span className={`font-medium ${
                            cultivo.estado === 'Floración' ? 'text-yellow-600' :
                            cultivo.estado === 'Crecimiento' ? 'text-green-600' : 'text-blue-600'
                          }`}>{cultivo.estado}</span></div>
                          <div>Plantas: {cultivo.plantas}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Cultivos */}
            {seccionActiva === 'cultivos' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-soil-dark">Gestión de Cultivos</h3>
                  <button className="bg-leaf-green text-white px-4 py-2 rounded-lg hover:bg-sage-green transition-colors">
                    + Agregar Cultivo
                  </button>
                </div>

                <div className="space-y-4">
                  {parcela.cultivos.map((cultivo) => (
                    <div key={cultivo.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-soil-dark">{cultivo.nombre}</h4>
                          <p className="text-gray-600">Variedad: {cultivo.variedad}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          cultivo.estado === 'Floración' ? 'bg-yellow-100 text-yellow-800' :
                          cultivo.estado === 'Crecimiento' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {cultivo.estado}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-gray-500 text-sm">Fecha siembra:</span>
                          <div className="font-medium">{new Date(cultivo.fechaSiembra).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Cosecha estimada:</span>
                          <div className="font-medium">{new Date(cultivo.fechaCosechaEstimada).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Número de plantas:</span>
                          <div className="font-medium">{cultivo.plantas}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Espaciado:</span>
                          <div className="font-medium">{cultivo.espaciado}</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium mb-2">Notas:</h5>
                        <p className="text-gray-700">{cultivo.notas}</p>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                          Actualizar Estado
                        </button>
                        <button className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Riego */}
            {seccionActiva === 'riego' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-soil-dark">Historial de Riego</h3>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold mb-2">Sistema Actual: {parcela.sistemaRiego}</h4>
                  <p className="text-gray-600">Próximo riego automático programado para mañana a las 07:00</p>
                </div>

                <div className="space-y-3">
                  {parcela.historialRiego.map((riego, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.586V5L8 4z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">{new Date(riego.fecha).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500">{riego.notas}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{riego.cantidad}</div>
                        <div className="text-sm text-gray-500">{riego.tipo}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tareas */}
            {seccionActiva === 'tareas' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-soil-dark">Gestión de Tareas</h3>
                  <button className="bg-leaf-green text-white px-4 py-2 rounded-lg hover:bg-sage-green transition-colors">
                    + Nueva Tarea
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-soil-dark mb-4">Tareas Pendientes ({tareasActivas.length})</h4>
                    <div className="space-y-3">
                      {tareasActivas.map((tarea) => (
                        <div key={tarea.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                          <input
                            type="checkbox"
                            onChange={() => toggleTarea(tarea.id)}
                            className="mr-3 h-4 w-4 text-leaf-green focus:ring-leaf-green border-gray-300 rounded"
                          />
                          <div className="flex-1">
                            <div className="font-medium">{tarea.tarea}</div>
                            <div className="text-sm text-gray-500">
                              Fecha: {new Date(tarea.fecha).toLocaleDateString()}
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            tarea.prioridad === 'alta' ? 'bg-red-100 text-red-800' :
                            tarea.prioridad === 'media' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {tarea.prioridad}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-soil-dark mb-4">Completadas Recientemente ({tareasCompletadas.length})</h4>
                    <div className="space-y-3">
                      {tareasCompletadas.map((tarea) => (
                        <div key={tarea.id} className="flex items-center p-3 bg-gray-50 rounded-lg opacity-75">
                          <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-medium line-through">{tarea.tarea}</div>
                            <div className="text-sm text-gray-500">
                              Completada: {new Date(tarea.fecha).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Historial */}
            {seccionActiva === 'historial' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-soil-dark">Historial de la Parcela</h3>
                
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Historial Detallado</h4>
                  <p className="text-gray-600 mb-4">
                    El historial completo con gráficos de crecimiento, análisis de productividad y tendencias estará disponible próximamente.
                  </p>
                  <div className="text-sm text-gray-500">
                    <p>Parcela creada: {new Date(parcela.fechaCreacion).toLocaleDateString()}</p>
                    <p>Días activos: {Math.floor((Date.now() - new Date(parcela.fechaCreacion).getTime()) / (1000 * 60 * 60 * 24))}</p>
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