'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'

// Datos del calendario lunar para octubre-noviembre 2024
const fasesLunares = [
  { fecha: '2024-10-14', fase: 'Luna Nueva', tipo: 'nueva', descripcion: 'Ideal para siembras de raíz' },
  { fecha: '2024-10-22', fase: 'Cuarto Creciente', tipo: 'creciente', descripcion: 'Perfecto para hojas verdes' },
  { fecha: '2024-10-28', fase: 'Luna Llena', tipo: 'llena', descripcion: 'Momento de cosecha' },
  { fecha: '2024-11-05', fase: 'Cuarto Menguante', tipo: 'menguante', descripcion: 'Poda y preparación' },
  { fecha: '2024-11-13', fase: 'Luna Nueva', tipo: 'nueva', descripcion: 'Nuevo ciclo de siembras' }
]

const cultivos = [
  {
    nombre: 'Lechugas',
    categoria: 'Hojas',
    faseOptima: 'creciente',
    mesesSiembra: ['Marzo', 'Abril', 'Mayo', 'Septiembre', 'Octubre'],
    diasCosecha: 60,
    consejos: 'Sembrar en cuarto creciente para mayor desarrollo foliar'
  },
  {
    nombre: 'Zanahorias',
    categoria: 'Raíz',
    faseOptima: 'nueva',
    mesesSiembra: ['Marzo', 'Abril', 'Agosto', 'Septiembre'],
    diasCosecha: 90,
    consejos: 'Luna nueva favorece el desarrollo de raíces fuertes'
  },
  {
    nombre: 'Tomates',
    categoria: 'Frutos',
    faseOptima: 'creciente',
    mesesSiembra: ['Agosto', 'Septiembre', 'Octubre'],
    diasCosecha: 80,
    consejos: 'Trasplantar en cuarto creciente, cosechar en luna llena'
  },
  {
    nombre: 'Espinacas',
    categoria: 'Hojas',
    faseOptima: 'creciente',
    mesesSiembra: ['Marzo', 'Abril', 'Mayo', 'Agosto', 'Septiembre'],
    diasCosecha: 45,
    consejos: 'Crecimiento rápido durante la luna creciente'
  },
  {
    nombre: 'Rabanitos',
    categoria: 'Raíz',
    faseOptima: 'nueva',
    mesesSiembra: ['Todo el año'],
    diasCosecha: 30,
    consejos: 'Siembra cada 15 días para cosecha continua'
  },
  {
    nombre: 'Albahaca',
    categoria: 'Aromáticas',
    faseOptima: 'creciente',
    mesesSiembra: ['Septiembre', 'Octubre', 'Noviembre'],
    diasCosecha: 45,
    consejos: 'Luna creciente intensifica los aceites esenciales'
  }
]

const actividades = [
  {
    fecha: '2024-10-15',
    actividad: 'Siembra de Lechugas',
    fase: 'Luna Nueva',
    tipo: 'siembra',
    descripcion: 'Momento ideal para sembrar lechugas de primavera'
  },
  {
    fecha: '2024-10-18',
    actividad: 'Transplante de Tomates',
    fase: 'Cuarto Creciente',
    tipo: 'transplante',
    descripcion: 'Trasplantar plantines de tomate al lugar definitivo'
  },
  {
    fecha: '2024-10-25',
    actividad: 'Cosecha de Aromáticas',
    fase: 'Luna Llena',
    tipo: 'cosecha',
    descripcion: 'Cosechar albahaca y otras aromáticas para secar'
  },
  {
    fecha: '2024-11-02',
    actividad: 'Poda de Rosales',
    fase: 'Cuarto Menguante',
    tipo: 'poda',
    descripcion: 'Podar rosales y arbustos ornamentales'
  }
]

