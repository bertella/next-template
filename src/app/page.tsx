'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; // Importante para la navegación rápida
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function CatalogoPro() {
  const [productos, setProductos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');
  const [loading, setLoading] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any | null>(null);

  useEffect(() => {
    async function inicializar() {
      const { data: catData } = await supabase.from('categorias').select('*').order('nombre');
      if (catData) setCategorias([{ id: 'all', nombre: 'Todas' }, ...catData]);

      const { data: prodData } = await supabase
        .from('productos')
        .select('*, categorias(nombre)')
        .eq('stock_activo', true)
        .order('created_at', { ascending: false });

      if (prodData) setProductos(prodData);
      setLoading(false);
    }
    inicializar();
  }, []);

  const productosFiltrados = categoriaSeleccionada === 'Todas'
    ? productos
    : productos.filter(p => p.categorias?.nombre === categoriaSeleccionada);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F5F5F7]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F7] min-h-screen flex flex-col font-sans text-[#1D1D1F]">
      
      {/* HEADER CON LOGO-LINK AL ADMIN */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-6 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/admin" className="group">
            <h1 className="text-xl font-bold tracking-tight text-slate-950 transition-colors group-hover:text-blue-600">
              DoctaData <span className="text-blue-600 font-medium group-hover:text-slate-950 transition-colors">Shop</span>
            </h1>
          </Link>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Catálogo Online</span>
          </div>
        </div>
      </header>

      {/* BARRA DE CATEGORÍAS */}
      <nav className="sticky top-[65px] z-40 bg-white/60 backdrop-blur-md border-b border-gray-100 py-4 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex gap-2">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.nombre)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold transition-all border ${
                categoriaSeleccionada === cat.nombre
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100 scale-105'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-blue-400'
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8 flex-grow">
        <p className="text-[10px] uppercase font-black text-gray-400 mb-6 tracking-widest px-1">
          {productosFiltrados.length} items encontrados
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode='popLayout'>
            {productosFiltrados.map((producto) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={producto.id}
                className="bg-white rounded-[2rem] shadow-sm border border-gray-100 flex flex-col overflow-hidden h-full hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square">
                  {producto.imagenes?.length > 0 ? (
                    <Swiper modules={[Pagination]} pagination={{ dynamicBullets: true }} className="w-full h-full">
                      {producto.imagenes.map((url: string, i: number) => (
                        <SwiperSlide key={i} className="flex items-center justify-center p-4">
                          <img src={url} className="max-w-full max-h-full object-contain" alt={producto.nombre} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">🖼️</div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="h-12 mb-2">
                    <h2 className="text-[13px] font-bold text-slate-900 leading-snug line-clamp-2">
                      {producto.nombre}
                    </h2>
                  </div>

                  <button 
                    onClick={() => setProductoSeleccionado(producto)}
                    className="mb-4 flex items-center justify-between w-full px-3 py-2 bg-slate-50 hover:bg-blue-50 rounded-xl transition-colors group"
                  >
                    <span className="text-[9px] font-black text-slate-400 group-hover:text-blue-600 uppercase tracking-tighter">Especificaciones</span>
                    <span className="text-slate-300 group-hover:text-blue-600 font-bold">+</span>
                  </button>

                  <div className="mt-auto pt-2">
                    <span className="text-xl font-medium text-slate-950 block">
                      ${new Intl.NumberFormat('es-AR').format(producto.precio)}
                    </span>
                    <a 
                      href={`https://wa.me/549351XXXXXXX?text=Consulta por: ${producto.nombre}`}
                      target="_blank"
                      className="mt-3 w-full bg-[#3483FA] text-white text-center text-[11px] font-bold py-3.5 rounded-xl block shadow-lg shadow-blue-100 active:scale-95 transition-all"
                    >
                      CONSULTAR
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* FOOTER MÍNIMO */}
      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">DoctaData • Córdoba</p>
      </footer>

      {/* MODAL DETALLES */}
      <AnimatePresence>
        {productoSeleccionado && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setProductoSeleccionado(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] z-[110] p-8 max-h-[85vh] overflow-y-auto">
              <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto mb-8" />
              <h3 className="text-2xl font-bold mb-6 text-slate-900">{productoSeleccionado.nombre}</h3>
              <div className="space-y-4">
                {productoSeleccionado.descripcion?.split('\n').map((l: string, i: number) => (
                  l.trim() && (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-gray-100 flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600 leading-relaxed">{l.trim()}</p>
                    </div>
                  )
                ))}
              </div>
              <button onClick={() => setProductoSeleccionado(null)} className="w-full mt-10 py-5 bg-slate-900 text-white font-bold rounded-2xl">Cerrar</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .swiper-pagination-bullet-active { background: #3483FA !important; }
      `}</style>
    </div>
  );
}