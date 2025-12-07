



export default function InfoPage() {
  return (
    <div className="min-h-screen bg-[#20232A] text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex gap-10">

        {/* ---------------- SIDEBAR ---------------- */}
        <aside className="w-64 bg-[#1b1e24] p-6 rounded-xl border border-gray-700 h-fit sticky top-10">
          <h2 className="text-xl font-semibold mb-6 text-[#45f7ce]">Índice</h2>

          <nav className="space-y-4 text-gray-300">
            <a href="#contacto" className="block hover:text-[#45f7ce] transition">
              Contacto
            </a>
            <a href="#terminos" className="block hover:text-[#45f7ce] transition">
              Términos y Condiciones
            </a>
            <a href="#privacidad" className="block hover:text-[#45f7ce] transition">
              Política de Privacidad
            </a>
            <a href="#faq" className="block hover:text-[#45f7ce] transition">
              Preguntas Frecuentes (FAQ)
            </a>
          </nav>
        </aside>

        {/* ---------------- CONTENIDO ---------------- */}
        <div className="flex-1">

          {/* Título principal */}
          <h1 className="text-4xl font-bold mb-10 text-[#45f7ce]">
            Centro de Información
          </h1>

          {/* ---------------- CONTACTO ---------------- */}
          <section id="contacto" className="mb-12 border-b border-gray-700 pb-8 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Contacto</h2>

            <p className="text-gray-300 mb-4">
              Si tenés dudas, consultas o necesitás ayuda con tus entradas,
              podés comunicarte con nuestro equipo de soporte.
            </p>

            <ul className="space-y-2 text-gray-400">
              <li><span className="font-semibold text-white">Email:</span> soporte@agend-ar.com</li>
              <li><span className="font-semibold text-white">Teléfono:</span> +54 11 5555-5555</li>
              <li><span className="font-semibold text-white">Horarios:</span> Lunes a Viernes de 9 a 18 hs</li>
            </ul>
          </section>

          {/* ---------------- TÉRMINOS Y CONDICIONES ---------------- */}
          <section id="terminos" className="mb-12 border-b border-gray-700 pb-8 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Términos y Condiciones</h2>

            <p className="text-gray-300 mb-4">
              Al utilizar Agend-ar aceptás los siguientes términos y condiciones.
              Estos establecen las reglas generales de uso de la plataforma.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">1. Uso del servicio</h3>
            <p className="text-gray-400">
              Agend-ar funciona como una plataforma para visualizar y adquirir 
              entradas a eventos. No somos responsables por cambios o cancelaciones 
              realizadas por los organizadores.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">2. Compras</h3>
            <p className="text-gray-400">
              Todas las compras son finales. Las devoluciones dependen de las 
              políticas del organizador del evento.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">3. Responsabilidad</h3>
            <p className="text-gray-400">
              Agend-ar no se responsabiliza por pérdidas, robos o daños ocurridos 
              durante los eventos.
            </p>
          </section>

          {/* ---------------- POLÍTICA DE PRIVACIDAD ---------------- */}
          <section id="privacidad" className="mb-12 border-b border-gray-700 pb-8 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Política de Privacidad</h2>

            <p className="text-gray-300 mb-4">
              Esta política describe cómo recopilamos, usamos y protegemos tus datos.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">1. Datos que recopilamos</h3>
            <ul className="list-disc ml-6 text-gray-400 space-y-1">
              <li>Nombre y apellido</li>
              <li>Email</li>
              <li>Historial de entradas compradas</li>
              <li>Datos de navegación dentro de la plataforma</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-2">2. Uso de la información</h3>
            <p className="text-gray-400">
              Utilizamos tus datos para procesar compras, enviar notificaciones sobre
              tus eventos y mejorar tu experiencia en la plataforma.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">3. Protección de datos</h3>
            <p className="text-gray-400">
              Implementamos medidas de seguridad para proteger tu información y nunca
              la compartimos con terceros sin tu consentimiento.
            </p>
          </section>

          {/* ---------------- PREGUNTAS FRECUENTES (FAQ) ---------------- */}
          <section id="faq" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Preguntas Frecuentes (FAQ)</h2>

            <h3 className="text-lg font-semibold mt-6 mb-2">¿Dónde veo mis entradas?</h3>
            <p className="text-gray-400">
              Una vez realizada la compra, tus entradas aparecen en la sección
              “Descargá tus entradas”, dentro de tu perfil.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">¿Qué pasa si pierdo mi entrada?</h3>
            <p className="text-gray-400">
              No te preocupes, podés volver a descargarla desde la plataforma.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">¿Puedo pedir un reembolso?</h3>
            <p className="text-gray-400">
              Los reembolsos dependen del organizador del evento. Si está permitido,
              te daremos la opción directamente desde tu perfil.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">¿Por qué no puedo pagar?</h3>
            <p className="text-gray-400">
              Puede haber un error con tu método de pago. Recomendamos probar con otra
              tarjeta o comunicarte con tu banco.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

