'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'

interface Cultivo {
  nombre: string
  espacioMinimo: number // cm entre plantas
  diasCosecha: number
  temporada: string[]
  compatibilidad: string[]
  incompatibilidad: string[]
}

import { cultivosDatabase, CultivoKey, getCultivosByCategoria, calcularPlantasPorM2 } from '@/data/cultivos'

// Conversión de la base de datos para mantener compatibilidad
const cultivos = Object.fromEntries(
  Object.entries(cultivosDatabase).map(([key, data]) => [
    key,
    {
      nombre: data.nombre,
      distanciaEntrePlantas: data.distancia,
      rendimientoPorPlanta: key === 'tomate' ? 2000 : key === 'pimiento' ? 800 : key === 'lechuga' ? 200 : key === 'espinaca' ? 150 : 100,
      diasCosecha: parseInt(data.dias.split('-')[0]) || 60,
      consejos: `Cultivo de ${data.dificultad.toLowerCase()} manejo, tiempo estimado: ${data.dias} días`
    }
  ])
)

export default function CalculadoraPage() {
  const [largo, setLargo] = useState<string>('')
  const [ancho, setAncho] = useState<string>('')
  const [cultivoSeleccionado, setCultivoSeleccionado] = useState<string>('')
  const [resultados, setResultados] = useState<any>(null)

  const calcularParcela = () => {
    const largoNum = parseFloat(largo)
    const anchoNum = parseFloat(ancho)
    
    if (!largoNum || !anchoNum || !cultivoSeleccionado || largoNum <= 0 || anchoNum <= 0) {
      setResultados({
        error: true,
        mensaje: 'Por favor, completa todos los campos con valores válidos (números mayores a 0)'
      })
      return
    }

    const area = (largoNum * anchoNum) / 10000 // Convertir cm² a m²
    const cultivo = cultivos[cultivoSeleccionado]
    
    // Cálculo más preciso considerando espaciado rectangular
    const plantasPorFila = Math.floor(largoNum / cultivo.distanciaEntrePlantas)
    const filas = Math.floor(anchoNum / cultivo.distanciaEntrePlantas)
    const totalPlantas = plantasPorFila * filas
    
    // Cálculo de área utilizada vs desperdiciada
    const areaUtilizada = totalPlantas * ((cultivo.distanciaEntrePlantas * cultivo.distanciaEntrePlantas) / 10000)
    const eficiencia = (areaUtilizada / area) * 100

    setResultados({
      area,
      totalPlantas,
      plantasPorFila,
      filas,
      areaUtilizada,
      eficiencia,
      cultivo,
      fechaCosecha: new Date(Date.now() + cultivo.diasCosecha * 24 * 60 * 60 * 1000),
      largoNum,
      anchoNum
    })
  }

  const reiniciar = () => {
    setLargo('')
    setAncho('')
    setCultivoSeleccionado('')
    setResultados(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Calculadora de Cultivos</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Planifica tu huerta de forma óptima con nuestra calculadora inteligente
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculadora */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-soil-dark mb-6">Calcula tu Parcela</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Largo (cm)
                  </label>
                  <input
                    type="number"
                    value={largo}
                    onChange={(e) => setLargo(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                    placeholder="200"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ancho (cm)
                  </label>
                  <input
                    type="number"
                    value={ancho}
                    onChange={(e) => setAncho(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                    placeholder="150"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cultivo a Plantar
                </label>
                {(() => {
                  const categorias = getCultivosByCategoria()
                  
                  return (
                    <>
                      <select
                        value={cultivoSeleccionado}
                        onChange={(e) => setCultivoSeleccionado(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
                      >
                        <option value="">Selecciona un cultivo</option>
                        
                        {Object.entries(categorias).map(([categoria, cultivosCategoria]) => (
                          <optgroup key={categoria} label={`${categoria}`}>
                            {cultivosCategoria.map(({ key, data }) => (
                              <option key={key} value={key}>
                                {data.icono} {data.nombre} - {data.distancia}cm - {data.dificultad}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      
                      {/* Información del cultivo seleccionado */}
                      {cultivoSeleccionado && cultivosDatabase[cultivoSeleccionado as CultivoKey] && (
                        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{cultivosDatabase[cultivoSeleccionado as CultivoKey].icono}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{cultivosDatabase[cultivoSeleccionado as CultivoKey].nombre}</h4>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                {cultivosDatabase[cultivoSeleccionado as CultivoKey].dificultad}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-3 text-sm">
                            <div>
                              <span className="text-gray-600">Distancia:</span>
                              <div className="font-semibold text-blue-600">{cultivosDatabase[cultivoSeleccionado as CultivoKey].distancia} cm</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Cosecha:</span>
                              <div className="font-semibold text-green-600">{cultivosDatabase[cultivoSeleccionado as CultivoKey].dias} días</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Por m²:</span>
                              <div className="font-semibold text-purple-600">{calcularPlantasPorM2(cultivoSeleccionado as CultivoKey)} plantas</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )
                })()}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={calcularParcela}
                  className="flex-1 bg-leaf-green text-white py-3 rounded-lg hover:bg-sage-green transition-colors font-semibold"
                >
                  Calcular
                </button>
                <button
                  onClick={reiniciar}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reiniciar
                </button>
              </div>
            </div>

            {/* Vista previa visual */}
            {largo && ancho && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-soil-dark mb-4">Vista Previa</h3>
                <div className="flex items-center justify-center bg-white rounded border-2 border-dashed border-gray-300 h-32">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📐</div>
                    <div className="text-sm font-medium text-gray-700">
                      {largo} cm × {ancho} cm
                    </div>
                    <div className="text-lg font-bold text-leaf-green">
                      {((parseFloat(largo) * parseFloat(ancho)) / 10000).toFixed(2)} m²
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resultados */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-soil-dark mb-6">Resultados</h2>
            
            {resultados ? (
              resultados.error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <div className="text-red-600 text-lg mb-2">⚠️</div>
                  <p className="text-red-700 font-medium">{resultados.mensaje}</p>
                </div>
              ) : (
              <div className="space-y-6">
                {/* Información básica */}
                <div className="bg-leaf-green/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-soil-dark mb-3">
                    Información de la Parcela
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Área total:</span>
                      <div className="font-semibold">{resultados.area.toFixed(2)} m²</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Cultivo:</span>
                      <div className="font-semibold">{resultados.cultivo.nombre}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Total plantas:</span>
                      <div className="font-semibold text-leaf-green">{resultados.totalPlantas}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Distribución:</span>
                      <div className="font-semibold">{resultados.plantasPorFila} × {resultados.filas}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Eficiencia del espacio:</span>
                      <div className="font-semibold text-blue-600">{resultados.eficiencia.toFixed(1)}%</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Fecha estimada cosecha:</span>
                      <div className="font-semibold">{resultados.fechaCosecha.toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                {/* Visualización de la distribución */}
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-soil-dark mb-3 text-center">
                    Vista de Distribución
                  </h4>
                  <div 
                    className="grid gap-1 mx-auto bg-sage-green/20 p-2 rounded"
                    style={{
                      gridTemplateColumns: `repeat(${resultados.plantasPorFila}, minmax(0, 1fr))`,
                      maxWidth: '300px',
                      aspectRatio: `${resultados.plantasPorFila}/${resultados.filas}`
                    }}
                  >
                    {Array.from({ length: resultados.totalPlantas }).map((_, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 bg-leaf-green rounded-full flex items-center justify-center"
                        title={`Planta ${index + 1}`}
                      >
                        <span className="text-white text-xs">🌱</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-2">
                    Cada punto representa una planta de {resultados.cultivo.nombre}
                  </div>
                </div>

                {/* Temporada óptima */}
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-soil-dark mb-3">
                    Temporada Óptima
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resultados.cultivo.temporada.map((temp: string) => (
                      <span key={temp} className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {temp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Plantas compatibles */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-soil-dark mb-3">
                    Plantas Compañeras
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resultados.cultivo.compatibilidad.map((planta: string) => (
                      <span key={planta} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                        ✓ {planta}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Plantas incompatibles */}
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-soil-dark mb-3">
                    Evitar Cerca
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resultados.cultivo.incompatibilidad.map((planta: string) => (
                      <span key={planta} className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm">
                        ✗ {planta}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Consejos */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-soil-dark mb-3">
                    Consejos de Plantación
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">📏</span>
                      Mantén {resultados.cultivo.espacioMinimo}cm de distancia entre plantas
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">⏰</span>
                      La cosecha estará lista en aproximadamente {resultados.cultivo.diasCosecha} días
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">🌤️</span>
                      Planta durante las temporadas recomendadas para mejores resultados
                    </li>
                    {resultados.eficiencia < 80 && (
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">💡</span>
                        <span>
                          <strong>Sugerencia:</strong> Tu eficiencia es del {resultados.eficiencia.toFixed(1)}%. 
                          Considera ajustar las dimensiones para aprovechar mejor el espacio.
                        </span>
                      </li>
                    )}
                    {resultados.totalPlantas >= 50 && (
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">🎯</span>
                        <span>
                          <strong>¡Excelente!</strong> Tu parcela puede albergar {resultados.totalPlantas} plantas. 
                          Considera la siembra escalonada para cosecha continua.
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              )
            ) : (
              <div className="text-center text-gray-500 py-12">
                <div className="text-6xl mb-4">🧮</div>
                <p>Completa los datos en la calculadora para ver los resultados</p>
              </div>
            )}
          </div>
        </div>

        {/* Herramientas adicionales */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-soil-dark mb-8">Otras Herramientas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="text-lg font-semibold text-soil-dark mb-2">Calendario de Siembra</h3>
              <p className="text-gray-600 text-sm mb-4">
                Planifica tus siembras según la temporada y ubicación
              </p>
              <button className="w-full bg-sage-green text-white py-2 rounded-lg hover:bg-leaf-green transition-colors">
                Ver Calendario
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">💧</div>
              <h3 className="text-lg font-semibold text-soil-dark mb-2">Calculadora de Riego</h3>
              <p className="text-gray-600 text-sm mb-4">
                Calcula las necesidades de agua de tus cultivos
              </p>
              <button className="w-full bg-sky-blue text-white py-2 rounded-lg hover:bg-blue-500 transition-colors">
                Calcular Riego
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="text-lg font-semibold text-soil-dark mb-2">Rotación de Cultivos</h3>
              <p className="text-gray-600 text-sm mb-4">
                Planifica la rotación para mantener la salud del suelo
              </p>
              <button className="w-full bg-earth-brown text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Planificar Rotación
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}