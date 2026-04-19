
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen_url: string;
}

export default function HomePage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('productos')
        .select('*');
      
      if (error) {
        console.error('Error fetching productos:', error);
      } else {
        setProductos(data || []);
      }
      setLoading(false);
    };

    fetchProductos();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };

  const addToCart = (nombre: string) => {
    alert(`Has añadido ${nombre} al carrito`);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Nuestra Colección
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre productos exclusivos diseñados con la mejor calidad y estilo para tu día a día.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-xl animate-pulse">Cargando productos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productos.map((producto) => (
              <Card key={producto.id} className="border-none shadow-none group">
                <CardContent className="p-0 mb-4 overflow-hidden rounded-xl bg-gray-100 aspect-square relative">
                  <img
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </CardContent>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-gray-800">{producto.nombre}</h3>
                  <p className="text-gray-600 font-medium">{formatCurrency(producto.precio)}</p>
                </div>
                <CardFooter className="p-0 mt-4">
                  <Button 
                    onClick={() => addToCart(producto.nombre)}
                    className="w-full bg-black hover:bg-gray-800 text-white rounded-lg py-6 transition-colors"
                  >
                    Añadir al carrito
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!loading && productos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No se encontraron productos disponibles.</p>
          </div>
        )}
      </section>
    </main>
  );
}