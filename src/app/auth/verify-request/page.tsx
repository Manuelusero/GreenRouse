'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function VerifyRequest() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📧</div>
            <h1 className="text-3xl font-bold text-soil-dark mb-4">
              ¡Email Enviado!
            </h1>
            <p className="text-gray-600">
              Te hemos enviado un enlace de verificación a tu email
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-leaf-green/10 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-soil-dark mb-3 flex items-center gap-2">
              <span className="text-leaf-green">📋</span>
              Próximos pasos:
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>1. Revisa tu bandeja de entrada</p>
              <p>2. Busca un email de <strong>noreply@greenrouse.app</strong></p>
              <p>3. Haz clic en "Confirmar mi email"</p>
              <p>4. ¡Serás redirigido automáticamente!</p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="text-yellow-400 text-xl mr-3">💡</div>
              <div>
                <h4 className="text-yellow-800 font-medium mb-1">¿No ves el email?</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Revisa tu carpeta de spam</li>
                  <li>• El email puede tardar unos minutos</li>
                  <li>• Asegúrate de que el email sea correcto</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="w-full bg-leaf-green text-white px-4 py-3 rounded-lg hover:bg-leaf-green/90 font-semibold text-center block"
            >
              ← Volver al Login
            </Link>
            
            <Link 
              href="/" 
              className="w-full text-gray-500 hover:text-gray-700 text-sm text-center block"
            >
              Ir al inicio
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}