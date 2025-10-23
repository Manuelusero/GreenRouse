'use client'

import { useState, useEffect } from 'react'

interface RecomendacionesProps {
  pais: string
  tamaño: string
  ubicacionGeografica?: string
}

interface Recomendacion {
  cultivos: string[]
  cultivosEstacionales: string[]
  cultivosClima: string[]
  cultivosEspacio: string[]
  consejos: string[]
  estacionActual: string
  hortalizas?: string[]
  aromaticas?: string[]
  datosClima?: {
    temperatura: number
    descripcion: string
    humedad: number
    tipoClima: string
    ciudad: string
    pais: string
  }
}

export default function RecomendacionesInteligentes({ pais, tamaño, ubicacionGeografica }: RecomendacionesProps) {
  const [recomendaciones, setRecomendaciones] = useState<Recomendacion | null>(null)
  
  useEffect(() => {
    if (pais) {
      // Obtener categorías organizadas
      import('@/utils/geografia').then(({ obtenerHortalizasPorTemporada, obtenerEstacionActual }) => {
        const { hortalizas, aromaticas } = obtenerHortalizasPorTemporada(pais)
        const estacion = obtenerEstacionActual(pais)
        
        // Crear recomendaciones organizadas
        const recsOrganizadas = {
          cultivos: [...hortalizas.slice(0, 6), ...aromaticas.slice(0, 4)],
          cultivosEstacionales: hortalizas,
          cultivosClima: aromaticas,
          cultivosEspacio: [],
          consejos: [`Cultivos ideales para ${estacion}`],
          estacionActual: estacion,
          hortalizas,
          aromaticas
        }
        
        setRecomendaciones(recsOrganizadas as any)
      })
    }
  }, [pais, tamaño, ubicacionGeografica])

  if (!recomendaciones) {
    return (
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">🌱 Recomendaciones de Cultivos</h3>
        <p className="text-gray-600">Selecciona tu país para ver recomendaciones personalizadas...</p>
      </div>
    )
  }

  return (
    <div className="mt-6 bg-gradient-to-r from-green-50 to-leaf-green/10 border border-leaf-green/20 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-soil-dark mb-6 flex items-center">
        <span className="mr-2">🌱</span>
        Qué Plantar en {recomendaciones.estacionActual}
      </h3>
      
      {/* Hortalizas de Temporada */}
      {recomendaciones.hortalizas && recomendaciones.hortalizas.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-soil-dark mb-3 flex items-center">
            <span className="mr-2">🥬</span>
            Hortalizas
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Perfectas para plantar ahora en {recomendaciones.estacionActual}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {recomendaciones.hortalizas.map((hortaliza: string, index: number) => (
              <div
                key={index}
                className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium text-center hover:bg-green-200 transition-colors cursor-pointer"
              >
                {hortaliza}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Aromáticas */}
      {recomendaciones.aromaticas && recomendaciones.aromaticas.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-soil-dark mb-3 flex items-center">
            <span className="mr-2">🌿</span>
            Aromáticas
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Hierbas aromáticas que puedes cultivar todo el año
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {recomendaciones.aromaticas.map((aromatica: string, index: number) => (
              <div
                key={index}
                className="px-3 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium text-center hover:bg-purple-200 transition-colors cursor-pointer"
              >
                {aromatica}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botón para crear parcelas automáticamente */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => {
            // Enviar evento personalizado para crear parcelas automáticamente
            window.dispatchEvent(new CustomEvent('crearParcelasAutomaticas', { 
              detail: { 
                accion: 'crear_parcelas_completas'
              } 
            }))
          }}
          className="w-full px-6 py-3 bg-leaf-green text-white rounded-lg hover:bg-sage-green transition-colors text-base font-semibold flex items-center justify-center"
        >
          <span className="mr-2">🚀</span>
          Crear Mis Parcelas Automáticamente
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Basado en tu perfil, ubicación, experiencia y objetivos
        </p>
      </div>
    </div>
  )
}