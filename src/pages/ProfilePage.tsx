import React, { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { onSnapshot, collection, query, where, doc, updateDoc, orderBy } from "firebase/firestore";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin, Edit2, Check, User as UserIcon, LogOut, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

export default function ProfilePage({ profile, user }: any) {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const q = query(
      collection(db, "bookings"),
      where("customerId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, navigate]);

  if (!user || !profile) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-80 shrink-0">
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 text-center sticky top-32">
            <div className="w-24 h-24 rounded-full bg-white/10 mx-auto mb-6 flex items-center justify-center overflow-hidden border border-white/20">
              {profile.photoURL ? (
                <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={32} />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-1">{profile.displayName}</h2>
            <p className="text-gray-500 text-sm mb-6">{profile.email}</p>
            
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("bookings")}
                className={cn(
                  "w-full py-3 px-6 rounded-2xl text-left text-sm font-semibold transition-all flex items-center justify-between",
                  activeTab === "bookings" ? "bg-white text-black" : "bg-white/5 text-white/60 hover:bg-white/10"
                )}
              >
                Mis Turnos <ChevronRight size={16} />
              </button>
              <button 
                onClick={() => setActiveTab("settings")}
                className={cn(
                  "w-full py-3 px-6 rounded-2xl text-left text-sm font-semibold transition-all flex items-center justify-between",
                  activeTab === "settings" ? "bg-white text-black" : "bg-white/5 text-white/60 hover:bg-white/10"
                )}
              >
                Editar Perfil <ChevronRight size={16} />
              </button>
              <button 
                onClick={() => signOut(auth)}
                className="w-full py-3 px-6 rounded-2xl text-left text-sm font-semibold bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all flex items-center justify-between mt-4"
              >
                Cerrar Sesión <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1">
          <h1 className="text-4xl font-bold mb-8">
            {activeTab === "bookings" ? "Próximos Turnos" : "Ajustes de Perfil"}
          </h1>

          {activeTab === "bookings" ? (
            <div className="space-y-4">
              {loading ? (
                <div className="py-20 text-center text-gray-500">Cargando tus reservas...</div>
              ) : bookings.length === 0 ? (
                <div className="py-20 text-center bg-white/5 border border-dashed border-white/10 rounded-[32px]">
                  <p className="text-gray-500 mb-6">No tenés turnos agendados aún.</p>
                  <button 
                    onClick={() => navigate("/reservar")}
                    className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-all"
                  >
                    Agendar mi primer turno
                  </button>
                </div>
              ) : (
                bookings.map((booking: any) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={booking.id} 
                    className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                          booking.status === "confirmed" ? "bg-green-500 text-black" : "bg-white/10 text-white/40"
                        )}>
                          {booking.status === "confirmed" ? "Confirmado" : booking.status}
                        </div>
                        <span className="text-white/40 text-xs">{format(new Date(booking.createdAt), "d MMM, HH:mm", { locale: es })}</span>
                      </div>
                      <h3 className="text-xl font-bold">{booking.service}</h3>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} /> {booking.locationName}
                        </div>
                        <div className="flex items-center gap-2">
                          <UserIcon size={16} /> {booking.barberName}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col items-start md:items-end gap-2 w-full md:w-auto">
                      <div className="flex items-center gap-2 text-white font-bold text-lg">
                        <Calendar size={18} className="text-white/40" />
                        {format(new Date(booking.date), "d 'de' MMMM", { locale: es })}
                      </div>
                      <div className="flex items-center gap-2 text-white font-bold text-lg">
                        <Clock size={18} className="text-white/40" />
                        {booking.startTime} hs
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 p-10 rounded-[32px] space-y-8">
              <div className="space-y-4">
                <label className="text-sm text-gray-500">Nombre Completo</label>
                <input 
                  defaultValue={profile.displayName} 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-white focus:outline-none"
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm text-gray-500">WhatsApp</label>
                <input 
                  defaultValue={profile.phone} 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-white focus:outline-none"
                />
              </div>
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all">
                Guardar Cambios
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
