'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function CatalogoLiquidacion() {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Configuración del WhatsApp
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
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-bounce text-4xl">🚀</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      
      {/* HEADER DE IMPACTO: LIQUIDACIÓN */}
      <header className="bg-slate-900 text-white pt-16 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] mb-6 animate-pulse">
            Stock Limitado • Precios de Costo
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 italic">
          SUPER <span className="text-red-600 italic">OFERTAS</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            DoctaData Shop <span className="mx-2">|</span> Reventa de Oportunidad
          </p>
        </div>
      </header>

      {/* GRILLA DE PRODUCTOS */}
      <main className="max-w-7xl mx-auto px-4 -mt-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((producto) => (
            <div key={producto.id} className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] transition-all duration-500 border border-white flex flex-col">
              
              <div className="absolute top-5 left-5 z-30">
                <div className="bg-red-600 text-white text-[11px] font-black uppercase tracking-tighter px-4 py-2 rounded-xl shadow-xl shadow-red-900/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                  ¡REVENTA TOTAL!
                </div>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <div className="flex overflow-x-auto snap-x snap-mandatory h-full scrollbar-hide">
                  {producto.imagenes && producto.imagenes.length > 0 ? (
                    producto.imagenes.map((img: string, idx: number) => (
                      <div key={idx} className="min-w-full h-full snap-center shrink-0">
                        <img 
                          src={img} 
                          alt={`${producto.nombre} ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 group-hover:blur-[2px] transition-all duration-1000"
                        />
                      </div>
                    ))
                  ) : (
                    <img src="https://placehold.co/600x800" className="w-full h-full object-cover" alt="Sin imagen" />
                  )}
                </div>

                {producto.imagenes?.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    {producto.imagenes.map((_: any, i: number) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
                    ))}
                  </div>
                )}
                
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 pointer-events-none z-10">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">
                      Ficha Técnica
                    </p>
                    <p className="text-white text-sm font-medium leading-relaxed italic">
                      {producto.descripcion || 'Oportunidad única en liquidación de stock.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-6">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] bg-blue-50 px-3 py-1 rounded-lg">
                    {producto.categorias?.nombre || 'General'}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight mt-4 group-hover:text-red-600 transition-colors duration-300">
                    {producto.nombre}
                  </h3>
                </div>

                <div className="mt-auto">
                  <div className="flex flex-col mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest line-through decoration-red-500/50">
                      Precio Regular
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-slate-900 tracking-tighter">
                        ${new Intl.NumberFormat('es-AR').format(producto.precio)}
                      </span>
                      <span className="text-red-600 font-black text-xs uppercase animate-pulse">¡OFF!</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleWhatsApp(producto.nombre)}
                    className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-red-600 shadow-xl shadow-slate-200 hover:shadow-red-900/30 transition-all duration-500 active:scale-95 flex items-center justify-center gap-3 group/btn cursor-pointer"
                  >
                    <span className="uppercase tracking-[0.2em] text-[10px]">Aprovechar Oferta</span>
                    <span className="text-xl group-hover/btn:translate-x-1 transition-transform">⚡</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-10 text-center border-t border-slate-100">
        <Link href="/admin" className="text-slate-300 hover:text-slate-900 transition-colors text-[10px] font-black uppercase tracking-[0.5em]">
          DoctaData © 2026
        </Link>
      </footer>
    </div>
  );
}