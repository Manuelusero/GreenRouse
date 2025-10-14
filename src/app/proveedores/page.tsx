'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'

const proveedores = [
  {
    id: 1,
    nombre: 'Semillas Orgánicas del Valle',
    categoria: 'Semillas',
    ubicacion: 'San Isidro, Buenos Aires',
    distancia: '5.2 km',
    rating: 4.8,
    reviews: 127,
    telefono: '+54 11 4722-3456',
    email: 'info@semillasdelvalle.com.ar',
    horarios: 'Lun-Vie: 9:00-18:00, Sáb: 9:00-13:00',
    descripcion: 'Especialistas en semillas orgánicas certificadas. Ofrecemos variedades locales y exóticas.',
    productos: ['Semillas de Hortalizas', 'Semillas Aromáticas', 'Abonos Orgánicos'],
    precio: '$$',
    destacado: true,
    coordenadas: { lat: -34.470, lng: -58.513 }
  },
  {
    id: 2,
    nombre: 'Vivero La Tierra Verde',
    categoria: 'Vivero',
    ubicacion: 'Villa Urquiza, CABA',
    distancia: '8.7 km',
    rating: 4.6,
    reviews: 89,
    telefono: '+54 11 4521-7890',
    email: 'contacto@tierraverde.com',
    horarios: 'Lun-Dom: 8:00-19:00',
    descripcion: 'Vivero familiar con más de 20 años de experiencia en plantas orgánicas y sustentables.',
    productos: ['Plantines Orgánicos', 'Herramientas', 'Macetas Biodegradables'],
    precio: '$$$',
    destacado: false,
    coordenadas: { lat: -34.575, lng: -58.484 }
  },
  {
    id: 3,
    nombre: 'Huerta Urbana Supplies',
    categoria: 'Herramientas',
    ubicacion: 'Palermo, CABA',
    distancia: '12.1 km',
    rating: 4.9,
    reviews: 203,
    telefono: '+54 11 4833-1234',
    email: 'ventas@huertaurbana.com',
    horarios: 'Lun-Sáb: 10:00-20:00',
    descripcion: 'Todo lo que necesitas para tu huerta urbana. Especialistas en espacios pequeños.',
    productos: ['Sistemas de Riego', 'Contenedores', 'Kits de Inicio'],
    precio: '$$',
    destacado: true,
    coordenadas: { lat: -34.588, lng: -58.420 }
  },
  {
    id: 4,
    nombre: 'Composta y Más',
    categoria: 'Fertilizantes',
    ubicacion: 'San Telmo, CABA',
    distancia: '15.3 km',
    rating: 4.4,
    reviews: 56,
    telefono: '+54 11 4362-9876',
    email: 'info@compostaymas.com.ar',
    horarios: 'Mar-Dom: 9:00-17:00',
    descripcion: 'Productores artesanales de compost y fertilizantes orgánicos de primera calidad.',
    productos: ['Compost Premium', 'Humus de Lombriz', 'Bokashi'],
    precio: '$',
    destacado: false,
    coordenadas: { lat: -34.621, lng: -58.373 }
  },
  {
    id: 5,
    nombre: 'Permacultura Buenos Aires',
    categoria: 'Educación',
    ubicacion: 'Belgrano, CABA',
    distancia: '18.9 km',
    rating: 5.0,
    reviews: 34,
    telefono: '+54 11 4784-5432',
    email: 'cursos@permaculturabsas.org',
    horarios: 'Lun-Vie: 14:00-20:00',
    descripcion: 'Centro educativo especializado en permacultura y agricultura regenerativa.',
    productos: ['Cursos Presenciales', 'Workshops', 'Consultorías'],
    precio: '$$$$',
    destacado: true,
    coordenadas: { lat: -34.563, lng: -58.453 }
  },
  {
    id: 6,
    nombre: 'Mercado Verde Orgánico',
    categoria: 'Mercado',
    ubicacion: 'Recoleta, CABA',
    distancia: '22.4 km',
    rating: 4.7,
    reviews: 145,
    telefono: '+54 11 4801-2468',
    email: 'info@mercadoverde.com',
    horarios: 'Sáb-Dom: 8:00-16:00',
    descripcion: 'Mercado de productores locales con productos frescos y orgánicos cada fin de semana.',
    productos: ['Productos Frescos', 'Conservas Artesanales', 'Plantas Medicinales'],
    precio: '$$',
    destacado: false,
    coordenadas: { lat: -34.593, lng: -58.393 }
  }
]

const categorias = ['Todas', 'Semillas', 'Vivero', 'Herramientas', 'Fertilizantes', 'Educación', 'Mercado']
const rangosPrecios = ['Todos', '$', '$$', '$$$', '$$$$']

