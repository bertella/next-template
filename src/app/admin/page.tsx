'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminPremium() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);
  const [productos, setProductos] = useState<any[]>([]);
  
  // --- ESTADOS PARA NUEVA CATEGORÍA ---
  const [mostrarNuevaCat, setMostrarNuevaCat] = useState(false);
  const [nombreNuevaCat, setNombreNuevaCat] = useState('');

  // --- SEGURIDAD ---
  const [autorizado, setAutorizado] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [verificando, setVerificando] = useState(true);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    precio_anterior: '',
    categoria_id: ''
  });

  const cargarDatosInciales = useCallback(async () => {
    const { data: cats } = await supabase.from('categorias').select('id, nombre').order('nombre');
    if (cats) setCategorias(cats);
    const { data: prods } = await supabase.from('productos').select('*, categorias(nombre)').order('created_at', { ascending: false });
    if (prods) setProductos(prods);
  }, []);

  useEffect(() => {
    const sesionValida = sessionStorage.getItem('admin_auth_doctadata');
    if (sesionValida === 'true') {
      setAutorizado(true);
      cargarDatosInciales();
    }
    setVerificando(false);
  }, [cargarDatosInciales]);

  // Lógica para crear categoría al vuelo
  async function crearCategoriaRapida() {
    if (!nombreNuevaCat.trim()) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('categorias')
      .insert([{ nombre: nombreNuevaCat.trim() }])
      .select()
      .single();

    if (data) {
      setCategorias([...categorias, data]);
      setFormValues({ ...formValues, categoria_id: data.id.toString() });
      setMostrarNuevaCat(false);
      setNombreNuevaCat('');
      setMensaje('✨ Categoría creada');
    }
    setLoading(false);
  }

  const manejarLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const CLAVE_MAESTRA = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (passInput === CLAVE_MAESTRA) {
      sessionStorage.setItem('admin_auth_doctadata', 'true');
      setAutorizado(true);
      cargarDatosInciales();
    } else {
      alert("Acceso Denegado");
      setPassInput('');
    }
  };

  const cerrarSesion = () => {
    sessionStorage.removeItem('admin_auth_doctadata');
    setAutorizado(false);
  };

  async function eliminarProducto(id: number, nombre: string) {
    if (!confirm(`¿Estás seguro de eliminar "${nombre}"?`)) return;
    const { error } = await supabase.from('productos').delete().eq('id', id);
    if (!error) {
      setMensaje('🗑️ Producto eliminado');
      cargarDatosInciales();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMensaje('⏳ Procesando...');
    const formData = new FormData(e.currentTarget);
    const files = formData.getAll('imagenes') as File[];
    
    try {
      let urlsSubidas: string[] = [];
      if (editandoId && (!files[0] || files[0].size === 0)) {
        urlsSubidas = productos.find(p => p.id === editandoId)?.imagenes || [];
      } else {
        for (const file of files) {
          if (file.size > 0) {
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
            await supabase.storage.from('productos').upload(fileName, file);
            const { data: { publicUrl } } = supabase.storage.from('productos').getPublicUrl(fileName);
            urlsSubidas.push(publicUrl);
          }
        }
      }

      const payload = {
        nombre: formValues.nombre,
        descripcion: formValues.descripcion,
        precio: parseFloat(formValues.precio),
        precio_anterior: formValues.precio_anterior ? parseFloat(formValues.precio_anterior) : null,
        categoria_id: parseInt(formValues.categoria_id),
        imagenes: urlsSubidas
      };

      if (editandoId) {
        await supabase.from('productos').update(payload).eq('id', editandoId);
      } else {
        await supabase.from('productos').insert([{ ...payload, stock_activo: true }]);
      }

      setEditandoId(null);
      setFormValues({ nombre: '', descripcion: '', precio: '', precio_anterior: '', categoria_id: '' });
      cargarDatosInciales();
      setMensaje('✅ ¡Operación Exitosa!');
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      setMensaje('❌ Error en la carga');
    } finally {
      setLoading(false);
    }
  }

  if (verificando) return null;

  if (!autorizado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-6 font-sans">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 shadow-2xl text-center">
          <div className="text-5xl mb-6">🛡️</div>
          <h2 className="text-2xl font-black text-white mb-2 tracking-tighter">DoctaData Admin</h2>
          <form onSubmit={manejarLogin} className="space-y-4">
            <input 
              type="password" placeholder="••••••••"
              className="w-full p-5 bg-white/10 border border-white/10 rounded-2xl outline-none text-center text-white focus:border-blue-500 transition-all"
              value={passInput} onChange={(e) => setPassInput(e.target.value)} autoFocus
            />
            <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all">
              DESBLOQUEAR PANEL
            </button>
          </form>
          <Link href="/" className="inline-block mt-10 text-[10px] font-bold text-white/30 hover:text-white uppercase tracking-widest">
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-10 bg-[#F5F5F7] min-h-screen font-sans text-slate-900">
      
      <div className="flex justify-end mb-8">
        <button onClick={cerrarSesion} className="px-4 py-2 bg-white/80 border border-slate-200 text-slate-500 text-[10px] font-black uppercase rounded-full hover:bg-red-50 hover:text-red-600 transition-all shadow-sm">
          Finalizar Gestión ✕
        </button>
      </div>

      <div className="flex items-center justify-between mb-10 bg-white p-8 rounded-[2.5rem] shadow-sm border border-white">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900">DoctaData</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Panel Sincronizado
          </p>
        </div>
        <Link href="/" className="px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-2xl shadow-xl">
          Ir a la Tienda →
        </Link>
      </div>

      <div className="bg-white p-10 shadow-xl rounded-[3.5rem] border border-white relative">
        <h2 className="text-2xl font-black mb-8 text-slate-900">
          {editandoId ? 'Editando Producto' : 'Nuevo Producto'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">Información Básica</label>
            <input 
              value={formValues.nombre} 
              onChange={(e) => setFormValues({...formValues, nombre: e.target.value})} 
              required className="w-full p-5 bg-slate-50 border-none rounded-[1.5rem] outline-none" placeholder="Nombre del producto..." 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">Precio Oferta (Hoy)</label>
              <input type="number" step="0.01" value={formValues.precio} onChange={(e) => setFormValues({...formValues, precio: e.target.value})} required className="w-full p-5 bg-slate-50 border-none rounded-[1.5rem] outline-none font-bold text-blue-600" placeholder="0.00" />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">Precio Anterior</label>
              <input type="number" step="0.01" value={formValues.precio_anterior} onChange={(e) => setFormValues({...formValues, precio_anterior: e.target.value})} className="w-full p-5 bg-slate-50 border-none rounded-[1.5rem] outline-none font-bold text-slate-400 line-through" placeholder="Ej: 250" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">Categoría</label>
            {!mostrarNuevaCat ? (
              <select 
                value={formValues.categoria_id} 
                onChange={(e) => {
                  if (e.target.value === "new") {
                    setMostrarNuevaCat(true);
                  } else {
                    setFormValues({...formValues, categoria_id: e.target.value});
                  }
                }} 
                required 
                className="w-full p-5 bg-slate-50 border-none rounded-[1.5rem] outline-none font-bold text-slate-600 appearance-none"
              >
                <option value="">Seleccionar...</option>
                {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
                <option value="new" className="text-blue-600 font-bold">+ Crear nueva categoría...</option>
              </select>
            ) : (
              <div className="flex gap-2">
                <input 
                  autoFocus
                  type="text"
                  value={nombreNuevaCat}
                  onChange={(e) => setNombreNuevaCat(e.target.value)}
                  className="flex-1 p-5 bg-blue-50 border-2 border-blue-100 rounded-[1.5rem] outline-none font-bold text-blue-600 placeholder:text-blue-300"
                  placeholder="Ej: Calzado, Herramientas..."
                />
                <button 
                  type="button"
                  onClick={crearCategoriaRapida}
                  className="px-6 bg-blue-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest"
                >
                  OK
                </button>
                <button 
                  type="button"
                  onClick={() => setMostrarNuevaCat(false)}
                  className="px-4 bg-slate-200 text-slate-500 rounded-[1.5rem] font-black text-[10px]"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">Detalles del Artículo</label>
            <textarea value={formValues.descripcion} onChange={(e) => setFormValues({...formValues, descripcion: e.target.value})} className="w-full p-5 bg-slate-50 border-none rounded-[1.5rem] outline-none min-h-[100px]" placeholder="Describe las características principales..." />
          </div>

          <div className="group relative bg-slate-50 p-8 rounded-[2rem] border-2 border-dashed border-slate-200 text-center">
            <input name="imagenes" type="file" accept="image/*" multiple required={!editandoId} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <p className="text-xs font-bold text-slate-500">📸 Subir imágenes</p>
          </div>

          <button type="submit" disabled={loading} className="w-full py-6 bg-slate-900 text-white font-black rounded-[1.8rem] hover:bg-blue-600 transition-all flex items-center justify-center gap-3">
            <span className="uppercase tracking-[0.2em]">{loading ? 'Procesando...' : editandoId ? 'Guardar Cambios' : 'Lanzar Producto'}</span>
          </button>
        </form>
        {mensaje && <div className="mt-8 text-center p-4 bg-blue-50 rounded-2xl text-blue-600 font-black text-[10px] tracking-widest uppercase">{mensaje}</div>}
      </div>

      {/* LISTADO DE PRODUCTOS */}
      <div className="mt-16 space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] px-6 italic">Inventario Actual</h3>
        <div className="grid gap-4">
          {productos.map((p) => (
            <div key={p.id} className="flex items-center justify-between bg-white p-5 rounded-[2rem] shadow-sm border border-transparent hover:border-blue-50 transition-all">
              <div className="flex items-center gap-5">
                <img src={p.imagenes?.[0] || 'https://placehold.co/100x100'} className="w-16 h-16 object-cover rounded-2xl" alt="" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{p.nombre}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black text-blue-500 uppercase bg-blue-50 px-2 py-0.5 rounded-md">{p.categorias?.nombre}</span>
                    <span className="text-xs font-bold text-slate-400 italic">
                      ${p.precio} {p.precio_anterior && <span className="line-through opacity-50 ml-1 text-[10px]">${p.precio_anterior}</span>}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pr-2">
                <button onClick={() => { setEditandoId(p.id); setFormValues({ nombre: p.nombre, descripcion: p.descripcion || '', precio: p.precio.toString(), precio_anterior: p.precio_anterior?.toString() || '', categoria_id: p.categoria_id.toString() }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-11 h-11 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-[10px] font-bold">EDT</button>
                <button onClick={() => eliminarProducto(p.id, p.nombre)} className="w-11 h-11 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-600 hover:text-white transition-all text-[10px] font-bold">DEL</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}