'use client'

import { useState, useEffect } from 'react'

interface RecomendacionesProps {
  pais: string
  tamaño: string
  ubicacionGeografica?: string
}

export default function RecomendacionesInteligentes({ pais, tamaño, ubicacionGeografica }: RecomendacionesProps) {
  const [recomendaciones, setRecomendaciones] = useState<{
    hortalizas: string[]
    aromaticas: string[]
    estacion: string
  } | null>(null)
  
  const [seleccionadas, setSeleccionadas] = useState<{
    hortalizas: string[]
    aromaticas: string[]
  }>({ hortalizas: [], aromaticas: [] })
  
  useEffect(() => {
    if (pais) {
      import('@/utils/geografia').then(({ obtenerHortalizasPorTemporada, obtenerEstacionActual }) => {
        const { hortalizas, aromaticas } = obtenerHortalizasPorTemporada(pais)
        const estacion = obtenerEstacionActual(pais)
        
        setRecomendaciones({
          hortalizas,
          aromaticas,
          estacion
        })
      })
    }
  }, [pais])

  const toggleSeleccion = (tipo: 'hortalizas' | 'aromaticas', planta: string) => {
    setSeleccionadas(prev => ({
      ...prev,
      [tipo]: prev[tipo].includes(planta)
        ? prev[tipo].filter(p => p !== planta)
        : [...prev[tipo], planta]
    }))
  }

  const generarOpcionesParcelas = () => {
    const totalSeleccionadas = seleccionadas.hortalizas.length + seleccionadas.aromaticas.length
    
    if (totalSeleccionadas === 0) {
      alert('Por favor selecciona al menos una planta para continuar')
      return
    }

    window.dispatchEvent(new CustomEvent('generarOpcionesParcelas', {
      detail: {
        hortalizas: seleccionadas.hortalizas,
        aromaticas: seleccionadas.aromaticas,
        tamaño: tamaño,
        totalPlantas: totalSeleccionadas
      }
    }))
  }

  if (!recomendaciones) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        🌱 Elige tus Plantas Ideales
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium text-green-700 mb-3 flex items-center">
            🥬 Hortalizas para {recomendaciones.estacion}
            {seleccionadas.hortalizas.length > 0 && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {seleccionadas.hortalizas.length} seleccionadas
              </span>
            )}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {recomendaciones.hortalizas.map((hortaliza) => (
              <div
                key={hortaliza}
                onClick={() => toggleSeleccion('hortalizas', hortaliza)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  seleccionadas.hortalizas.includes(hortaliza)
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-green-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium capitalize">
                    {hortaliza}
                  </div>
                  {seleccionadas.hortalizas.includes(hortaliza) && (
                    <div className="text-green-600 text-xs mt-1">✓ Seleccionada</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-purple-700 mb-3 flex items-center">
            🌿 Aromáticas (Todo el año)
            {seleccionadas.aromaticas.length > 0 && (
              <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                {seleccionadas.aromaticas.length} seleccionadas
              </span>
            )}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {recomendaciones.aromaticas.map((aromatica) => (
              <div
                key={aromatica}
                onClick={() => toggleSeleccion('aromaticas', aromatica)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  seleccionadas.aromaticas.includes(aromatica)
                    ? 'border-purple-500 bg-purple-50 text-purple-800'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-purple-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium capitalize">
                    {aromatica}
                  </div>
                  {seleccionadas.aromaticas.includes(aromatica) && (
                    <div className="text-purple-600 text-xs mt-1">✓ Seleccionada</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {(seleccionadas.hortalizas.length > 0 || seleccionadas.aromaticas.length > 0) && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h5 className="font-medium text-blue-800 mb-2">
            📋 Resumen de tu selección:
          </h5>
          <div className="text-sm text-blue-700">
            <div>🥬 Hortalizas: {seleccionadas.hortalizas.length}</div>
            <div>🌿 Aromáticas: {seleccionadas.aromaticas.length}</div>
            <div className="font-medium mt-1">
              Total: {seleccionadas.hortalizas.length + seleccionadas.aromaticas.length} plantas
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={generarOpcionesParcelas}
          disabled={seleccionadas.hortalizas.length === 0 && seleccionadas.aromaticas.length === 0}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            (seleccionadas.hortalizas.length > 0 || seleccionadas.aromaticas.length > 0)
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          🚀 Generar Opciones de Parcelas
        </button>
      </div>
    </div>
  )
}
