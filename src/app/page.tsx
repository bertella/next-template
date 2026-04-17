"use client";

import Image from "next/image";
import { 
  Phone, 
  MessageCircle, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Scissors, 
  Activity, 
  Stethoscope, 
  ShieldCheck, 
  ChevronRight,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { WhatsAppFloating } from "@/components/landing/WhatsAppFloating";
import { AICopyGenerator } from "@/components/landing/AICopyGenerator";
import { Navbar } from "@/components/landing/Navbar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LandingPage() {
  const images = PlaceHolderImages;
  const heroImg = images.find(img => img.id === "hero-vet");

  const whatsappUrl = "https://wa.me/5493512323695?text=Hola%20Animal%20Life,%20necesito%20realizar%20una%20consulta.";

  const trackEvent = (label: string) => {
    console.log(`Tracking event: ${label}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" />
                Atención Inmediata en Córdoba
              </div>
              <h1 className="text-4xl md:text-6xl font-headline font-black leading-[1.1]">
                Tu veterinaria de confianza en <span className="text-primary">Nuevo Poeta Lugones</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Brindamos atención profesional, cercana y personalizada para el bienestar de tu mascota. 
                <span className="font-semibold block mt-2 text-foreground">Urgencias disponibles 24/7 para tu tranquilidad.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="h-14 px-8 text-lg font-bold bg-[#25D366] hover:bg-[#128C7E] border-none shadow-lg">
                  <a href={whatsappUrl} target="_blank" onClick={() => trackEvent("WhatsApp Hero")}>
                    <MessageCircle className="mr-2 w-6 h-6" />
                    Consultar por WhatsApp
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg font-bold border-primary text-primary hover:bg-primary/5">
                  <a href="#servicios">Ver Servicios</a>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-muted relative">
                      <Image src={`https://picsum.photos/seed/face${i}/100/100`} alt="Client" width={40} height={40} className="object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium">
                  <span className="text-primary font-bold">500+</span> Mascotas atendidas en la zona
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl group-hover:bg-primary/20 transition-all"></div>
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-muted">
                {heroImg ? (
                  <Image 
                    src={heroImg.imageUrl} 
                    alt={heroImg.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImg.imageHint}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground italic">
                    Cargando imagen...
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-border animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-accent">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-bold">Excelencia Médica</p>
                  <p className="text-xs text-muted-foreground">Profesionales certificados</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black">Servicios veterinarios integrales</h2>
              <p className="text-muted-foreground">Especialistas en el cuidado de la salud animal en Córdoba con equipamiento de vanguardia.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: "Castraciones", 
                  desc: "Control reproductivo seguro con anestesia monitoreada y recuperación rápida.",
                  icon: <Activity className="w-6 h-6" />,
                  img: images.find(i => i.id === "service-castration")?.imageUrl,
                  hint: "pet surgery"
                },
                { 
                  title: "Cirugías", 
                  desc: "Intervenciones quirúrgicas de alta y baja complejidad con enfoque profesional.",
                  icon: <Stethoscope className="w-6 h-6" />,
                  img: images.find(i => i.id === "service-surgery")?.imageUrl,
                  hint: "surgery tools"
                },
                { 
                  title: "Peluquería", 
                  desc: "Estética canina y felina. Baño, corte de pelo y uñas con trato súper cariñoso.",
                  icon: <Scissors className="w-6 h-6" />,
                  img: images.find(i => i.id === "service-grooming")?.imageUrl,
                  hint: "dog grooming"
                },
                { 
                  title: "Atención Clínica", 
                  desc: "Consultas generales, vacunas y controles de salud para todas las edades.",
                  icon: <Heart className="w-6 h-6" />,
                  img: images.find(i => i.id === "service-clinic")?.imageUrl,
                  hint: "vet clinic"
                },
                { 
                  title: "Urgencias", 
                  desc: "Atención inmediata para situaciones críticas. Tu tranquilidad es nuestra prioridad.",
                  icon: <Clock className="w-6 h-6" />,
                  img: images.find(i => i.id === "service-emergency")?.imageUrl,
                  hint: "vet emergency"
                },
                { 
                  title: "Análisis Clínicos", 
                  desc: "Diagnósticos precisos mediante laboratorio especializado para resultados rápidos.",
                  icon: <ShieldCheck className="w-6 h-6" />,
                  img: images.find(i => i.id === "service-lab")?.imageUrl,
                  hint: "medical lab"
                }
              ].map((service, i) => (
                <Card key={i} className="overflow-hidden border-border group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 bg-muted">
                    {service.img && (
                      <Image 
                        src={service.img} 
                        alt={service.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={service.hint}
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-primary text-white p-2.5 rounded-xl shadow-lg">
                      {service.icon}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
                    <Button variant="link" className="p-0 h-auto font-bold text-primary flex items-center group/btn" asChild>
                      <a href={whatsappUrl} target="_blank">
                        Consultar servicio
                        <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits/Differentials */}
        <section id="beneficios" className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-black">¿Por qué elegir Animal Life?</h2>
              <p className="text-muted-foreground text-lg">Entendemos que tu mascota es parte de tu familia. Por eso nos enfocamos en ofrecer algo más que medicina.</p>
              
              <div className="space-y-6">
                {[
                  { title: "Atención Rápida", desc: "Sabemos que el tiempo es vital en urgencias. Reducimos la espera al mínimo.", icon: <Clock className="text-accent" /> },
                  { title: "Cercanía y Confianza", desc: "Estamos en Nuevo Poeta Lugones, siempre cerca cuando nos necesitás.", icon: <MapPin className="text-accent" /> },
                  { title: "Trato Personalizado", desc: "Conocemos a cada paciente por su nombre y su historia clínica.", icon: <CheckCircle className="text-accent" /> },
                  { title: "Profesionalismo", desc: "Capacitación constante en las últimas técnicas de medicina veterinaria.", icon: <ShieldCheck className="text-accent" /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button size="lg" asChild className="font-bold bg-primary hover:bg-primary/90 mt-4 shadow-lg shadow-primary/20">
                <a href={whatsappUrl} target="_blank">Agendar una visita ahora</a>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative bg-muted">
                {images.find(img => img.id === "trust-team")?.imageUrl && (
                  <Image 
                    src={images.find(img => img.id === "trust-team")!.imageUrl} 
                    alt="Equipo veterinario" 
                    fill 
                    className="object-cover"
                  />
                )}
              </div>
              <div className="absolute top-12 -right-6 bg-accent text-white p-8 rounded-3xl shadow-xl space-y-2 hidden sm:block max-w-[240px]">
                <p className="text-3xl font-black">10+</p>
                <p className="text-sm font-medium opacity-90 leading-tight">Años cuidando mascotas en Córdoba</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Copy Generator Tool */}
        <section className="py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-black">Potenciamos tu comunicación con IA</h2>
              <p className="text-muted-foreground">Herramientas que ayudan al negocio a crecer. Generá variaciones de copy para tus anuncios.</p>
            </div>
            <AICopyGenerator />
          </div>
        </section>

        {/* Map and Location */}
        <section id="ubicacion" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black">Visitanos en Nuevo Poeta Lugones</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="text-primary shrink-0" />
                    <div>
                      <p className="font-bold">Dirección</p>
                      <p className="text-muted-foreground">Damian Garat 2630, X5008AHO Córdoba, Argentina</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="text-primary shrink-0" />
                    <div>
                      <p className="font-bold">Horarios de Atención</p>
                      <p className="text-muted-foreground">Lunes a Viernes: 09:00 - 20:00</p>
                      <p className="text-muted-foreground">Sábados: 09:00 - 13:00</p>
                      <p className="text-primary font-bold mt-1 italic">Urgencias: Consultar disponibilidad vía WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="text-primary shrink-0" />
                    <div>
                      <p className="font-bold">Teléfono Directo</p>
                      <a href="tel:03512323695" className="text-lg font-bold hover:underline">0351 232-3695</a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-primary font-bold shadow-lg" asChild>
                    <a href="https://maps.google.com/?q=Damian Garat 2630, X5008AHO Córdoba" target="_blank">
                      Ver en Google Maps
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-accent text-accent font-bold" asChild>
                    <a href={whatsappUrl} target="_blank">
                      <MessageCircle className="mr-2 w-5 h-5" />
                      Preguntar Cómo Llegar
                    </a>
                  </Button>
                </div>
              </div>
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-border min-h-[400px] relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.2458421868494!2d-64.20456482343992!3d-31.352199974292153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432997184518423%3A0x86134b7f08b38779!2sDami%C3%A1n%20Garat%202630%2C%20X5008AHO%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1711234567890!5m2!1ses!2sar" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Animal Life"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-black">Preguntas Frecuentes</h2>
              <p className="text-muted-foreground">Despejá tus dudas sobre la atención veterinaria de tu mascota.</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "¿Atienden urgencias los fines de semana?", a: "Sí, contamos con un servicio de atención para urgencias. Te recomendamos contactarnos por WhatsApp primero para confirmar disponibilidad inmediata y prepararnos para recibirte." },
                { q: "¿Necesito turno previo para castraciones?", a: "Sí, para castraciones y cirugías programadas es necesario solicitar un turno con anticipación. Esto nos permite asegurar que tu mascota cumpla con el ayuno y los requisitos pre-quirúrgicos necesarios." },
                { q: "¿Qué vacunas son obligatorias para perros y gatos?", a: "En Argentina, la vacuna Antirrábica es obligatoria por ley. Además, recomendamos la Quíntuple/Sextuple en perros y la Triple Felina en gatos para una protección completa." },
                { q: "¿Hacen atención a domicilio en Poeta Lugones?", a: "Realizamos visitas a domicilio programadas según la zona. Consultanos disponibilidad y costos de traslado por WhatsApp." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white px-6 rounded-2xl border border-border shadow-sm">
                  <AccordionTrigger className="text-left font-bold py-6 hover:no-underline hover:text-primary">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
            <Heart className="w-96 h-96 fill-current" />
          </div>
          <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">¿Tu mascota necesita atención hoy?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">No esperes más. Un diagnóstico temprano puede salvar vidas. Estamos listos para ayudarte ahora mismo.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-16 px-10 text-xl font-black bg-white text-primary hover:bg-secondary border-none shadow-2xl" asChild>
                <a href={whatsappUrl} target="_blank" onClick={() => trackEvent("WhatsApp Final CTA")}>
                  <MessageCircle className="mr-2 w-6 h-6 fill-primary" />
                  Contactar por WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-black border-white text-white hover:bg-white/10" asChild>
                <a href="tel:03512323695" onClick={() => trackEvent("Phone Final CTA")}>
                  Llamar ahora
                </a>
              </Button>
            </div>
            <p className="text-sm font-medium opacity-70">Veterinaria Animal Life | Tu tranquilidad, su bienestar.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg text-white">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <span className="font-headline font-bold text-2xl tracking-tight">Animal Life</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Especialistas en medicina veterinaria preventiva y curativa en Córdoba. Cuidamos a tus mascotas con el amor y profesionalismo que se merecen.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary transition-colors cursor-pointer" />
                <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary transition-colors cursor-pointer" />
                <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary transition-colors cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Servicios</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#servicios" className="hover:text-primary transition-colors">Castraciones y Cirugías</a></li>
                <li><a href="#servicios" className="hover:text-primary transition-colors">Clínica Médica General</a></li>
                <li><a href="#servicios" className="hover:text-primary transition-colors">Peluquería Canina</a></li>
                <li><a href="#servicios" className="hover:text-primary transition-colors">Urgencias Veterinarias</a></li>
                <li><a href="#servicios" className="hover:text-primary transition-colors">Vacunación y Desparasitación</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Contacto</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>Damian Garat 2630, Nuevo Poeta Lugones, Córdoba.</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:03512323695" className="hover:text-primary transition-colors">0351 232-3695</a>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="w-5 h-5 text-primary shrink-0" />
                  <a href={whatsappUrl} target="_blank" className="hover:text-primary transition-colors">Chat de WhatsApp</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Ubicación Estratégica</h4>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Estamos ubicados en el corazón de Nuevo Poeta Lugones, zona norte de Córdoba, con fácil acceso y estacionamiento.
              </p>
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-foreground font-bold" asChild>
                <a href="#ubicacion">Ver mapa interactivo</a>
              </Button>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
            <p>© {new Date().getFullYear()} Veterinaria Animal Life. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">SEO Local</a>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFloating />
    </div>
  );
}