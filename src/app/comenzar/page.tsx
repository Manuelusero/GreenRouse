'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { cultivosDatabase, CultivoKey, getCultivosRecomendados } from '@/data/cultivos'

interface FormData {
  nombre: string
  experiencia: string
  espacio: string
  ubicacion: string
  objetivos: string[]
  tiempo: string
  parcelas?: Array<{nombre: string, largo: number, ancho: number, cultivo: string}>
  [key: string]: string | string[] | boolean | undefined | Array<{nombre: string, largo: number, ancho: number, cultivo: string}>
}

export default function ComenzarHuerta() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [paso, setPaso] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    experiencia: '',
    espacio: '',
    ubicacion: '',
    objetivos: [],
    tiempo: '',
    parcelas: []
  })

  const [parcelaEdit, setParcelaEdit] = useState({
    nombre: '',
    largo: '',
    ancho: '',
    cultivo: ''
  })

  const totalPasos = 9

  // Efecto para verificar autenticación
  useEffect(() => {
    if (status === 'loading') return // Aún cargando
    
    if (!session) {
      // Si no está autenticado, redirigir al login
      router.push('/auth/login')
      return
    }

    // Si está autenticado, prellenar nombre del usuario
    if (session.user?.name && !formData.nombre) {
      setFormData(prev => ({
        ...prev,
        nombre: session.user?.name || ''
      }))
    }
  }, [session, status, router, formData.nombre])

  const handleObjetivosChange = (objetivo: string) => {
    setFormData(prev => ({
      ...prev,
      objetivos: prev.objetivos.includes(objetivo)
        ? prev.objetivos.filter(obj => obj !== objetivo)
        : [...prev.objetivos, objetivo]
    }))
  }

  const nextPaso = () => {
    if (paso < totalPasos) setPaso(paso + 1)
  }

  const prevPaso = () => {
    if (paso > 1) setPaso(paso - 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-soil-dark">Comenzar mi Huerta</h1>
            <span className="text-sm text-gray-600">Paso {paso} de {totalPasos}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-leaf-green h-2 rounded-full transition-all duration-300"
              style={{ width: `${(paso / totalPasos) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Paso 1: Bienvenida */}
          {paso === 1 && (
            <div className="text-center">
              <div className="text-6xl mb-6">🌱</div>
              <h2 className="text-2xl font-bold text-soil-dark mb-4">
                ¡Bienvenido a tu viaje en la agricultura orgánica!
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Te vamos a guiar paso a paso para crear tu primera huerta orgánica. 
                Este proceso toma solo unos minutos y nos ayuda a personalizar tu experiencia.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Cómo te gusta que te llamen?
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full max-w-md mx-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
                  placeholder="Tu nombre"
                />
              </div>
            </div>
          )}

          {/* Paso 2: Experiencia */}
          {paso === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-soil-dark mb-6 text-center">
                ¡Hola {formData.nombre || 'amigo'}! ¿Cuál es tu experiencia con la jardinería?
              </h2>
              
              <div className="space-y-4 max-w-2xl mx-auto">
                {[
                  { valor: 'principiante', titulo: 'Soy principiante', descripcion: 'Nunca he tenido una huerta antes', icono: '🌱' },
                  { valor: 'basico', titulo: 'Algo de experiencia', descripcion: 'He tenido algunas plantas en macetas', icono: '🪴' },
                  { valor: 'intermedio', titulo: 'Experiencia intermedia', descripcion: 'He manejado jardines pequeños antes', icono: '🌿' },
                  { valor: 'avanzado', titulo: 'Bastante experiencia', descripcion: 'Tengo experiencia con huertas grandes', icono: '🌳' }
                ].map((opcion) => (
                  <button
                    key={opcion.valor}
                    onClick={() => setFormData(prev => ({ ...prev, experiencia: opcion.valor }))}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.experiencia === opcion.valor
                        ? 'border-leaf-green bg-leaf-green/5'
                        : 'border-gray-200 hover:border-leaf-green/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{opcion.icono}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{opcion.titulo}</div>
                        <div className="text-sm text-gray-600">{opcion.descripcion}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Paso 3: Espacio disponible */}
          {paso === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-soil-dark mb-6 text-center">
                ¿Cuánto espacio tienes disponible?
              </h2>
              
              <div className="space-y-4 max-w-2xl mx-auto">
                {[
                  { valor: 'balcon', titulo: 'Balcón o terraza', descripcion: 'Macetas y jardineras (1-5 m²)', icono: '🏠' },
                  { valor: 'patio', titulo: 'Patio pequeño', descripcion: 'Espacio limitado (5-20 m²)', icono: '🏡' },
                  { valor: 'jardin', titulo: 'Jardín mediano', descripcion: 'Buen espacio disponible (20-100 m²)', icono: '🌻' },
                  { valor: 'terreno', titulo: 'Terreno grande', descripcion: 'Mucho espacio (100+ m²)', icono: '🚜' }
                ].map((opcion) => (
                  <button
                    key={opcion.valor}
                    onClick={() => setFormData(prev => ({ ...prev, espacio: opcion.valor }))}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.espacio === opcion.valor
                        ? 'border-leaf-green bg-leaf-green/5'
                        : 'border-gray-200 hover:border-leaf-green/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{opcion.icono}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{opcion.titulo}</div>
                        <div className="text-sm text-gray-600">{opcion.descripcion}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Paso 4: Ubicación */}
          {paso === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-soil-dark mb-6 text-center">
                ¿Dónde está ubicada tu huerta?
              </h2>
              
              <div className="space-y-4 max-w-2xl mx-auto">
                {[
                  { valor: 'interior', titulo: 'Interior (muy poca luz)', descripcion: 'Dentro de casa, luz artificial', icono: '💡' },
                  { valor: 'sombra', titulo: 'Sombra parcial', descripcion: '2-4 horas de sol directo', icono: '⛅' },
                  { valor: 'semisombra', titulo: 'Semi-sombra', descripcion: '4-6 horas de sol directo', icono: '🌤️' },
                  { valor: 'sol', titulo: 'Sol directo', descripcion: '6+ horas de sol directo', icono: '☀️' }
                ].map((opcion) => (
                  <button
                    key={opcion.valor}
                    onClick={() => setFormData(prev => ({ ...prev, ubicacion: opcion.valor }))}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.ubicacion === opcion.valor
                        ? 'border-leaf-green bg-leaf-green/5'
                        : 'border-gray-200 hover:border-leaf-green/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{opcion.icono}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{opcion.titulo}</div>
                        <div className="text-sm text-gray-600">{opcion.descripcion}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Paso 5: Objetivos */}
          {paso === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-soil-dark mb-6 text-center">
                ¿Cuáles son tus objetivos? (Puedes elegir varios)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {[
                  { valor: 'alimentos', titulo: 'Producir mis propios alimentos', icono: '🥬' },
                  { valor: 'hierbas', titulo: 'Cultivar hierbas aromáticas', icono: '🌿' },
                  { valor: 'flores', titulo: 'Tener flores hermosas', icono: '🌸' },
                  { valor: 'medicina', titulo: 'Plantas medicinales', icono: '🌱' },
                  { valor: 'hobby', titulo: 'Relajarme y divertirme', icono: '😌' },
                  { valor: 'sostenible', titulo: 'Vivir más sostenible', icono: '♻️' }
                ].map((opcion) => (
                  <button
                    key={opcion.valor}
                    onClick={() => handleObjetivosChange(opcion.valor)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.objetivos.includes(opcion.valor)
                        ? 'border-leaf-green bg-leaf-green/5'
                        : 'border-gray-200 hover:border-leaf-green/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{opcion.icono}</span>
                      <div className="font-semibold text-gray-900">{opcion.titulo}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Paso 6: Tiempo disponible */}
          {paso === 6 && (
            <div>
              <h2 className="text-2xl font-bold text-soil-dark mb-6 text-center">
                ¿Cuánto tiempo puedes dedicar por semana?
              </h2>
              
              <div className="space-y-4 max-w-2xl mx-auto">
                {[
                  { valor: 'poco', titulo: '30 minutos - 1 hora', descripcion: 'Solo lo básico', icono: '⏱️' },
                  { valor: 'moderado', titulo: '1-3 horas', descripcion: 'Mantenimiento regular', icono: '🕐' },
                  { valor: 'bastante', titulo: '3-5 horas', descripcion: 'Dedicación considerable', icono: '🕕' },
                  { valor: 'mucho', titulo: '5+ horas', descripcion: 'Es mi pasión principal', icono: '❤️' }
                ].map((opcion) => (
                  <button
                    key={opcion.valor}
                    onClick={() => setFormData(prev => ({ ...prev, tiempo: opcion.valor }))}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.tiempo === opcion.valor
                        ? 'border-leaf-green bg-leaf-green/5'
                        : 'border-gray-200 hover:border-leaf-green/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{opcion.icono}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{opcion.titulo}</div>
                        <div className="text-sm text-gray-600">{opcion.descripcion}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Paso 7: Sugerencias de cultivos */}
          {paso === 7 && (
            <div>
              <h2 className="text-2xl font-bold text-soil-dark mb-4 text-center">
                ¡Perfecto! Basado en tu perfil, te recomendamos estos cultivos:
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Selecciona los que te interesen para incluir en tu huerta
              </p>
              
              <div className="space-y-4">
                <div className="bg-leaf-green/10 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-soil-dark mb-2">
                    ¿Por qué estas recomendaciones?
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Tu nivel: <span className="font-medium">{formData.experiencia}</span></p>
                    <p>• Tu espacio: <span className="font-medium">{formData.espacio}</span></p>
                    <p>• Luz disponible: <span className="font-medium">{formData.ubicacion}</span></p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getCultivosRecomendados({
                    experiencia: formData.experiencia,
                    espacio: formData.espacio,
                    ubicacion: formData.ubicacion
                  }).map((cultivo) => (
                    <button
                      key={cultivo.key}
                      onClick={() => {
                        const cultivosSeleccionados = formData.objetivos.includes('cultivos-seleccionados') 
                          ? formData.objetivos 
                          : [...formData.objetivos, 'cultivos-seleccionados']
                        setFormData(prev => ({ 
                          ...prev, 
                          objetivos: cultivosSeleccionados,
                          [cultivo.key]: !prev[cultivo.key]
                        }))
                      }}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData[cultivo.key]
                          ? 'border-leaf-green bg-leaf-green/5'
                          : 'border-gray-200 hover:border-leaf-green/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{cultivo.data.icono}</span>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-900">{cultivo.data.nombre}</h4>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {cultivo.data.dificultad}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{cultivo.data.dias} días</p>
                          <p className="text-xs text-leaf-green font-medium">{cultivo.motivo}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Paso 8: Crear parcelas */}
          {paso === 8 && (
            <div>
              <h2 className="text-2xl font-bold text-soil-dark mb-4 text-center">
                Crea tus parcelas personalizadas
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Ajusta las dimensiones y asigna cultivos a cada parcela
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calculadora de nueva parcela */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-soil-dark mb-4">➕ Agregar Nueva Parcela</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de la parcela
                      </label>
                      <input
                        type="text"
                        value={parcelaEdit.nombre}
                        onChange={(e) => setParcelaEdit(prev => ({ ...prev, nombre: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
                        placeholder="ej. Bancal Principal"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Largo (cm)
                        </label>
                        <input
                          type="number"
                          value={parcelaEdit.largo}
                          onChange={(e) => setParcelaEdit(prev => ({ ...prev, largo: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
                          placeholder="200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ancho (cm)
                        </label>
                        <input
                          type="number"
                          value={parcelaEdit.ancho}
                          onChange={(e) => setParcelaEdit(prev => ({ ...prev, ancho: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
                          placeholder="100"
                        />
                      </div>
                    </div>
                    
                    {/* Selector de cultivo mejorado */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cultivo principal
                      </label>
                      <select
                        value={parcelaEdit.cultivo}
                        onChange={(e) => setParcelaEdit(prev => ({ ...prev, cultivo: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
                      >
                        <option value="">Selecciona un cultivo</option>
                        
                        <optgroup label="🥬 Hojas Verdes (Fáciles)">
                          <option value="lechuga">{cultivosDatabase.lechuga.icono} Lechuga - {cultivosDatabase.lechuga.distancia}cm</option>
                          <option value="espinaca">{cultivosDatabase.espinaca.icono} Espinaca - {cultivosDatabase.espinaca.distancia}cm</option>
                          <option value="acelga">{cultivosDatabase.acelga.icono} Acelga - {cultivosDatabase.acelga.distancia}cm</option>
                        </optgroup>
                        
                        <optgroup label="🍅 Frutos">
                          <option value="tomate">{cultivosDatabase.tomate.icono} Tomate - {cultivosDatabase.tomate.distancia}cm</option>
                          <option value="tomate-cherry">{cultivosDatabase['tomate-cherry'].icono} Tomate Cherry - {cultivosDatabase['tomate-cherry'].distancia}cm</option>
                          <option value="pimiento">{cultivosDatabase.pimiento.icono} Pimiento - {cultivosDatabase.pimiento.distancia}cm</option>
                        </optgroup>
                        
                        <optgroup label="🌿 Aromáticas">
                          <option value="albahaca">{cultivosDatabase.albahaca.icono} Albahaca - {cultivosDatabase.albahaca.distancia}cm</option>
                          <option value="perejil">{cultivosDatabase.perejil.icono} Perejil - {cultivosDatabase.perejil.distancia}cm</option>
                        </optgroup>
                        
                        <option value="mixto">🌈 Cultivos mixtos</option>
                        <option value="otro">❓ Otro</option>
                      </select>
                      
                      {/* Info del cultivo seleccionado */}
                      {parcelaEdit.cultivo && cultivosDatabase[parcelaEdit.cultivo as CultivoKey] && (
                        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{cultivosDatabase[parcelaEdit.cultivo as CultivoKey].icono}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{cultivosDatabase[parcelaEdit.cultivo as CultivoKey].nombre}</h4>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                {cultivosDatabase[parcelaEdit.cultivo as CultivoKey].dificultad}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            💡 Distancia recomendada: {cultivosDatabase[parcelaEdit.cultivo as CultivoKey].distancia} cm entre plantas
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Vista previa del cálculo */}
                    {parcelaEdit.largo && parcelaEdit.ancho && (
                      <div className="bg-leaf-green/10 rounded-lg p-4">
                        <h4 className="font-semibold text-soil-dark mb-2">Vista previa:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-700">Área total:</span>
                            <span className="font-bold text-leaf-green">
                              {((parseFloat(parcelaEdit.largo) * parseFloat(parcelaEdit.ancho)) / 10000).toFixed(2)} m²
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700">Dimensiones:</span>
                            <span className="text-gray-800 font-medium">{parcelaEdit.largo} × {parcelaEdit.ancho} cm</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={() => {
                        if (parcelaEdit.nombre && parcelaEdit.largo && parcelaEdit.ancho) {
                          const nuevaParcela = {
                            nombre: parcelaEdit.nombre,
                            largo: parseFloat(parcelaEdit.largo),
                            ancho: parseFloat(parcelaEdit.ancho),
                            cultivo: parcelaEdit.cultivo || 'Sin asignar'
                          }
                          
                          setFormData(prev => ({
                            ...prev,
                            parcelas: [...(prev.parcelas || []), nuevaParcela]
                          }))
                          
                          // Limpiar formulario
                          setParcelaEdit({
                            nombre: '',
                            largo: '',
                            ancho: '',
                            cultivo: ''
                          })
                        }
                      }}
                      disabled={!parcelaEdit.nombre || !parcelaEdit.largo || !parcelaEdit.ancho}
                      className="w-full bg-leaf-green text-white px-4 py-3 rounded-lg hover:bg-leaf-green/90 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
                    >
                      ➕ Agregar Parcela
                    </button>
                  </div>
                </div>
                
                {/* Lista de parcelas creadas */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-soil-dark mb-4">
                    📋 Tus Parcelas ({(formData.parcelas || []).length})
                  </h3>
                  
                  {(formData.parcelas || []).length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-3">🌱</div>
                      <p>Aún no has creado parcelas.</p>
                      <p className="text-sm">Usa el formulario de la izquierda para agregar tu primera parcela.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {(formData.parcelas || []).map((parcela, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{parcela.nombre}</h4>
                              <p className="text-sm text-gray-600">
                                Cultivo: {parcela.cultivo.charAt(0).toUpperCase() + parcela.cultivo.slice(1).replace('-', ' ')}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  parcelas: (prev.parcelas || []).filter((_, i) => i !== index)
                                }))
                              }}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              🗑️
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-800 font-medium">Área:</span>
                              <div className="font-bold text-leaf-green">
                                {((parcela.largo * parcela.ancho) / 10000).toFixed(2)} m²
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-800 font-medium">Dimensiones:</span>
                              <div className="font-semibold text-gray-900">
                                {parcela.largo} × {parcela.ancho} cm
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Resumen total */}
                      <div className="bg-leaf-green/10 rounded-lg p-4 border-2 border-leaf-green/20">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Área total de cultivo:</div>
                          <div className="text-xl font-bold text-leaf-green">
                            {(formData.parcelas || []).reduce((total, parcela) => 
                              total + ((parcela.largo * parcela.ancho) / 10000), 0
                            ).toFixed(2)} m²
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Paso 9: Resumen final */}
          {paso === 9 && (
            <div className="text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold text-soil-dark mb-4">
                ¡Tu huerta está lista para comenzar!
              </h2>
              
              <div className="bg-leaf-green/10 rounded-lg p-6 mb-8 text-left max-w-4xl mx-auto">
                <h3 className="font-semibold text-soil-dark mb-4">📋 Resumen de tu plan:</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Información del jardinero */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-leaf-green">👤</span>
                      <span><strong>Jardinero:</strong> {formData.nombre} ({formData.experiencia})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-leaf-green">📏</span>
                      <span><strong>Espacio:</strong> {formData.espacio}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-leaf-green">☀️</span>
                      <span><strong>Luz:</strong> {formData.ubicacion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-leaf-green">⏰</span>
                      <span><strong>Tiempo:</strong> {formData.tiempo} por semana</span>
                    </div>
                  </div>
                  
                  {/* Parcelas creadas */}
                  <div>
                    <h4 className="font-semibold text-soil-dark mb-3 flex items-center gap-2">
                      <span className="text-leaf-green">🗂️</span>
                      Parcelas creadas ({(formData.parcelas || []).length})
                    </h4>
                    {(formData.parcelas || []).length === 0 ? (
                      <p className="text-sm text-gray-600 italic">No se crearon parcelas</p>
                    ) : (
                      <div className="space-y-2">
                        {(formData.parcelas || []).slice(0, 3).map((parcela, index) => (
                          <div key={index} className="bg-white rounded p-3 text-sm border border-gray-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-semibold text-gray-900">{parcela.nombre}</div>
                                <div className="text-gray-600">{parcela.cultivo.replace('-', ' ')}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-leaf-green">
                                  {((parcela.largo * parcela.ancho) / 10000).toFixed(2)} m²
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="bg-leaf-green/20 rounded p-2 text-sm text-center border-2 border-leaf-green/40">
                          <strong>Área total: {(formData.parcelas || []).reduce((total, parcela) => 
                            total + ((parcela.largo * parcela.ancho) / 10000), 0
                          ).toFixed(2)} m²</strong>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={async () => {
                    if (!(session?.user as any)?.id) return
                    
                    try {
                      console.log('🚀 Enviando datos del onboarding:', formData)
                      
                      // Incluir parcelas creadas en el paso 8
                      const datosCompletos = {
                        ...formData,
                        parcelas_creadas_manual: formData.parcelas || [] // Parcelas del paso 8
                      }
                      
                      // Guardar onboarding en BD
                      const response = await fetch('/api/onboarding', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          usuario_id: (session?.user as any)?.id,
                          completado: true,
                          paso_actual: 9,
                          datos: datosCompletos
                        })
                      })
                      
                      const result = await response.json()
                      console.log('📨 Respuesta del servidor:', result)

                      if (response.ok && result.success) {
                        console.log('✅ Onboarding guardado correctamente')
                        const parcelasCreadas = result.parcelas_creadas?.length || 0
                        console.log(`🌱 Se crearon ${parcelasCreadas} parcela(s)`)
                        
                        // También mantener en localStorage como backup
                        localStorage.setItem('greenrouse-onboarding', JSON.stringify(datosCompletos))
                        
                        // Mostrar mensaje de éxito
                        if (parcelasCreadas > 0) {
                          alert(`¡Perfecto! Se han creado ${parcelasCreadas} parcela(s) basadas en tu configuración.`)
                        }
                        
                        // Redirigir a parcelas
                        router.push('/parcelas?from=onboarding')
                      } else {
                        throw new Error(result.error || 'Error desconocido')
                      }
                    } catch (error) {
                      console.error('❌ Error guardando onboarding:', error)
                      // En caso de error, usar localStorage y continuar
                      localStorage.setItem('greenrouse-onboarding', JSON.stringify(formData))
                      alert('Hubo un problema guardando tu información, pero continuaremos con el proceso.')
                      router.push('/parcelas?from=onboarding')
                    }
                  }}
                  className="bg-leaf-green text-white px-6 py-4 rounded-lg hover:bg-leaf-green/90 transition-colors font-semibold"
                >
                  🌿 Crear Mis Parcelas
                </button>
                <Link
                  href="/calculadora"
                  className="bg-sage-green text-white px-6 py-4 rounded-lg hover:bg-sage-green/90 transition-colors font-semibold text-center"
                >
                  🧮 Usar Calculadora
                </Link>
                <Link
                  href="/cursos"
                  className="border-2 border-leaf-green text-leaf-green px-6 py-4 rounded-lg hover:bg-leaf-green hover:text-white transition-colors font-semibold text-center"
                >
                  📚 Explorar Cursos
                </Link>
                <Link
                  href="/proveedores"
                  className="border-2 border-sage-green text-sage-green px-6 py-4 rounded-lg hover:bg-sage-green hover:text-white transition-colors font-semibold text-center"
                >
                  🏪 Buscar Proveedores
                </Link>
              </div>

              <p className="text-gray-600 text-sm">
                ¡Felicitaciones! Ya tienes todo listo para comenzar tu aventura en la agricultura orgánica.
              </p>
            </div>
          )}

          {/* Navegación */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={prevPaso}
              disabled={paso === 1}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>

            {paso < totalPasos ? (
              <button
                onClick={paso === 8 ? async () => {
                  // Función de guardar para el paso 8
                  if (!(session?.user as any)?.id) return
                  
                  try {
                    console.log('🚀 Enviando datos del onboarding desde paso 8:', formData)
                    
                    // Incluir parcelas creadas en el paso 8
                    const datosCompletos = {
                      ...formData,
                      parcelas_creadas_manual: formData.parcelas || []
                    }
                    
                    // Guardar onboarding en BD
                    const response = await fetch('/api/onboarding', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        usuario_id: (session?.user as any)?.id,
                        completado: true,
                        paso_actual: 9,
                        datos: datosCompletos
                      })
                    })
                    
                    const result = await response.json()
                    console.log('📨 Respuesta del servidor:', result)

                    if (response.ok && result.success) {
                      console.log('✅ Onboarding guardado correctamente')
                      const parcelasCreadas = result.parcelas_creadas?.length || 0
                      console.log(`🌱 Se crearon ${parcelasCreadas} parcela(s)`)
                      
                      // También mantener en localStorage como backup
                      localStorage.setItem('greenrouse-onboarding', JSON.stringify(datosCompletos))
                      
                      // Mostrar mensaje de éxito
                      if (parcelasCreadas > 0) {
                        alert(`¡Perfecto! Se han creado ${parcelasCreadas} parcela(s) basadas en tu configuración.`)
                      }
                      
                      // Redirigir a parcelas
                      router.push('/parcelas?from=onboarding')
                    } else {
                      throw new Error(result.error || 'Error desconocido')
                    }
                  } catch (error) {
                    console.error('❌ Error guardando onboarding:', error)
                    alert('Hubo un problema guardando tu información. Inténtalo de nuevo.')
                  }
                } : nextPaso}
                disabled={
                  (paso === 1 && !formData.nombre) ||
                  (paso === 2 && !formData.experiencia) ||
                  (paso === 3 && !formData.espacio) ||
                  (paso === 4 && !formData.ubicacion) ||
                  (paso === 5 && formData.objetivos.length === 0) ||
                  (paso === 6 && !formData.tiempo) ||
                  (paso === 8 && (!formData.parcelas || formData.parcelas.length === 0))
                }
                className="px-6 py-2 bg-leaf-green text-white rounded-lg hover:bg-leaf-green/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {paso === 8 ? '💾 Guardar Parcelas' : 'Siguiente →'}
              </button>
            ) : null}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}