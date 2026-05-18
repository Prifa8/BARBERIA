import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="w-full">
      <Hero />
      <ExperienceSection />
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
  return (
    <section className="bg-black py-40 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="glass-morphism border px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-apple-titanium w-fit">
            Titanium Performance
          </div>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10 max-w-4xl hero-text-gradient">
            Redefiniendo el arte de la barbería con ingeniería de precisión.
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
          {[
            { id: "01", title: "Técnica Superior", desc: "Formados con los estándares internacionales más exigentes para brindarte un corte impecable." },
            { id: "02", title: "Ambiente Premium", desc: "Un espacio diseñado para tu confort, fusionando lo rústico con la alta tecnología." },
            { id: "03", title: "Atención Elite", desc: "Cada cliente es único. Asesoramos tu look según tu fisonomía y estilo de vida." },
          ].map((item) => (
            <div key={item.id} className="space-y-4 group">
              <div className="text-white/10 text-7xl font-bold tracking-tighter group-hover:text-apple-titanium/20 transition-colors duration-500">{item.id}</div>
              <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
              <p className="text-white/40 leading-relaxed text-sm font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Horizontal Scroll Container */}
      <div className="relative mt-20">
        <div className="flex gap-6 overflow-x-auto px-6 md:px-[calc((100vw-1280px)/2)] lg:px-[calc((100vw-1280px)/2+24px)] snap-x snap-mandatory scrollbar-hide pb-10">
          {[
            { img: "image_0.png", title: "Cortes de Autor", category: "Signature" },
            { img: "image_1.png", title: "Barba Esculpida", category: "Precision" },
            { img: "image_2.png", title: "Acabado Perfecto", category: "Finish" },
            { img: "image_3.png", title: "Wesel Experience", category: "Luxury" },
            { img: "image_0.png", title: "Degradado High End", category: "Technique" },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="min-w-[85vw] md:min-w-[450px] lg:min-w-[600px] h-[500px] lg:h-[600px] rounded-[40px] overflow-hidden relative group snap-center cursor-grab active:cursor-grabbing border border-white/5 titanium-border"
            >
              <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={item.title} />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-10">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-apple-titanium mb-2 opacity-60">
                  {item.category}
                </span>
                <h3 className="text-white text-3xl lg:text-4xl font-bold tracking-tighter mb-6">{item.title}</h3>
                <Link to="/reservar" className="w-12 h-12 rounded-full glass-morphism border border-white/20 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <ChevronRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
          {/* Spacer for better end-scroll feel */}
          <div className="min-w-[10vw] h-10" />
        </div>

        {/* Navigation Indicator */}
        <div className="flex justify-center gap-2 mt-4 hidden md:flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
          ))}
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
