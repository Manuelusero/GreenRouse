import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const articulos = [
  {
    id: 1,
    titulo: 'Cómo Preparar el Suelo para la Temporada de Primavera',
    extracto: 'La preparación adecuada del suelo es fundamental para una temporada exitosa. Te enseñamos los pasos esenciales.',
    autor: 'María González',
    fecha: '2024-10-10',
    categoria: 'Suelos',
    tiempoLectura: '5 min',
    imagen: 'suelo-primavera',
    tags: ['Preparación', 'Primavera', 'Suelos']
  },
  {
    id: 2,
    titulo: 'Los Mejores Cultivos para Principiantes',
    extracto: 'Si estás empezando tu huerta, estos cultivos son perfectos para ganar experiencia y confianza.',
    autor: 'Carlos Ruiz',
    fecha: '2024-10-08',
    categoria: 'Para Principiantes',
    tiempoLectura: '7 min',
    imagen: 'cultivos-principiantes',
    tags: ['Principiantes', 'Cultivos', 'Guía']
  },
  {
    id: 3,
    titulo: 'Control Natural de Pulgones en Tomates',
    extracto: 'Los pulgones pueden arruinar tu cosecha de tomates. Descubre métodos naturales y efectivos para controlarlos.',
    autor: 'Ana Martínez',
    fecha: '2024-10-05',
    categoria: 'Control de Plagas',
    tiempoLectura: '6 min',
    imagen: 'pulgones-tomates',
    tags: ['Plagas', 'Tomates', 'Control Natural']
  },
  {
    id: 4,
    titulo: 'Calendario Lunar para Siembras de Octubre',
    extracto: 'Aprovecha las fases lunares para maximizar el crecimiento de tus cultivos este octubre.',
    autor: 'Luis Fernández',
    fecha: '2024-10-01',
    categoria: 'Calendario Lunar',
    tiempoLectura: '4 min',
    imagen: 'calendario-lunar',
    tags: ['Luna', 'Calendario', 'Octubre']
  },
  {
    id: 5,
    titulo: 'Compostaje en Espacios Pequeños',
    extracto: 'No necesitas un gran jardín para hacer compost. Te mostramos técnicas para espacios reducidos.',
    autor: 'Patricia Silva',
    fecha: '2024-09-28',
    categoria: 'Compostaje',
    tiempoLectura: '8 min',
    imagen: 'compost-pequeño',
    tags: ['Compost', 'Espacios Pequeños', 'Reciclaje']
  },
  {
    id: 6,
    titulo: 'Plantas Compañeras: La Guía Completa',
    extracto: 'Descubre qué plantas se benefician mutuamente y cómo crear asociaciones exitosas en tu huerta.',
    autor: 'Roberto García',
    fecha: '2024-09-25',
    categoria: 'Asociación de Cultivos',
    tiempoLectura: '10 min',
    imagen: 'plantas-companeras',
    tags: ['Asociación', 'Cultivos', 'Biodiversidad']
  }
]

const categorias = [
  'Todas', 'Suelos', 'Para Principiantes', 'Control de Plagas', 
  'Calendario Lunar', 'Compostaje', 'Asociación de Cultivos'
]

const articulosDestacados = articulos.slice(0, 3)

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero section */}
      <section className="bg-gradient-to-r from-sage-green to-leaf-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl font-bold mb-4">Blog GreenRouse</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Descubre consejos, técnicas y secretos para crear la huerta orgánica de tus sueños
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-soil-dark mb-8">Artículos Destacados</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {articulosDestacados.map((articulo, index) => (
              <Link 
                href={`/blog/${articulo.id}`}
                key={articulo.id}
                className={`group ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden h-full">
                  <div className={`bg-gradient-to-br from-leaf-green to-sage-green relative ${
                    index === 0 ? 'h-64 lg:h-80' : 'h-48'
                  }`}>
                    <div className="absolute inset-0 earth-pattern opacity-20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                        {articulo.categoria}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`p-6 ${index === 0 ? 'lg:p-8' : ''}`}>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{articulo.autor}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(articulo.fecha).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{articulo.tiempoLectura}</span>
                    </div>
                    
                    <h3 className={`font-bold text-soil-dark group-hover:text-leaf-green transition-colors mb-3 ${
                      index === 0 ? 'text-xl lg:text-2xl' : 'text-lg'
                    }`}>
                      {articulo.titulo}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {articulo.extracto}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {articulo.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="bg-sage-green/10 text-sage-green px-2 py-1 rounded text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Filter categories */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-4">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  categoria === 'Todas' 
                    ? 'bg-leaf-green text-white' 
                    : 'bg-white text-gray-700 hover:bg-sage-green hover:text-white'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </section>

        {/* All articles */}
        <section>
          <h2 className="text-2xl font-bold text-soil-dark mb-8">Todos los Artículos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articulos.map((articulo) => (
              <Link 
                href={`/blog/${articulo.id}`}
                key={articulo.id}
                className="group"
              >
                <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden h-full">
                  <div className="h-48 bg-gradient-to-br from-sage-green to-leaf-green relative">
                    <div className="absolute inset-0 earth-pattern opacity-20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                        {articulo.categoria}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{articulo.autor}</span>
                      <span className="mx-2">•</span>
                      <span>{articulo.tiempoLectura}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-soil-dark group-hover:text-leaf-green transition-colors mb-3">
                      {articulo.titulo}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {articulo.extracto}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {articulo.tags.slice(0, 2).map((tag) => (
                          <span 
                            key={tag}
                            className="bg-sage-green/10 text-sage-green px-2 py-1 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(articulo.fecha).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter subscription */}
        <section className="mt-16 bg-gradient-to-r from-leaf-green to-sage-green rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Mantente Actualizado
          </h3>
          <p className="text-lg mb-8 text-green-100">
            Recibe los mejores consejos de jardinería directamente en tu email
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Tu email" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-leaf-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Suscribirse
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}