export default function ProveedoresPage() {
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [precioFiltro, setPrecioFiltro] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [ordenPor, setOrdenPor] = useState('distancia')
  const [vistaActual, setVistaActual] = useState('lista') // 'lista' o 'mapa'

  // Filtrar proveedores
  const proveedoresFiltrados = proveedores
    .filter(proveedor => {
      const coincideBusqueda = proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             proveedor.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      const coincideCategoria = categoriaFiltro === 'Todas' || proveedor.categoria === categoriaFiltro
      const coincidePrecio = precioFiltro === 'Todos' || proveedor.precio === precioFiltro
      
      return coincideBusqueda && coincideCategoria && coincidePrecio
    })
    .sort((a, b) => {
      if (ordenPor === 'distancia') return parseFloat(a.distancia) - parseFloat(b.distancia)
      if (ordenPor === 'rating') return b.rating - a.rating
      if (ordenPor === 'nombre') return a.nombre.localeCompare(b.nombre)
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero section */}
      <section className="bg-gradient-to-r from-earth-brown to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Proveedores Locales</h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Encuentra todo lo que necesitas para tu huerta cerca de casa y apoya el comercio local
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="Buscar proveedores..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
              />
            </div>

            {/* Category filter */}
            <select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
            >
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>

            {/* Price filter */}
            <select
              value={precioFiltro}
              onChange={(e) => setPrecioFiltro(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
            >
              {rangosPrecios.map(precio => (
                <option key={precio} value={precio}>{precio === 'Todos' ? 'Todos los precios' : precio}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={ordenPor}
              onChange={(e) => setOrdenPor(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
            >
              <option value="distancia">Más cercano</option>
              <option value="rating">Mejor puntuado</option>
              <option value="nombre">Nombre A-Z</option>
            </select>
          </div>

          {/* View toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{proveedoresFiltrados.length} proveedores encontrados</span>
              {categoriaFiltro !== 'Todas' && (
                <span className="bg-leaf-green/10 text-leaf-green px-3 py-1 rounded-full text-sm">
                  {categoriaFiltro}
                </span>
              )}
            </div>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setVistaActual('lista')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  vistaActual === 'lista' 
                    ? 'bg-white text-leaf-green shadow-sm' 
                    : 'text-gray-600 hover:text-leaf-green'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setVistaActual('mapa')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  vistaActual === 'mapa' 
                    ? 'bg-white text-leaf-green shadow-sm' 
                    : 'text-gray-600 hover:text-leaf-green'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {vistaActual === 'lista' ? (
          // Lista de proveedores
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {proveedoresFiltrados.map((proveedor) => (
              <div key={proveedor.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                {proveedor.destacado && (
                  <div className="bg-gradient-to-r from-sunrise-orange to-yellow-500 text-white text-center py-2 text-sm font-medium rounded-t-xl">
                    ⭐ Proveedor Destacado
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-soil-dark mb-1">{proveedor.nombre}</h3>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {proveedor.ubicacion} • {proveedor.distancia}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium">{proveedor.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({proveedor.reviews})</span>
                      </div>
                      <div className="text-leaf-green font-medium">{proveedor.precio}</div>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      proveedor.categoria === 'Semillas' ? 'bg-green-100 text-green-700' :
                      proveedor.categoria === 'Vivero' ? 'bg-blue-100 text-blue-700' :
                      proveedor.categoria === 'Herramientas' ? 'bg-gray-100 text-gray-700' :
                      proveedor.categoria === 'Fertilizantes' ? 'bg-yellow-100 text-yellow-700' :
                      proveedor.categoria === 'Educación' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {proveedor.categoria}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{proveedor.descripcion}</p>

                  <div className="mb-4">
                    <h4 className="font-medium text-soil-dark mb-2">Productos y servicios:</h4>
                    <div className="flex flex-wrap gap-2">
                      {proveedor.productos.map((producto, index) => (
                        <span key={index} className="bg-sage-green/10 text-sage-green px-2 py-1 rounded text-sm">
                          {producto}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {proveedor.telefono}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {proveedor.horarios}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-leaf-green text-white py-2 rounded-lg hover:bg-sage-green transition-colors font-medium">
                      Ver Detalles
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Vista de mapa (placeholder)
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-leaf-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-leaf-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-soil-dark mb-2">Vista de Mapa</h3>
            <p className="text-gray-600 mb-6">
              La vista de mapa interactivo estará disponible próximamente. Integraremos Google Maps para mostrar la ubicación exacta de todos los proveedores.
            </p>
            <button 
              onClick={() => setVistaActual('lista')}
              className="bg-leaf-green text-white px-6 py-2 rounded-lg hover:bg-sage-green transition-colors"
            >
              Volver a la Lista
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-leaf-green to-sage-green rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Eres un Proveedor Local?
          </h3>
          <p className="text-lg text-green-100 mb-8">
            Únete a nuestra red de proveedores y llega a miles de horticultores comprometidos con la agricultura sostenible
          </p>
          <button className="bg-white text-leaf-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Registrar mi Negocio
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}