'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data } = await supabase.from('productos').select('*');
      setProductos(data || []);
      setLoading(false);
    };
    fetchProductos();
  }, []);

  return (
    <main className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">DoctaData Shop</h1>
      {loading ? <p>Cargando...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productos.map(p => (
            <div key={p.id} className="border p-4 rounded-lg">
              <img src={p.imagen_url} alt={p.nombre} className="w-full h-48 object-cover mb-4" />
              <h2 className="font-bold text-xl">{p.nombre}</h2>
              <p className="text-blue-600 font-bold">$ {p.precio}</p>
              <button className="bg-black text-white px-4 py-2 mt-4 w-full">Comprar</button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}