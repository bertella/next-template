
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
  Heart,
  Instagram,
  Facebook,
  Mail
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
import { Navbar } from "@/components/landing/Navbar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "@/components/ui/separator";

export default function LandingPage() {
  const whatsappUrl = "https://wa.me/5493512323695?text=Hola%20Animal%20Life,%20necesito%20realizar%20una%20consulta.";
  
  const heroImageData = PlaceHolderImages.find(img => img.id === "hero-vet");
  const teamImageData = PlaceHolderImages.find(img => img.id === "trust-team");

  const servicesList = [
    { 
      id: "service-castration",
      title: "Castraciones", 
      desc: "Control reproductivo seguro con anestesia monitoreada y recuperación rápida.",
      icon: <Activity className="w-6 h-6" />,
      hint: "pet surgery"
    },
    { 
      id: "service-surgery",
      title: "Cirugías", 
      desc: "Intervenciones quirúrgicas de alta y baja complejidad con enfoque profesional.",
      icon: <Stethoscope className="w-6 h-6" />,
      hint: "surgery tools"
    },
    { 
      id: "service-grooming",
      title: "Peluquería", 
      desc: "Estética canina y felina. Baño, corte de pelo y uñas con trato súper cariñoso.",
      icon: <Scissors className="w-6 h-6" />,
      hint: "dog grooming"
    },
    { 
      id: "service-clinic",
      title: "Atención Clínica", 
      desc: "Consultas generales, vacunas y controles de salud para todas las edades.",
      icon: <Heart className="w-6 h-6" />,
      hint: "vet clinic"
    },
    { 
      id: "service-emergency",
      title: "Urgencias", 
      desc: "Atención inmediata para situaciones críticas. Tu tranquilidad es nuestra prioridad.",
      icon: <Clock className="w-6 h-6" />,
      hint: "vet emergency"
    },
    { 
      id: "service-lab",
      title: "Análisis Clínicos", 
      desc: "Diagnósticos precisos mediante laboratorio especializado para resultados rápidos.",
      icon: <ShieldCheck className="w-6 h-6" />,
      hint: "medical lab"
    }
  ];

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
                <span className="font-semibold block mt-2 text-foreground">Urgencias disponibles para tu tranquilidad.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="h-14 px-8 text-lg font-bold bg-[#25D366] hover:bg-[#128C7E] border-none shadow-lg">
                  <a href={whatsappUrl} target="_blank">
                    <MessageCircle className="mr-2 w-6 h-6" />
                    Consultar por WhatsApp
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg font-bold border-primary text-primary hover:bg-primary/5">
                  <a href="#servicios">Ver Servicios</a>
                </Button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl group-hover:bg-primary/20 transition-all"></div>
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-muted">
                {heroImageData && (
                  <Image 
                    src={heroImageData.imageUrl}
                    alt={heroImageData.description}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint="veterinaria cordoba"
                  />
                )}
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
              {servicesList.map((service, i) => {
                const imgData = PlaceHolderImages.find(img => img.id === service.id);
                return (
                  <Card key={i} className="overflow-hidden border-border group hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 bg-muted">
                      {imgData && (
                        <Image 
                          src={imgData.imageUrl} 
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
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
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
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative bg-muted">
                {teamImageData && (
                  <Image  
                    src={teamImageData.imageUrl} 
                    alt={teamImageData.description}
                    fill 
                    className="object-cover"
                    data-ai-hint="veterinary team"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section id="ubicacion" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-foreground">¿Dónde estamos?</h2>
              <p className="text-muted-foreground">Vení a visitarnos en Nuevo Poeta Lugones. Te esperamos con el mejor cuidado para tu mascota.</p>
            </div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-muted aspect-video md:aspect-[21/9]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.495270273874!2d-64.2014072!3d-31.3729227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432997238241b31%3A0xb5b73307567e780d!2sDami%C3%A1n%20Garat%202630%2C%20X5008%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-md bg-secondary/10">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Dirección</h4>
                    <p className="text-sm text-muted-foreground">Damian Garat 2630, Córdoba</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-secondary/10">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Teléfono</h4>
                    <p className="text-sm text-muted-foreground">0351 232-3695</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-secondary/10">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Horario</h4>
                    <p className="text-sm text-muted-foreground">Lun a Sáb: 9:00 - 13:30 | 16:00 - 20:00</p>
                  </div>
                </CardContent>
              </Card>
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
                { q: "¿Atienden urgencias los fines de semana?", a: "Sí, contamos con un servicio de atención para urgencias. Te recomendamos contactarnos por WhatsApp primero." },
                { q: "¿Necesito turno previo para castraciones?", a: "Sí, para castraciones y cirugías programadas es necesario solicitar un turno con anticipación." },
                { q: "¿Hacen atención a domicilio en Poeta Lugones?", a: "Realizamos visitas a domicilio programadas según la zona. Consultanos disponibilidad." }
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
      </main>

      {/* Professional Footer */}
      <footer className="bg-foreground text-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg text-white">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <span className="font-headline font-bold text-2xl tracking-tight">Animal Life</span>
              </div>
              <p className="text-white/60 leading-relaxed text-sm">
                Comprometidos con la salud y el bienestar de tus mascotas en Córdoba. Brindamos atención veterinaria de alta calidad con un toque humano y profesional.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="mailto:info@animallife.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold">Enlaces Rápidos</h4>
              <nav className="flex flex-col gap-4 text-sm text-white/60">
                <a href="#top" className="hover:text-primary transition-colors">Inicio</a>
                <a href="#servicios" className="hover:text-primary transition-colors">Nuestros Servicios</a>
                <a href="#beneficios" className="hover:text-primary transition-colors">¿Por qué elegirnos?</a>
                <a href="#ubicacion" className="hover:text-primary transition-colors">Dónde Estamos</a>
                <a href="#faq" className="hover:text-primary transition-colors">Preguntas Frecuentes</a>
              </nav>
            </div>

            {/* Column 3: Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold">Contacto</h4>
              <div className="space-y-4 text-sm text-white/60">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>Damian Garat 2630,<br />X5008AHO Córdoba</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:03512323695" className="hover:text-primary transition-colors">0351 232-3695</a>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-primary shrink-0" />
                  <a href={whatsappUrl} target="_blank" className="hover:text-primary transition-colors">WhatsApp Directo</a>
                </div>
              </div>
            </div>

            {/* Column 4: Hours */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold">Horarios de Atención</h4>
              <div className="space-y-3 text-sm text-white/60">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span>Lunes a Viernes</span>
                  <span className="text-white font-medium">9:00 - 13:30 | 16:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span>Sábados</span>
                  <span className="text-white font-medium">9:00 - 13:30</span>
                </div>
                <div className="flex justify-between items-center text-primary font-bold pt-2">
                  <span>Urgencias</span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Consultar WhatsApp
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-white/10 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
            <p>© {new Date().getFullYear()} Veterinaria Animal Life. Todos los derechos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Políticas de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFloating />
    </div>
  );
}
