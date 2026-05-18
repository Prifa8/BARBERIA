import React from "react";
import { motion } from "motion/react";
import { BARBERS } from "../constants";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 overflow-hidden">
      <section className="px-6 max-w-7xl mx-auto mb-40 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-bold tracking-tighter mb-10"
        >
          NUESTRA HISTORIA.
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center text-left">
          <div className="space-y-8">
            <p className="text-2xl text-gray-300 leading-relaxed font-light">
              Wesel Barbershop nació de un sueño de elevar el estándar del cuidado masculino en Argentina. No buscamos ser solo una barbería, buscamos ser un refugio de estilo.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              Inspirados en la precisión de los maestros barberos clásicos y la innovación tecnológica de las grandes metrópolis, creamos un concepto único que fusiona técnica superior con una atención al detalle sin precedentes.
            </p>
          </div>
          <div className="rounded-[40px] overflow-hidden aspect-[4/5] bg-white/5 border border-white/10">
            <img src="image_3.png" alt="Shop Interior" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white text-black py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-20">EL EQUIPO.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BARBERS.map((barber, i) => (
              <motion.div 
                key={barber.uid}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-black/5 p-8 rounded-[40px]"
              >
                <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-3xl overflow-hidden grayscale">
                  <img src={barber.photoURL} alt={barber.displayName} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold">{barber.displayName}</h3>
                  <p className="text-black/60 text-lg font-medium">{barber.bio}</p>
                  <div className="flex gap-2">
                    <span className="px-4 py-1 rounded-full border border-black/20 text-xs font-bold uppercase tracking-widest">Premium Barber</span>
                    <span className="px-4 py-1 rounded-full border border-black/20 text-xs font-bold uppercase tracking-widest">Style Specialist</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 opacity-20">ESTÁNDAR WESEL.</h2>
        <p className="text-2xl text-gray-500 max-w-4xl mx-auto mb-20 leading-relaxed italic">
          "La diferencia entre un buen corte y un corte Wesel es la obsesión por la perfección en cada milímetro."
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Clientes Satisfechos", val: "+15k" },
            { label: "Años de Experiencia", val: "10" },
            { label: "Sucursales", val: "3" },
            { label: "Barberos Elite", val: "12" },
          ].map((stat, i) => (
            <div key={stat.label} className="space-y-2">
              <div className="text-4xl md:text-6xl font-bold tracking-tighter">{stat.val}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
