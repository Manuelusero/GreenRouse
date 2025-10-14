import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex space-x-2 text-sm mb-8">
          <Link href="/" className="text-gray-500 hover:text-leaf-green">Inicio</Link>
          <span className="text-gray-400">/</span>
          <span className="text-soil-dark font-medium">Política de Privacidad</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-soil-dark mb-2">Política de Privacidad</h1>
          <p className="text-gray-600 mb-8">Última actualización: 13 de octubre de 2025</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">1. Información que recopilamos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              En GreenRouse recopilamos información para brindar mejores servicios a nuestros usuarios. 
              Recopilamos información de las siguientes maneras:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>Información de cuenta:</strong> nombre, email, ubicación general para recomendaciones locales</li>
              <li><strong>Datos de parcelas:</strong> información sobre tus cultivos, fechas de siembra, notas personales</li>
              <li><strong>Uso de la plataforma:</strong> páginas visitadas, tiempo de sesión, preferencias</li>
              <li><strong>Comunicaciones:</strong> mensajes que nos envías a través de formularios de contacto</li>
            </ul>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">2. Cómo utilizamos tu información</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Proporcionar, mantener y mejorar nuestros servicios</li>
              <li>Personalizar recomendaciones de cultivos según tu ubicación y preferencias</li>
              <li>Enviar actualizaciones sobre cursos, contenido nuevo y funcionalidades</li>
              <li>Conectarte con proveedores locales relevantes</li>
              <li>Responder a tus consultas y brindar soporte técnico</li>
              <li>Analizar el uso de la plataforma para mejorar la experiencia</li>
            </ul>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">3. Compartir información</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en las siguientes situaciones:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>Con tu consentimiento:</strong> cuando nos autorices explícitamente</li>
              <li><strong>Proveedores de servicios:</strong> empresas que nos ayudan a operar la plataforma</li>
              <li><strong>Requerimientos legales:</strong> cuando sea necesario por ley</li>
              <li><strong>Protección de derechos:</strong> para proteger nuestros derechos y los de otros usuarios</li>
            </ul>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">4. Seguridad de datos</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Encriptación de datos en tránsito y en reposo</li>
              <li>Acceso restringido a información personal</li>
              <li>Monitoreo regular de vulnerabilidades de seguridad</li>
              <li>Copias de seguridad regulares y plan de recuperación</li>
            </ul>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">5. Tus derechos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>Acceder</strong> a tu información personal</li>
              <li><strong>Rectificar</strong> datos inexactos o incompletos</li>
              <li><strong>Eliminar</strong> tu cuenta y datos asociados</li>
              <li><strong>Portabilidad</strong> de tus datos a otro servicio</li>
              <li><strong>Oponerte</strong> al procesamiento de tus datos</li>
              <li><strong>Limitar</strong> el procesamiento en ciertas circunstancias</li>
            </ul>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">6. Cookies y tecnologías similares</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso del sitio 
              y personalizar contenido. Puedes controlar las cookies a través de la configuración de tu navegador.
            </p>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">7. Retención de datos</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Conservamos tu información personal mientras tengas una cuenta activa o según sea necesario 
              para proporcionar servicios. Algunos datos pueden conservarse por períodos más largos 
              cuando sea requerido por ley o para resolver disputas.
            </p>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">8. Menores de edad</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nuestros servicios están dirigidos a personas mayores de 16 años. No recopilamos 
              intencionalmente información de menores de 16 años sin el consentimiento de los padres.
            </p>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">9. Cambios en esta política</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre 
              cambios significativos por email o a través de un aviso en nuestro sitio web.
            </p>

            <h2 className="text-xl font-bold text-soil-dark mt-8 mb-4">10. Contacto</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Si tienes preguntas sobre esta política de privacidad, puedes contactarnos:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2 text-gray-700">
                <li><strong>Email:</strong> privacidad@greenrouse.com</li>
                <li><strong>Dirección:</strong> GreenRouse, Buenos Aires, Argentina</li>
                <li><strong>Teléfono:</strong> +54 11 1234-5678</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related links */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-soil-dark mb-4">Documentos relacionados</h3>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/terminos" 
              className="text-leaf-green hover:text-sage-green transition-colors"
            >
              Términos y Condiciones
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