import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const cursos = [
  {
    id: 1,
    titulo: 'Introducción a la Permacultura',
    instructor: 'María González',
    duracion: '4 semanas',
    nivel: 'Principiante',
    precio: 'Gratuito',
    descripcion: 'Aprende los principios básicos de la permacultura y cómo aplicarlos en tu huerta casera.',
    modulos: 8,
    estudiantes: 1250,
    rating: 4.8,
    imagen: 'permacultura-intro',
    categoria: 'Permacultura'
  },
  {
    id: 2,
    titulo: 'Compostaje y Fertilizantes Orgánicos',
    instructor: 'Carlos Ruiz',
    duracion: '3 semanas',
    nivel: 'Intermedio',
    precio: '$2500',
    descripcion: 'Domina las técnicas de compostaje y creación de fertilizantes naturales para tu huerta.',
    modulos: 6,
    estudiantes: 890,
    rating: 4.9,
    imagen: 'compostaje',
    categoria: 'Suelos'
  },
  {
    id: 3,
    titulo: 'Rotación de Cultivos Inteligente',
    instructor: 'Ana Martínez',
    duracion: '2 semanas',
    nivel: 'Intermedio',
    precio: '$1800',
    descripcion: 'Maximiza la productividad de tu huerta con técnicas avanzadas de rotación de cultivos.',
    modulos: 5,
    estudiantes: 567,
    rating: 4.7,
    imagen: 'rotacion',
    categoria: 'Planificación'
  },
  {
    id: 4,
    titulo: 'Control Biológico de Plagas',
    instructor: 'Luis Fernández',
    duracion: '3 semanas',
    nivel: 'Avanzado',
    precio: '$3200',
    descripcion: 'Controla las plagas de forma natural sin químicos dañinos para el ecosistema.',
    modulos: 7,
    estudiantes: 423,
    rating: 4.8,
    imagen: 'plagas',
    categoria: 'Protección'
  },
  {
    id: 5,
    titulo: 'Diseño de Huertas Sostenibles',
    instructor: 'Patricia Silva',
    duracion: '5 semanas',
    nivel: 'Intermedio',
    precio: '$4000',
    descripcion: 'Diseña tu huerta considerando la eficiencia del agua, la biodiversidad y la producción.',
    modulos: 10,
    estudiantes: 734,
    rating: 4.9,
    imagen: 'diseño',
    categoria: 'Diseño'
  },
  {
    id: 6,
    titulo: 'Semillas Criollas y Conservación',
    instructor: 'Roberto García',
    duracion: '2 semanas',
    nivel: 'Principiante',
    precio: 'Gratuito',
    descripcion: 'Aprende a seleccionar, guardar y conservar semillas para asegurar la biodiversidad.',
    modulos: 4,
    estudiantes: 1567,
    rating: 4.6,
    imagen: 'semillas',
    categoria: 'Semillas'
  }
]

const categorias = ['Todos', 'Permacultura', 'Suelos', 'Planificación', 'Protección', 'Diseño', 'Semillas']

export default function CursosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero section */}
      <section className="bg-gradient-to-r from-leaf-green to-sage-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Cursos de Permacultura</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Aprende de expertos y transforma tu huerta con técnicas sostenibles y naturales
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter section */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                categoria === 'Todos' 
                  ? 'bg-leaf-green text-white' 
                  : 'bg-white text-gray-700 hover:bg-sage-green hover:text-white'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-leaf-green mb-2">{cursos.length}</div>
            <div className="text-gray-600">Cursos Disponibles</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-leaf-green mb-2">12+</div>
            <div className="text-gray-600">Instructores Expertos</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-leaf-green mb-2">5,431</div>
            <div className="text-gray-600">Estudiantes Activos</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-leaf-green mb-2">4.8</div>
            <div className="text-gray-600">Puntuación Promedio</div>
          </div>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cursos.map((curso) => (
            <div key={curso.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
              {/* Course image placeholder */}
              <div className="h-48 bg-gradient-to-br from-sage-green to-leaf-green relative overflow-hidden">
                <div className="absolute inset-0 earth-pattern opacity-20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {curso.categoria}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    curso.precio === 'Gratuito' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-soil-dark'
                  }`}>
                    {curso.precio}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center text-white/80 text-sm space-x-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {curso.duracion}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {curso.modulos} módulos
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    curso.nivel === 'Principiante' ? 'bg-green-100 text-green-700' :
                    curso.nivel === 'Intermedio' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {curso.nivel}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {curso.rating}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-soil-dark mb-2 group-hover:text-leaf-green transition-colors">
                  {curso.titulo}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {curso.descripcion}
                </p>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {curso.instructor}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{curso.estudiantes.toLocaleString()} estudiantes</span>
                </div>

                <Link 
                  href={`/cursos/${curso.id}`}
                  className="block w-full bg-leaf-green text-white text-center py-3 rounded-lg hover:bg-sage-green transition-colors font-semibold"
                >
                  Ver Curso
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-16 bg-gradient-to-r from-sunrise-orange to-yellow-500 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Quieres Enseñar en GreenRouse?
          </h3>
          <p className="text-lg mb-8 text-orange-100">
            Comparte tu experiencia y ayuda a otros a crear huertas sostenibles
          </p>
          <button className="bg-white text-sunrise-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Convertirme en Instructor
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}