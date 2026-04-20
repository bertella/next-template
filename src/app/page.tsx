'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function CatalogoLiquidacion() {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [verDetalleId, setVerDetalleId] = useState<number | null>(null);

  const WHATSAPP_NUMBER = "5493512042270"; 

  useEffect(() => {
    async function cargarProductos() {
      const { data } = await supabase
        .from('productos')
        .select('*, categorias(nombre)')
        .order('created_at', { ascending: false });
      
      if (data) setProductos(data);
      setLoading(false);
    }
    cargarProductos();
  }, []);

  const handleWhatsApp = (productoNombre: string) => {
    const mensaje = encodeURIComponent(`¡Hola! Me interesa el producto "${productoNombre}" que vi en liquidación en DoctaData Shop. ¿Sigue disponible?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, '_blank');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-4xl animate-pulse">🚀</div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      
      <header className="bg-slate-900 text-white pt-16 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] mb-6 animate-pulse">
            Stock Limitado • Liquidación Total
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 italic">
            SUPER <span className="text-red-600 italic">OFERTAS</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">DoctaData Shop | Córdoba, Argentina</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 -mt-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((producto) => (
            <div key={producto.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-white flex flex-col relative">
              
              {/* Badge */}
              <div className="absolute top-4 left-4 z-30">
                <div className="bg-red-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-lg shadow-lg transform -rotate-2">
                  ¡REVENTA!
                </div>
              </div>

              {/* Imagen con Carrusel Limpio */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <div className="flex overflow-x-auto snap-x snap-mandatory h-full scrollbar-hide">
                  {producto.imagenes?.map((img: string, idx: number) => (
                    <div key={idx} className="min-w-full h-full snap-center shrink-0">
                      <img src={img} className="w-full h-full object-cover" alt="" />
                    </div>
                  ))}
                </div>

                {/* Botón "+" de Información */}
                <button 
                  onClick={() => setVerDetalleId(verDetalleId === producto.id ? null : producto.id)}
                  className="absolute bottom-4 right-4 z-40 w-10 h-10 bg-slate-900/80 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl font-bold shadow-xl active:scale-90 transition-transform"
                >
                  {verDetalleId === producto.id ? '✕' : '+'}
                </button>

                {/* Overlay de descripción (solo si se activa el +) */}
                <div className={`absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-all duration-500 z-30 flex items-center p-8 ${verDetalleId === producto.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                  <div>
                    <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-2">Detalles Técnicos</p>
                    <p className="text-white text-lg font-medium italic">{producto.descripcion || 'Sin descripción adicional.'}</p>
                  </div>
                </div>
              </div>

              {/* Información Inferior */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-6">
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">{producto.categorias?.nombre}</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">{producto.nombre}</h3>
                </div>

                <div className="mt-auto">
                  <div className="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-100">
                    <p className="text-slate-400 text-[9px] font-black uppercase line-through decoration-red-400">Precio Regular</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tighter italic">
                      ${new Intl.NumberFormat('es-AR').format(producto.precio)}
                    </p>
                  </div>

                  <button 
                    onClick={() => handleWhatsApp(producto.nombre)}
                    className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-red-600 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
                  >
                    LO QUIERO YA ⚡
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-12 text-center">
        <Link href="/admin" className="text-slate-300 hover:text-slate-900 transition-colors text-[10px] font-black uppercase tracking-[0.4em]">
          Acceso Administración
        </Link>
      </footer>
    </div>
  );
}