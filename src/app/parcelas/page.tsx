import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

// Datos de ejemplo para las parcelas
const parcelas = [
  {
    id: 1,
    nombre: 'Parcela Norte',
    area: 25,
    cultivos: ['Tomates', 'Lechugas', 'Zanahorias'],
    fechaSiembra: '2024-09-15',
    estado: 'Creciendo',
    riego: 'Cada 2 días'
  },
  {
    id: 2,
    nombre: 'Parcela Sur',
    area: 18,
    cultivos: ['Acelgas', 'Rúcula', 'Rabanitos'],
    fechaSiembra: '2024-10-01',
    estado: 'Plantado',
    riego: 'Diario'
  },
  {
    id: 3,
    nombre: 'Parcela Oeste',
    area: 30,
    cultivos: ['Calabazas', 'Choclos', 'Porotos'],
    fechaSiembra: '2024-08-20',
    estado: 'Madurando',
    riego: 'Cada 3 días'
  }
]

export default function ParcelasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-soil-dark mb-2">Mis Parcelas</h1>
            <p className="text-gray-600">Gestiona tus cultivos y monitorea el progreso de tu huerta</p>
          </div>
          <button className="bg-leaf-green text-white px-6 py-3 rounded-lg hover:bg-sage-green transition-colors font-semibold">
            + Nueva Parcela
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Parcelas</p>
                <p className="text-2xl font-bold text-soil-dark">{parcelas.length}</p>
              </div>
              <div className="w-12 h-12 bg-leaf-green/10 rounded-lg flex items-center justify-center">
                <span className="text-xl">🌱</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Área Total</p>
                <p className="text-2xl font-bold text-soil-dark">{parcelas.reduce((acc, p) => acc + p.area, 0)} m²</p>
              </div>
              <div className="w-12 h-12 bg-sunrise-orange/10 rounded-lg flex items-center justify-center">
                <span className="text-xl">📏</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Cultivos Activos</p>
                <p className="text-2xl font-bold text-soil-dark">{parcelas.reduce((acc, p) => acc + p.cultivos.length, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-sage-green/10 rounded-lg flex items-center justify-center">
                <span className="text-xl">🥬</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Próxima Cosecha</p>
                <p className="text-2xl font-bold text-soil-dark">15 días</p>
              </div>
              <div className="w-12 h-12 bg-sky-blue/10 rounded-lg flex items-center justify-center">
                <span className="text-xl">🗓️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Parcelas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parcelas.map((parcela) => (
            <div key={parcela.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-leaf-green to-sage-green relative">
                <div className="absolute inset-0 earth-pattern opacity-20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{parcela.nombre}</h3>
                  <p className="text-green-100">{parcela.area} m²</p>
                </div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  parcela.estado === 'Creciendo' ? 'bg-yellow-100 text-yellow-800' :
                  parcela.estado === 'Plantado' ? 'bg-green-100 text-green-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {parcela.estado}
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-soil-dark mb-2">Cultivos Actuales</h4>
                  <div className="flex flex-wrap gap-2">
                    {parcela.cultivos.map((cultivo, index) => (
                      <span key={index} className="bg-sage-green/10 text-sage-green px-3 py-1 rounded-full text-sm">
                        {cultivo}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Fecha de siembra:</span>
                    <span className="font-medium">{new Date(parcela.fechaSiembra).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Riego:</span>
                    <span className="font-medium">{parcela.riego}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Link 
                    href={`/parcelas/${parcela.id}`}
                    className="flex-1 bg-leaf-green text-white text-center py-2 rounded-lg hover:bg-sage-green transition-colors text-sm font-medium"
                  >
                    Ver Detalles
                  </Link>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add new parcela card */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-leaf-green transition-colors cursor-pointer group">
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 group-hover:bg-leaf-green/10 rounded-full flex items-center justify-center mb-4 transition-colors">
                <svg className="w-8 h-8 text-gray-400 group-hover:text-leaf-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 group-hover:text-leaf-green transition-colors mb-2">
                Nueva Parcela
              </h3>
              <p className="text-gray-500 text-sm">
                Agrega una nueva parcela a tu huerta
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}