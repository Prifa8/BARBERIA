import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronRight, Calendar as CalendarIcon, Clock, Scissors, MapPin, User, ArrowLeft } from "lucide-react";
import { LOCATIONS, SERVICES, BARBERS } from "../constants";
import { auth, db } from "../lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { format, addDays, startOfToday, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "../lib/utils";

const STEPS = ["Sucursal", "Barbero", "Servicio", "Fecha y Hora"];

export default function BookingPage({ profile }: any) {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<any>({
    location: null,
    barber: null,
    service: null,
    date: null,
    time: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const completeBooking = async () => {
    if (!profile) {
      navigate("/login", { state: { from: { pathname: "/reservar" } } });
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        customerId: profile.uid,
        customerName: profile.displayName,
        customerPhone: profile.phone,
        locationId: selection.location.id,
        locationName: selection.location.name,
        barberId: selection.barber.uid,
        barberName: selection.barber.displayName,
        service: selection.service.name,
        date: selection.date.toISOString(),
        startTime: selection.time,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      });
      setStep(4); // Success step
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Reservar Turno</h1>
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-shrink-0">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                  step >= i ? "bg-white text-black" : "bg-white/10 text-white/40 border border-white/10"
                )}
              >
                {step > i ? <Check size={14} /> : i + 1}
              </div>
              <span className={cn("text-sm font-medium", step >= i ? "text-white" : "text-white/20")}>{s}</span>
              {i < STEPS.length - 1 && <ChevronRight size={14} className="text-white/10" />}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => { setSelection({ ...selection, location: loc }); handleNext(); }}
                className={cn(
                  "p-8 rounded-[32px] border text-left transition-all hover:bg-white/5 group",
                  selection.location?.id === loc.id ? "bg-white/10 border-white" : "bg-white/5 border-white/10"
                )}
              >
                <MapPin className="mb-6 text-gray-500 group-hover:text-white transition-colors" />
                <h3 className="text-xl font-bold mb-2">{loc.name}</h3>
                <p className="text-sm text-gray-500">{loc.address}</p>
              </button>
            ))}
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {BARBERS.map((barber) => (
              <button
                key={barber.uid}
                onClick={() => { setSelection({ ...selection, barber }); handleNext(); }}
                className={cn(
                  "p-6 rounded-[24px] border flex items-center gap-6 text-left transition-all apple-card",
                  selection.barber?.uid === barber.uid ? "bg-white/10 border-apple-titanium ring-1 ring-apple-titanium/30" : "bg-white/[0.03] border-white/10 shadow-lg"
                )}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-apple-titanium/50 grayscale group-hover:grayscale-0 transition-all">
                  <img src={barber.photoURL} alt={barber.displayName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{barber.displayName}</h3>
                  <p className="text-xs text-white/50 font-medium uppercase tracking-wider">{barber.bio?.split('.')[0]}</p>
                </div>
              </button>
            ))}
            <button 
              onClick={handleBack}
              className="md:col-span-2 text-center text-white/30 text-xs font-bold uppercase tracking-widest mt-4 hover:text-white transition-colors"
            >
              Volver
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => { setSelection({ ...selection, service }); handleNext(); }}
                className={cn(
                  "w-full p-6 rounded-3xl border flex items-center justify-between text-left transition-all hover:bg-white/5",
                  selection.service?.id === service.id ? "bg-white/10 border-white" : "bg-white/5 border-white/10"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Scissors size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-bold">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.duration} min</p>
                  </div>
                </div>
                <div className="text-xl font-bold">${service.price}</div>
              </button>
            ))}
            <button 
              onClick={handleBack}
              className="w-full text-center text-gray-500 mt-4 hover:text-white"
            >
              Volver
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {Array.from({ length: 14 }).map((_, i) => {
                const date = addDays(startOfToday(), i);
                const isSelected = selection.date && isSameDay(date, selection.date);
                return (
                  <button
                    key={i}
                    onClick={() => setSelection({ ...selection, date })}
                    className={cn(
                      "flex-shrink-0 w-20 h-28 rounded-3xl border flex flex-col items-center justify-center gap-1 transition-all",
                      isSelected ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    )}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                      {format(date, "EEE", { locale: es })}
                    </span>
                    <span className="text-2xl font-bold">{format(date, "d")}</span>
                  </button>
                );
              })}
            </div>

            {selection.date && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {["10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"].map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelection({ ...selection, time })}
                    className={cn(
                      "py-3 rounded-2xl border text-sm font-bold transition-all",
                      selection.time === time ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}

            {selection.date && selection.time && (
              <button
                onClick={completeBooking}
                disabled={loading}
                className="w-full bg-white text-black py-4 rounded-3xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-3"
              >
                {loading ? "Confirmando..." : "Confirmar Turno"}
                <Check size={20} />
              </button>
            )}

            <button 
              onClick={handleBack}
              className="w-full text-center text-gray-500 mt-4 hover:text-white"
            >
              Volver
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white/5 border border-white/10 rounded-[40px]"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="text-black" size={40} />
            </div>
            <h2 className="text-4xl font-bold mb-4">Turno Confirmado</h2>
            <p className="text-gray-400 max-w-xs mx-auto mb-10 text-balance">
              Tu reserva para el {format(selection.date, "d 'de' MMMM", { locale: es })} a las {selection.time} hs con {selection.barber.displayName} ha sido registrada con éxito.
            </p>
            <div className="flex flex-col gap-4 max-w-xs mx-auto">
              <button onClick={() => navigate("/perfil")} className="bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all">
                Ver Mis Turnos
              </button>
              <button onClick={() => navigate("/")} className="text-gray-500 text-sm font-medium hover:text-white transition-colors">
                Volver al Inicio
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
