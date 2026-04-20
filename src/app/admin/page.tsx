'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminMultiFoto() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);
  const [productos, setProductos] = useState<any[]>([]);
  
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria_id: ''
  });

  useEffect(() => {
    fetchCategorias();
    cargarProductos();
  }, []);

  async function fetchCategorias() {
    const { data } = await supabase.from('categorias').select('id, nombre').order('nombre');
    if (data) setCategorias(data);
  }

  async function cargarProductos() {
    const { data } = await supabase.from('productos').select('*, categorias(nombre)').order('created_at', { ascending: false });
    if (data) setProductos(data);
  }

  // FUNCIÓN PARA ELIMINAR (EL CESTO)
  async function eliminarProducto(id: number, nombre: string) {
    const confirmar = confirm(`¿Estás seguro de eliminar "${nombre}"?`);
    if (!confirmar) return;

    try {
      const { error } = await supabase.from('productos').delete().eq('id', id);
      if (error) throw error;
      
      setMensaje('🗑️ Producto eliminado correctamente');
      cargarProductos();
    } catch (error: any) {
      alert('Error al eliminar: ' + error.message);
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
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from('productos').upload(fileName, file);
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from('productos').getPublicUrl(fileName);
            urlsSubidas.push(publicUrl);
          }
        }
      }

      if (editandoId) {
        const { error } = await supabase
          .from('productos')
          .update({
            nombre: formValues.nombre,
            descripcion: formValues.descripcion,
            precio: parseFloat(formValues.precio),
            categoria_id: parseInt(formValues.categoria_id),
            imagenes: urlsSubidas
          })
          .eq('id', editandoId);
        if (error) throw error;
        setMensaje('✅ Producto actualizado');
      } else {
        const { error } = await supabase.from('productos').insert([{
          ...formValues,
          precio: parseFloat(formValues.precio),
          categoria_id: parseInt(formValues.categoria_id),
          imagenes: urlsSubidas,
          stock_activo: true
        }]);
        if (error) throw error;
        setMensaje('✅ Producto creado con éxito');
      }

      setEditandoId(null);
      setFormValues({ nombre: '', descripcion: '', precio: '', categoria_id: '' });
      cargarProductos();
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      setMensaje('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white p-8 shadow-2xl rounded-3xl border-t-8 border-blue-600">
        <h1 className="text-2xl font-black mb-6 text-slate-800 flex items-center gap-2">
          {editandoId ? '✏️ Editando' : '📦 Nuevo Ingreso'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            value={formValues.nombre}
            onChange={(e) => setFormValues({...formValues, nombre: e.target.value})}
            required className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-blue-500 outline-none transition-all" 
            placeholder="Nombre del producto" 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="number" step="0.01" value={formValues.precio}
              onChange={(e) => setFormValues({...formValues, precio: e.target.value})}
              required className="w-full p-4 border-2 border-gray-100 rounded-2xl" placeholder="Precio ($)" 
            />
            
            <select 
              value={formValues.categoria_id}
              onChange={(e) => setFormValues({...formValues, categoria_id: e.target.value})}
              required className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-white"
            >
              <option value="">Rubro...</option>
              {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
            </select>
          </div>

          <textarea 
            value={formValues.descripcion}
            onChange={(e) => setFormValues({...formValues, descripcion: e.target.value})}
            className="w-full p-4 border-2 border-gray-100 rounded-2xl" 
            placeholder="Descripción..." 
            rows={4} 
          />

          <div className="bg-blue-50 p-6 rounded-2xl border-2 border-dashed border-blue-200">
            <label className="text-xs font-black text-blue-600 uppercase mb-2 block tracking-widest">Fotos</label>
            <input name="imagenes" type="file" accept="image/*" multiple required={!editandoId} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
          </div>

          <button type="submit" disabled={loading} className="w-full p-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black shadow-lg active:scale-95 transition-all">
            {loading ? 'Procesando...' : editandoId ? 'Guardar Cambios' : 'Publicar'}
          </button>
        </form>
        {mensaje && <div className="mt-6 text-center p-3 bg-blue-50 rounded-xl text-blue-700 font-bold">{mensaje}</div>}
      </div>

      {/* LISTADO CON LÁPIZ Y CESTO */}
      <div className="mt-10 grid gap-3">
        {productos.map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={p.imagenes?.[0] || 'https://placehold.co/100x100'} className="w-12 h-12 object-cover rounded-lg" />
                {p.imagenes?.length > 1 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                    {p.imagenes.length}
                  </span>
                )}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{p.nombre}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">{p.categorias?.nombre}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {/* BOTÓN EDITAR */}
              <button 
                onClick={() => {
                  setEditandoId(p.id);
                  setFormValues({
                    nombre: p.nombre,
                    descripcion: p.descripcion || '',
                    precio: p.precio.toString(),
                    categoria_id: p.categoria_id.toString()
                  });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
              >
                ✏️
              </button>

              {/* BOTÓN ELIMINAR (RECUPERADO) */}
              <button 
                onClick={() => eliminarProducto(p.id, p.nombre)}
                className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}