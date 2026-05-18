import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="w-full">
      <Hero />
      <ExperienceSection />
      <ImageGrid />
      <CtaSection />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-bg-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-bg-dark/50 to-bg-dark z-10" />
        <img 
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1000" 
          className="w-full h-full object-cover opacity-30" 
          alt="Barber background"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 flex flex-col items-center"
      >
        <div className="glass-morphism border px-4 py-1.5 rounded-full mb-8 text-[10px] font-bold tracking-[0.15em] uppercase text-apple-titanium">
          Nueva Sede Recoleta
        </div>
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 hero-text-gradient">
          EXPERIENCIA PRO.
        </h1>
        <p className="text-lg md:text-xl text-white/60 font-medium max-w-xl balance leading-relaxed">
          Redefiniendo el arte de la barbería urbana con ingeniería de precisión y estética de lujo.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link to="/reservar" className="bg-white text-black px-10 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-apple-titanium transition-all hover:scale-105 active:scale-95 group">
            Agendar Turno Pro
          </Link>
          <Link to="/nosotros" className="text-white bg-white/5 border border-white/10 px-10 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-white/10 transition-all">
            Descubrir Wesel
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Titanium Series</span>
        <div className="w-px h-12 bg-linear-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}

function ExperienceSection() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.1, 0.4], [0, -1000]);

  return (
    <section className="bg-black py-40 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-10 max-w-3xl">
          Redefiniendo el arte de la barbería con precisión quirúrgica.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="text-white/20 text-6xl font-bold tracking-tighter">01</div>
            <h3 className="text-xl font-semibold">Técnica Superior</h3>
            <p className="text-gray-500 leading-relaxed">
              Formados con los estándares internacionales más exigentes para brindarte un corte impecable.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-white/20 text-6xl font-bold tracking-tighter">02</div>
            <h3 className="text-xl font-semibold">Ambiente Premium</h3>
            <p className="text-gray-500 leading-relaxed">
              Un espacio diseñado para tu confort, fusionando lo rústico con la alta tecnología.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-white/20 text-6xl font-bold tracking-tighter">03</div>
            <h3 className="text-xl font-semibold">Atención Personalizada</h3>
            <p className="text-gray-500 leading-relaxed">
              Porque cada cliente es único, asesoramos tu look según tu perfil y estilo de vida.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Content like Apple Website */}
      <div className="relative h-[400px] mt-20">
        <motion.div style={{ x }} className="flex gap-8 px-6">
          {[
            { img: "image_0.png", title: "Cortes de Autor" },
            { img: "image_1.png", title: "Barba Esculpida" },
            { img: "image_2.png", title: "Acabado Perfecto" },
            { img: "image_3.png", title: "Wesel Experience" },
            { img: "image_0.png", title: "Degradado High End" },
          ].map((item, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[600px] h-[400px] rounded-3xl overflow-hidden relative group cursor-pointer">
              <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <p className="text-white text-2xl font-bold">{item.title}</p>
                <div className="mt-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ImageGrid() {
  return (
    <section className="bg-black py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-2xl">
            Tu mejor versión <br /> está por venir.
          </h2>
          <p className="text-gray-500 max-w-sm mb-4">
            Inspirados en la estética urbana y el lujo moderno, creamos una experiencia que va más allá de un simple corte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2 aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10">
            <img src="image_3.png" className="w-full h-full object-cover" alt="Interior" />
          </div>
          <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-white/5 border border-white/10">
            <img src="image_0.png" className="w-full h-full object-cover" alt="Barber" />
          </div>
          <div className="aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10">
            <img src="image_1.png" className="w-full h-full object-cover" alt="Team" />
          </div>
          <div className="md:col-span-2 aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10">
            <img src="image_2.png" className="w-full h-full object-cover" alt="Fade" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-white text-black py-40 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-10">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tight">VIVÍ WESEL.</h2>
        <p className="text-xl md:text-2xl text-black/60 leading-relaxed font-medium">
          No somos solo una barbería. Somos un estándar. Asegurá tu lugar en cualquiera de nuestras sucursales hoy mismo.
        </p>
        <Link 
          to="/reservar" 
          className="inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform group"
        >
          Agendar ahora <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
