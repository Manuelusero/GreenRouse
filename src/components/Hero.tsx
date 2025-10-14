import Link from 'next/link'

export default function Hero() {
  return (
    <section className="garden-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 earth-pattern opacity-10"></div>
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Cultiva tu Futuro Sostenible
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-green-100">
          Gestiona tus huertas orgánicas, aprende permacultura y conecta con una comunidad comprometida con la agricultura sostenible
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/comenzar" className="bg-white text-leaf-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Comenzar mi Huerta
          </Link>
          <Link href="/cursos" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-leaf-green transition-colors">
            Explorar Cursos
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="text-lg font-semibold mb-2">Gestión de Parcelas</h3>
            <p className="text-green-100">Planifica y organiza tus cultivos de forma eficiente</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="text-lg font-semibold mb-2">Educación</h3>
            <p className="text-green-100">Aprende técnicas de permacultura y agricultura sostenible</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-lg font-semibold mb-2">Comunidad</h3>
            <p className="text-green-100">Conecta con proveedores y otros agricultores locales</p>
          </div>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-white/25 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
    </section>
  )
}