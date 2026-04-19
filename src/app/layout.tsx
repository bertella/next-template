import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from '@next/third-parties/google';

// 1. Definición de Metadatos (SEO optimizado para DoctaData Shop)
export const metadata: Metadata = {
  title: 'DoctaData Shop | Soluciones Digitales en Córdoba',
  description: 'Catálogo digital y soluciones tecnológicas profesionales de DoctaData. Calidad y eficiencia para tu negocio en Córdoba.',
  keywords: [
    'DoctaData', 
    'desarrollo web Córdoba', 
    'catálogo digital', 
    'soluciones IT', 
    'software de gestión'
  ],
  openGraph: {
    title: 'DoctaData Shop - Innovación en cada producto',
    description: 'Explora nuestro catálogo de productos y herramientas digitales diseñadas para el mercado actual.',
    locale: 'es_AR',
    type: 'website',
  },
};

export default function RooGIT AtLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Optimizamos la carga de fuentes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        
        {/* Componentes Globales de UI */}
        <Toaster />

        {/* Google Analytics 4 
          He mantenido tu ID de Analytics actual por si quieres seguir midiendo tráfico.
        */}
        <GoogleAnalytics gaId="G-DZ9FW6PVHK" />
      </body>
    </html>
  );
}