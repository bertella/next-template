'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function CatalogoLiquidacion() {
  const [productos, setProductos] = useState<any[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [verDetalleId, setVerDetalleId] = useState<number | null>(null);
  
  const [imagenExpandida, setImagenExpandida] = useState<{ imagenes: string[], nombre: string } | null>(null);

  const WHATSAPP_NUMBER = "5493516538362"; 

  useEffect(() => {
    async function cargarDatos() {
      const { data } = await supabase
        .from('productos')
        .select('*, categorias(nombre)')
        .order('created_at', { ascending: false });
      
      if (data) {
        setProductos(data);
        setProductosFiltrados(data);
        const cats = data.map(p => p.categorias?.nombre).filter(Boolean);
        setCategorias(['Todas', ...Array.from(new Set(cats))]);
      }
      setLoading(false);
    }
    cargarDatos();
  }, []);

  const filtrarCategoria = (cat: string) => {
    setCategoriaActiva(cat);
    if (cat === 'Todas') {
      setProductosFiltrados(productos);
    } else {
      setProductosFiltrados(productos.filter(p => p.categorias?.nombre === cat));
    }
  };

  const handleWhatsApp = (productoNombre: string) => {
    const mensaje = encodeURIComponent(`¡Hola! Me interesa el producto "${productoNombre}" que vi en liquidación en DoctaData Shop. ¿Sigue disponible?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, '_blank');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-4xl animate-pulse font-black text-slate-900">🚀</div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      
      {/* --- MODAL DE IMAGEN AMPLIADA --- */}
      {imagenExpandida && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <button 
            onClick={() => setImagenExpandida(null)}
            className="absolute top-6 right-6 text-white text-4xl font-light hover:text-red-500 transition-colors z-[110]"
          >
            ✕
          </button>
          
          <div className="w-full max-w-4xl h-[70vh] md:h-[80vh] relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory h-full scrollbar-hide no-scrollbar gap-4">
              {imagenExpandida.imagenes.map((img, idx) => (
                <div key={idx} className="min-w-full h-full snap-center shrink-0 flex items-center justify-center">
                  <img src={img} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" alt={`${imagenExpandida.nombre} full`} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-white text-2xl font-black italic uppercase tracking-tighter">{imagenExpandida.nombre}</h2>
            <button 
              onClick={() => { handleWhatsApp(imagenExpandida.nombre); setImagenExpandida(null); }}
              className="mt-6 bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest hover:bg-white hover:text-black transition-all"
            >
              CONSULTAR AHORA ⚡
            </button>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <header className="bg-slate-900 text-white pt-16 pb-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] mb-6 animate-pulse">
            Liquidación Total • Stock Limitado
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 italic">
            SUPER <span className="text-red-600 italic">OFERTAS</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">DoctaData Shop | Córdoba, Argentina</p>
        </div>
      </header>

      {/* --- FILTROS --- */}
      <nav className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 mb-12">
        <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide no-scrollbar items-center justify-start md:justify-center">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => filtrarCategoria(cat)}
              className={`whitespace-nowrap px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg ${
                categoriaActiva === cat 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-slate-900 border border-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* --- GRILLA DE PRODUCTOS --- */}
      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-white flex flex-col relative">
              
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <div className="bg-red-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-lg shadow-lg transform -rotate-2">
                  ¡REVENTA!
                </div>
              </div>

              {/* IMAGEN Y CARRUSEL */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 cursor-zoom-in">
                <div 
                  onClick={() => setImagenExpandida({ imagenes: producto.imagenes, nombre: producto.nombre })}
                  className="flex overflow-x-auto snap-x snap-mandatory h-full scrollbar-hide no-scrollbar"
                >
                  {producto.imagenes?.map((img: string, idx: number) => (
                    <div key={idx} className="min-w-full h-full snap-center shrink-0">
                      <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={producto.nombre} />
                    </div>
                  ))}
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); setVerDetalleId(verDetalleId === producto.id ? null : producto.id); }}
                  className="absolute bottom-4 right-4 z-40 w-10 h-10 bg-slate-900/80 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl font-bold shadow-xl active:scale-90"
                >
                  {verDetalleId === producto.id ? '✕' : '+'}
                </button>

                <div className={`absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-all duration-500 z-30 flex items-center p-8 ${verDetalleId === producto.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                  <div>
                    <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-2">Detalles Técnicos</p>
                    <p className="text-white text-lg font-medium italic leading-snug">{producto.descripcion || 'Sin descripción adicional.'}</p>
                  </div>
                </div>
              </div>

              {/* INFO INFERIOR Y PRECIOS */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-6">
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">{producto.categorias?.nombre}</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2 leading-tight uppercase italic">{producto.nombre}</h3>
                </div>

                <div className="mt-auto">
                  <div className="bg-slate-50 p-6 rounded-[2rem] mb-4 border border-slate-100 min-h-[110px] flex flex-col justify-center">
                    
                    {/* LÓGICA DE PRECIO ANTERIOR MÁS GRANDE */}
                    {producto.precio_anterior ? (
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-slate-400 text-lg font-black uppercase line-through decoration-red-600 decoration-[3px] tracking-tighter">
                          ${new Intl.NumberFormat('es-AR').format(producto.precio_anterior)}
                        </p>
                        <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full animate-pulse shadow-md">
                          AHORRÁS
                        </span>
                      </div>
                    ) : (
                      <p className="text-slate-300 text-[9px] font-black uppercase tracking-widest mb-1">Precio de Liquidación</p>
                    )}

                    <p className="text-5xl font-black text-slate-900 tracking-tighter italic">
                      ${new Intl.NumberFormat('es-AR').format(producto.precio)}
                    </p>
                  </div>

                  <button 
                    onClick={() => handleWhatsApp(producto.nombre)}
                    className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-red-600 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg uppercase tracking-[0.1em] text-xs"
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