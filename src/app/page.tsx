import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Soluciones Innovadoras para tu Negocio
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Potenciamos tu crecimiento con tecnología, creatividad y estrategias a medida.
          </p>
          <Link href="/turnos" passHref>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Pedir Información
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section Placeholder */}
      <section id="servicios" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800">Nuestros Servicios</h2>
            <p className="text-gray-600 text-lg">
              Ofrecemos una amplia gama de soluciones diseñadas para llevar tu proyecto al siguiente nivel. Próximamente, más detalles aquí.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Servicio Uno</h3>
              <p className="text-gray-600">Descripción breve del servicio.</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Servicio Dos</h3>
              <p className="text-gray-600">Descripción breve del servicio.</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Servicio Tres</h3>
              <p className="text-gray-600">Descripción breve del servicio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Placeholder */}
      <section id="contacto" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">Contacto</h2>
          <p className="text-gray-600 text-lg mb-8">
            ¿Listo para empezar? Contáctanos para recibir más información.
          </p>
          <Link href="/turnos" passHref>
             <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Ir al Formulario de Contacto
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
