'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import RecomendacionesInteligentes from './RecomendacionesInteligentes'

interface PerfilData {
  nombre: string
  experiencia: string
  espacio: string
  ubicacion: string
  objetivos: string[]
  tiempo: string
  tamaño: string
  ubicacionGeografica: string
  pais: string
  tipoEspacio: string[]
  plantasDeseadas: string[]
}

export default function PerfilClient() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [hasUserEdited, setHasUserEdited] = useState(false)
  
  const [formData, setFormData] = useState<PerfilData>({
    nombre: '',
    experiencia: '',
    espacio: '',
    ubicacion: '',
    objetivos: [],
    tiempo: '',
    tamaño: '',
    ubicacionGeografica: '',
    pais: '',
    tipoEspacio: [],
    plantasDeseadas: []
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }

    if (status === 'authenticated' && session?.user && !hasUserEdited) {
      // Cargar datos del perfil solo si el usuario no ha editado nada
      cargarPerfil()
    }
  }, [session, status, router, hasUserEdited])

  // Event listener para crear parcelas automáticamente
  useEffect(() => {
    const handleCrearParcelas = async (event: CustomEvent) => {
      if (!session?.user) return
      
      try {
        console.log('🚀 Iniciando creación automática de parcelas...')
        
        // Importar función de generación de parcelas
        const { generarParcelasAutomaticas } = await import('@/utils/geografia')
        
        // Preparar datos del perfil
        const perfilCompleto = {
          pais: formData.pais || 'argentina',
          tamaño: formData.tamaño || 'mediano',
          espacio: formData.espacio || 'jardin',
          objetivos: formData.objetivos || ['alimentos'],
          tiempo: formData.tiempo || 'moderado',
          experiencia: formData.experiencia || 'principiante',
          plantasDeseadas: formData.plantasDeseadas || []
        }
        
        console.log('📊 Perfil del usuario:', perfilCompleto)
        
        // Generar parcelas automáticamente
        const parcelasGeneradas = generarParcelasAutomaticas(perfilCompleto)
        
        console.log('🌱 Parcelas generadas:', parcelasGeneradas)
        
        // Crear cada parcela en la base de datos
        for (const parcela of parcelasGeneradas) {
          try {
            const response = await fetch('/api/parcelas', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                nombre: parcela.nombre,
                descripcion: parcela.descripcion,
                tipo: parcela.categoria,
                tamaño: formData.tamaño,
                ubicacion: formData.ubicacion,
                clima: 'automatico',
                objetivos: formData.objetivos,
                plantas_deseadas: parcela.cultivos,
                usuario_id: (session.user as any).id,
                configuracion_inicial: {
                  generado_automaticamente: true,
                  dificultad: parcela.dificultad,
                  tiempo_mantenimiento: parcela.tiempoMantenimiento,
                  categoria: parcela.categoria,
                  fecha_generacion: new Date()
                }
              })
            })
            
            if (response.ok) {
              console.log(`✅ Parcela "${parcela.nombre}" creada exitosamente`)
            } else {
              console.error(`❌ Error creando parcela "${parcela.nombre}"`)
            }
          } catch (error) {
            console.error(`❌ Error creando parcela "${parcela.nombre}":`, error)
          }
        }
        
        // Mostrar mensaje de éxito
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 5000)
        
        // Opcional: redirigir a la página de parcelas
        setTimeout(() => {
          router.push('/parcelas')
        }, 2000)
        
      } catch (error) {
        console.error('❌ Error en creación automática de parcelas:', error)
      }
    }

    window.addEventListener('crearParcelasAutomaticas', handleCrearParcelas as any)
    
    return () => {
      window.removeEventListener('crearParcelasAutomaticas', handleCrearParcelas as any)
    }
  }, [formData, session, router])

  const cargarPerfil = async () => {
    try {
      console.log('🔍 Cargando perfil para usuario:', (session?.user as any)?.id)
      
      const response = await fetch(`/api/onboarding?usuario_id=${(session?.user as any)?.id}`)
      
      console.log('📡 Respuesta del API onboarding:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('📊 Datos recibidos del onboarding:', data)
        
        if (data.success && data.data?.datos) {
          const datosOnboarding = data.data.datos
          
          console.log('📋 Datos del onboarding a mapear:', datosOnboarding)
          
          // Mapear los datos del onboarding al formato del perfil
          const nuevosDatos = {
            nombre: datosOnboarding.nombre || session?.user?.name || '',
            experiencia: datosOnboarding.experiencia || '',
            espacio: datosOnboarding.espacio || '',
            ubicacion: datosOnboarding.ubicacion || '',
            objetivos: datosOnboarding.objetivos || [],
            tiempo: datosOnboarding.tiempo || '',
            // Campos adicionales que pueden venir del onboarding o ser opcionales
            clima: datosOnboarding.clima || '',
            tamaño: datosOnboarding.tamaño || '',
            ubicacionGeografica: datosOnboarding.ubicacionGeografica || '',
            pais: datosOnboarding.pais || '',
            tipoEspacio: datosOnboarding.tipoEspacio || [],
            plantasDeseadas: datosOnboarding.plantasDeseadas || []
          }
          
          console.log('✅ Datos mapeados para el perfil:', nuevosDatos)
          setFormData(nuevosDatos)
        }
      } else if (response.status === 404) {
        console.log('❓ No se encontraron datos de onboarding (404)')
        // Si no hay datos de onboarding, usar valores por defecto con nombre del usuario
        setFormData(prev => ({
          ...prev,
          nombre: session?.user?.name || ''
        }))
      }
    } catch (error) {
      console.error('❌ Error cargando perfil:', error)
      // En caso de error, al menos poner el nombre del usuario
      setFormData(prev => ({
        ...prev,
        nombre: session?.user?.name || ''
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof PerfilData, value: string) => {
    console.log(`🔄 Cambiando ${field}:`, value)
    setHasUserEdited(true) // Marcar que el usuario ha editado algo
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayChange = (field: keyof PerfilData, value: string) => {
    setHasUserEdited(true) // Marcar que el usuario ha editado algo
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session?.user) return
    
    console.log('🚀 Enviando datos del perfil:', formData)
    setIsSaving(true)
    
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: (session.user as any).id,
          datos: formData,
          completado: true,
          paso_actual: 9
        })
      })

      const result = await response.json()
      console.log('📝 Respuesta del servidor:', result)

      if (response.ok) {
        setShowSuccess(true)
        setHasUserEdited(false) // Resetear flag de edición después de guardar exitosamente
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        console.error('❌ Error en la respuesta:', result)
      }
    } catch (error) {
      console.error('Error guardando perfil:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-leaf-green mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-leaf-green rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {session?.user?.name?.charAt(0) || '👤'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-soil-dark">Mi Perfil</h1>
              <p className="text-gray-600">Gestiona tu información personal y preferencias de cultivo</p>
            </div>
          </div>
        </div>

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <div className="text-green-500 text-xl">✅</div>
            <p className="text-green-800 font-semibold">Perfil actualizado correctamente</p>
          </div>
        )}

        {/* Mensaje informativo si no hay onboarding */}
        {!formData.experiencia && !isLoading && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3">
            <div className="text-blue-500 text-xl">💡</div>
            <div>
              <p className="text-blue-800 font-semibold">¿Primera vez aquí?</p>
              <p className="text-blue-700 text-sm">
                Completa el{' '}
                <a href="/comenzar" className="underline hover:text-blue-900">
                  onboarding inicial
                </a>
                {' '}para que podamos personalizar tu experiencia y crear tus parcelas automáticamente.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Personal */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-soil-dark mb-6">Información Personal</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">¿Cómo te gusta que te llamen?</label>
              <input
                type="text"
                value={formData.nombre || ''}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                placeholder="Tu nombre"
                autoComplete="name"
              />
            </div>
          </div>

          {/* Experiencia en Cultivo */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-soil-dark mb-6">¿Cuál es tu experiencia con la jardinería?</h2>
            
            <div className="space-y-4">
              {[
                { valor: 'principiante', titulo: 'Soy principiante', descripcion: 'Nunca he tenido una huerta antes', icono: '🌱' },
                { valor: 'basico', titulo: 'Algo de experiencia', descripcion: 'He tenido algunas plantas en macetas', icono: '🪴' },
                { valor: 'intermedio', titulo: 'Experiencia intermedia', descripcion: 'He manejado jardines pequeños antes', icono: '�' },
                { valor: 'avanzado', titulo: 'Bastante experiencia', descripcion: 'Tengo experiencia con huertas grandes', icono: '�' }
              ].map((opcion) => (
                <button
                  key={opcion.valor}
                  onClick={() => handleInputChange('experiencia', opcion.valor)}
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

          {/* Espacio Disponible */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-soil-dark mb-6">¿Cuánto espacio tienes disponible?</h2>
            
            <div className="space-y-4">
              {[
                { valor: 'balcon', titulo: 'Balcón o terraza', descripcion: 'Macetas y jardineras (1-5 m²)', icono: '🏠' },
                { valor: 'patio', titulo: 'Patio pequeño', descripcion: 'Espacio limitado (5-20 m²)', icono: '🏡' },
                { valor: 'jardin', titulo: 'Jardín mediano', descripcion: 'Buen espacio disponible (20-100 m²)', icono: '🌻' },
                { valor: 'terreno', titulo: 'Terreno grande', descripcion: 'Mucho espacio (100+ m²)', icono: '🚜' }
              ].map((opcion) => (
                <button
                  key={opcion.valor}
                  onClick={() => handleInputChange('espacio', opcion.valor)}
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

          {/* Ubicación de la Huerta */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-soil-dark mb-6">¿Dónde está ubicada tu huerta?</h2>
            
            <div className="space-y-4">
              {[
                { valor: 'interior', titulo: 'Interior (muy poca luz)', descripcion: 'Dentro de casa, luz artificial', icono: '💡' },
                { valor: 'sombra', titulo: 'Sombra parcial', descripcion: '2-4 horas de sol directo', icono: '⛅' },
                { valor: 'semisombra', titulo: 'Semi-sombra', descripcion: '4-6 horas de sol directo', icono: '�️' },
                { valor: 'sol', titulo: 'Sol directo', descripcion: '6+ horas de sol directo', icono: '☀️' }
              ].map((opcion) => (
                <button
                  key={opcion.valor}
                  onClick={() => handleInputChange('ubicacion', opcion.valor)}
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

          {/* Objetivos de Cultivo */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-soil-dark mb-6">¿Cuáles son tus objetivos? (Puedes elegir varios)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { valor: 'alimentos', titulo: 'Producir mis propios alimentos', icono: '�' },
                { valor: 'hierbas', titulo: 'Cultivar hierbas aromáticas', icono: '🌿' },
                { valor: 'flores', titulo: 'Tener flores hermosas', icono: '🌸' },
                { valor: 'medicina', titulo: 'Plantas medicinales', icono: '🌱' },
                { valor: 'hobby', titulo: 'Relajarme y divertirme', icono: '😌' },
                { valor: 'sostenible', titulo: 'Vivir más sostenible', icono: '♻️' }
              ].map((opcion) => (
                <button
                  key={opcion.valor}
                  onClick={() => handleArrayChange('objetivos', opcion.valor)}
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

          {/* Tiempo Disponible */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-soil-dark mb-6">¿Cuánto tiempo puedes dedicar por semana?</h2>
            
            <div className="space-y-4">
              {[
                { valor: 'poco', titulo: '30 minutos - 1 hora', descripcion: 'Solo lo básico', icono: '⏱️' },
                { valor: 'moderado', titulo: '1-3 horas', descripcion: 'Mantenimiento regular', icono: '🕐' },
                { valor: 'bastante', titulo: '3-5 horas', descripcion: 'Dedicación considerable', icono: '🕕' },
                { valor: 'mucho', titulo: '5+ horas', descripcion: 'Es mi pasión principal', icono: '❤️' }
              ].map((opcion) => (
                <button
                  key={opcion.valor}
                  onClick={() => handleInputChange('tiempo', opcion.valor)}
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

          {/* Información Adicional */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-soil-dark mb-6">Información Adicional</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño estimado de tu huerta</label>
                <select
                  value={formData.tamaño}
                  onChange={(e) => handleInputChange('tamaño', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="">Selecciona el tamaño</option>
                  <option value="pequeño">Pequeño (1-5 m²)</option>
                  <option value="mediano">Mediano (5-20 m²)</option>
                  <option value="grande">Grande (20-100 m²)</option>
                  <option value="muy-grande">Muy Grande (100+ m²)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                <select
                  value={formData.pais}
                  onChange={(e) => handleInputChange('pais', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="">Selecciona tu país</option>
                  {/* Hemisferio Norte */}
                  <option value="mexico">México</option>
                  <option value="estados-unidos">Estados Unidos</option>
                  <option value="canada">Canadá</option>
                  <option value="españa">España</option>
                  <option value="francia">Francia</option>
                  <option value="alemania">Alemania</option>
                  <option value="italia">Italia</option>
                  <option value="reino-unido">Reino Unido</option>
                  <option value="china">China</option>
                  <option value="japon">Japón</option>
                  {/* Hemisferio Sur */}
                  <option value="argentina">Argentina</option>
                  <option value="chile">Chile</option>
                  <option value="brasil">Brasil</option>
                  <option value="peru">Perú</option>
                  <option value="colombia">Colombia</option>
                  <option value="ecuador">Ecuador</option>
                  <option value="uruguay">Uruguay</option>
                  <option value="bolivia">Bolivia</option>
                  <option value="paraguay">Paraguay</option>
                  <option value="australia">Australia</option>
                  <option value="nueva-zelanda">Nueva Zelanda</option>
                  <option value="sudafrica">Sudáfrica</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación Geográfica</label>
                <input
                  type="text"
                  value={formData.ubicacionGeografica}
                  onChange={(e) => handleInputChange('ubicacionGeografica', e.target.value)}
                  placeholder="Ej: Ciudad de México, Monterrey, Buenos Aires..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
                />
              </div>
            </div>
            
            {/* Tipos de Espacio Adicionales */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Tipos de espacio adicionales disponibles</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'interior', label: 'Interior', emoji: '🏠' },
                  { value: 'balcon', label: 'Balcón', emoji: '🪴' },
                  { value: 'patio', label: 'Patio', emoji: '🏡' },
                  { value: 'exterior', label: 'Jardín/Terreno', emoji: '🌾' }
                ].map(option => (
                  <label key={option.value} className="cursor-pointer">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={formData.tipoEspacio.includes(option.value)}
                      onChange={() => handleArrayChange('tipoEspacio', option.value)}
                      className="sr-only"
                    />
                    <div className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      formData.tipoEspacio.includes(option.value)
                        ? 'border-leaf-green bg-leaf-green/10'
                        : 'border-gray-300 hover:border-leaf-green/50'
                    }`}>
                      <div className="text-2xl mb-1">{option.emoji}</div>
                      <div className="text-sm font-medium text-gray-800">{option.label}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Plantas Deseadas */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Plantas que te gustaría cultivar</label>
              <textarea
                value={formData.plantasDeseadas.join(', ')}
                onChange={(e) => {
                  setHasUserEdited(true)
                  setFormData(prev => ({
                    ...prev,
                    plantasDeseadas: e.target.value.split(', ').filter(p => p.trim())
                  }))
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-gray-900 bg-white"
                placeholder="Ej: tomates, lechugas, hierbas aromáticas, flores..."
                rows={3}
              />
              <p className="text-sm text-gray-500 mt-1">Separa cada planta con una coma</p>
            </div>

            {/* Recomendaciones Inteligentes */}
            <RecomendacionesInteligentes
              pais={formData.pais}
              tamaño={formData.tamaño}
              ubicacionGeografica={formData.ubicacionGeografica}
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-leaf-green text-white rounded-lg hover:bg-sage-green transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <span>Guardar Cambios</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}