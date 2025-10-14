import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex space-x-2 text-sm mb-8">
          <Link href="/" className="text-gray-500 hover:text-leaf-green">Inicio</Link>
          <span className="text-gray-400">/</span>
          <span className="text-soil-dark font-medium">Términos y Condiciones</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-soil-dark mb-2">Términos y Condiciones</h1>
          <p className="text-gray-600 mb-8">Última actualización: 13 de octubre de 2025</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">1. Aceptación de los términos</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Al acceder y utilizar GreenRouse, aceptas estar vinculado por estos Términos y Condiciones. 
              Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.
            </p>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">2. Descripción del servicio</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              GreenRouse es una plataforma digital que proporciona:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Herramientas para la gestión de huertas orgánicas</li>
              <li>Calculadoras para optimización de cultivos</li>
              <li>Contenido educativo sobre permacultura</li>
              <li>Conexión con proveedores locales</li>
              <li>Calendarios de siembra basados en ciclos lunares</li>
            </ul>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">3. Registro y cuentas de usuario</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Para utilizar ciertas funciones, debes crear una cuenta proporcionando información veraz y actualizada. Eres responsable de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Mantener la confidencialidad de tu contraseña</li>
              <li>Todas las actividades que ocurran bajo tu cuenta</li>
              <li>Notificar inmediatamente cualquier uso no autorizado</li>
              <li>Proporcionar información precisa y actualizada</li>
            </ul>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">4. Uso aceptable</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Al utilizar GreenRouse, te comprometes a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Usar el servicio de manera legal y apropiada</li>
              <li>No interferir con la operación del servicio</li>
              <li>No intentar acceder a datos de otros usuarios</li>
              <li>Respetar los derechos de propiedad intelectual</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Está prohibido:</strong> usar el servicio para actividades ilegales, distribuir malware, 
              spam, o cualquier contenido que viole derechos de terceros.
            </p>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">5. Contenido del usuario</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Conservas todos los derechos sobre el contenido que publiques. Al subir contenido a GreenRouse:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Nos otorgas una licencia para usar, almacenar y mostrar tu contenido</li>
              <li>Garantizas que tienes derecho a compartir ese contenido</li>
              <li>Aceptas que podemos moderar o eliminar contenido inapropiado</li>
              <li>Reconoces que el contenido puede ser visible para otros usuarios</li>
            </ul>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">6. Propiedad intelectual</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              El contenido, diseño, logotipos, y funcionalidades de GreenRouse están protegidos por derechos 
              de autor y otras leyes de propiedad intelectual. No puedes copiar, distribuir o crear obras 
              derivadas sin nuestro consentimiento expreso.
            </p>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">7. Proveedores terceros</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              GreenRouse puede incluir enlaces o información sobre proveedores terceros. No somos responsables 
              por los productos, servicios o prácticas de estos terceros. Las transacciones entre tú y los 
              proveedores son exclusivamente entre ambas partes.
            </p>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">8. Disclaimer y limitación de responsabilidad</h2>
            <div className="bg-yellow-50 rounded-lg p-4 mb-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Importante:</strong> La información proporcionada en GreenRouse tiene fines educativos 
                y de referencia únicamente. No garantizamos resultados específicos en tus cultivos.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Los resultados de cultivos dependen de múltiples factores locales</li>
                <li>Recomendamos consultar expertos agronómicos locales</li>
                <li>No somos responsables por pérdidas de cultivos o daños</li>
                <li>Usa la información bajo tu propio criterio y riesgo</li>
              </ul>
            </div>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">9. Servicios de pago</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Para servicios premium o cursos de pago:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Los precios están expresados en la moneda local</li>
              <li>El pago se procesa de forma segura a través de terceros confiables</li>
              <li>Las suscripciones se renuevan automáticamente salvo cancelación</li>
              <li>Política de reembolso de 14 días para cursos</li>
            </ul>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">10. Terminación</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Puedes terminar tu cuenta en cualquier momento. Nos reservamos el derecho de suspender 
              o terminar cuentas que violen estos términos. Al terminar la cuenta, perderás acceso 
              a contenido premium y datos almacenados.
            </p>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">11. Modificaciones</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Podemos modificar estos términos ocasionalmente. Los cambios significativos se notificarán 
              por email o mediante aviso en la plataforma. El uso continuo del servicio después de 
              cambios constituye aceptación de los nuevos términos.
            </p>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">12. Ley aplicable</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Estos términos se rigen por las leyes de Argentina. Cualquier disputa se resolverá 
              en los tribunales de Buenos Aires, Argentina.
            </p>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">13. Contacto</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Para preguntas sobre estos términos:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2 text-gray-700">
                <li><strong>Email:</strong> legal@greenrouse.com</li>
                <li><strong>Dirección:</strong> GreenRouse, Buenos Aires, Argentina</li>
                <li><strong>Soporte:</strong> soporte@greenrouse.com</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related links */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-soil-dark mb-4">Documentos relacionados</h3>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/privacidad" 
              className="text-leaf-green hover:text-sage-green transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link 
              href="/cookies" 
              className="text-leaf-green hover:text-sage-green transition-colors"
            >
              Política de Cookies
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}