export default function CalendarioPage() {
  const [mesSeleccionado, setMesSeleccionado] = useState('Octubre')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [mostrarInfo, setMostrarInfo] = useState(false)

  const cultivosFiltrados = cultivos.filter(cultivo => 
    categoriaFiltro === 'Todas' || cultivo.categoria === categoriaFiltro
  )

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const categoriasCultivo = ['Todas', 'Hojas', 'Raíz', 'Frutos', 'Aromáticas']

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Calendario Lunar de Siembra</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Programa tus siembras siguiendo los ciclos lunares para optimizar el crecimiento de tus cultivos
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Información lunar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-soil-dark">Fases Lunares Actuales</h2>
            <button
              onClick={() => setMostrarInfo(!mostrarInfo)}
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              {mostrarInfo ? 'Ocultar' : 'Mostrar'} información
            </button>
          </div>

          {mostrarInfo && (
            <div className="bg-indigo-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">Influencia Lunar en los Cultivos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>🌑 Luna Nueva:</strong> Ideal para sembrar plantas de raíz (zanahorias, rábanos, papas). La energía se concentra hacia abajo.
                </div>
                <div>
                  <strong>🌓 Cuarto Creciente:</strong> Perfecto para plantas de hojas (lechugas, espinacas, acelgas). Estimula el crecimiento aéreo.
                </div>
                <div>
                  <strong>🌕 Luna Llena:</strong> Momento de cosecha. Los frutos alcanzan su máximo sabor y las hojas tienen más nutrientes.
                </div>
                <div>
                  <strong>🌗 Cuarto Menguante:</strong> Época de poda, preparación del suelo y eliminación de plagas. Menor actividad vegetativa.
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fasesLunares.map((fase, index) => (
              <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-2">
                  {fase.tipo === 'nueva' && '🌑'}
                  {fase.tipo === 'creciente' && '🌓'}
                  {fase.tipo === 'llena' && '🌕'}
                  {fase.tipo === 'menguante' && '🌗'}
                </div>
                <h4 className="font-semibold text-soil-dark">{fase.fase}</h4>
                <p className="text-sm text-gray-500 mb-2">{new Date(fase.fecha).toLocaleDateString()}</p>
                <p className="text-xs text-gray-600">{fase.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mes de Siembra
              </label>
              <select
                value={mesSeleccionado}
                onChange={(e) => setMesSeleccionado(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {meses.map(mes => (
                  <option key={mes} value={mes}>{mes}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Cultivo
              </label>
              <select
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categoriasCultivo.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cultivos recomendados */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-soil-dark mb-6">Cultivos para {mesSeleccionado}</h3>
            
            <div className="space-y-4">
              {cultivosFiltrados
                .filter(cultivo => 
                  cultivo.mesesSiembra.includes(mesSeleccionado) || 
                  cultivo.mesesSiembra.includes('Todo el año')
                )
                .map((cultivo, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-soil-dark">{cultivo.nombre}</h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        cultivo.categoria === 'Hojas' ? 'bg-green-100 text-green-700' :
                        cultivo.categoria === 'Raíz' ? 'bg-orange-100 text-orange-700' :
                        cultivo.categoria === 'Frutos' ? 'bg-red-100 text-red-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {cultivo.categoria}
                      </span>
                    </div>
                    
                    <div className="text-right text-sm">
                      <div className="flex items-center text-indigo-600">
                        {cultivo.faseOptima === 'nueva' && '🌑'}
                        {cultivo.faseOptima === 'creciente' && '🌓'}
                        {cultivo.faseOptima === 'llena' && '🌕'}
                        {cultivo.faseOptima === 'menguante' && '🌗'}
                        <span className="ml-1">Fase óptima</span>
                      </div>
                      <div className="text-gray-500">{cultivo.diasCosecha} días</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{cultivo.consejos}</p>
                  
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors text-sm">
                      Agregar a mi Calendario
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actividades programadas */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-soil-dark mb-6">Actividades Programadas</h3>
            
            <div className="space-y-4">
              {actividades.map((actividad, index) => (
                <div key={index} className="flex items-start p-4 border border-gray-200 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    actividad.tipo === 'siembra' ? 'bg-green-100' :
                    actividad.tipo === 'transplante' ? 'bg-blue-100' :
                    actividad.tipo === 'cosecha' ? 'bg-yellow-100' :
                    'bg-purple-100'
                  }`}>
                    {actividad.tipo === 'siembra' && '🌱'}
                    {actividad.tipo === 'transplante' && '🌿'}
                    {actividad.tipo === 'cosecha' && '🥬'}
                    {actividad.tipo === 'poda' && '✂️'}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-soil-dark">{actividad.actividad}</h4>
                    <p className="text-sm text-gray-600 mb-1">{actividad.descripcion}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{new Date(actividad.fecha).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{actividad.fase}</span>
                    </div>
                  </div>
                  
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors font-semibold">
              + Agregar Nueva Actividad
            </button>
          </div>
        </div>

        {/* Consejos adicionales */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Consejos Lunares para tu Huerta
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h4 className="font-semibold mb-3">🌱 Mejores Prácticas</h4>
              <ul className="space-y-2 text-purple-100">
                <li>• Observa el clima además de la luna</li>
                <li>• Riega preferentemente en luna menguante</li>
                <li>• Cosecha frutas en luna llena para mejor sabor</li>
                <li>• Prepara compost en luna nueva</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">📅 Planificación</h4>
              <ul className="space-y-2 text-purple-100">
                <li>• Planifica con 2-3 ciclos lunares de anticipación</li>
                <li>• Considera las fechas de heladas locales</li>
                <li>• Adapta según tu zona climática</li>
                <li>• Registra tus observaciones</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}