import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { onSnapshot, collection, query, getDocs, doc, updateDoc, orderBy, deleteDoc, limit } from "firebase/firestore";
import { motion } from "motion/react";
import { Users, Calendar, Scissors, TrendingUp, Search, Filter, MoreVertical, Check, X, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "../lib/utils";

export default function AdminDashboard({ profile }: any) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    confirmed: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data);

      const today = new Date().toDateString();
      const todayCount = data.filter((b: any) => new Date(b.date).toDateString() === today).length;
      const confirmed = data.filter((b: any) => b.status === "confirmed").length;
      
      setStats({
        total: data.length,
        today: todayCount,
        confirmed,
        revenue: data.length * 2800
      });
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    await updateDoc(doc(db, "bookings", id), { status });
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">Panel Master</h1>
          <p className="text-gray-500 font-medium">Gestión integral de Wesel Barbershop</p>
        </div>
        <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1 items-center">
          <button className="px-6 py-2 rounded-xl bg-white text-black font-bold text-sm">Resumen</button>
          <button className="px-6 py-2 rounded-xl text-gray-500 hover:text-white font-bold text-sm transition-colors">Barberos</button>
          <button className="px-6 py-2 rounded-xl text-gray-500 hover:text-white font-bold text-sm transition-colors">Ajustes</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Calendar />, label: "Total Reservas", val: stats.total, color: "text-blue-400" },
          { icon: <TrendingUp />, label: "Turnos del Día", val: stats.today, color: "text-green-400" },
          { icon: <Users />, label: "Activos", val: stats.confirmed, color: "text-purple-400" },
          { icon: <Scissors />, label: "Ganancia (Est.)", val: `$${stats.revenue.toLocaleString()}`, color: "text-white" },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-4"
          >
            <div className={cn("p-3 rounded-2xl bg-white/5 w-fit border border-white/10", item.color)}>
              {item.icon}
            </div>
            <div className="text-gray-500 text-xs uppercase tracking-widest font-bold">{item.label}</div>
            <div className="text-3xl font-bold">{item.val}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden">
        <div className="p-8 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-2xl font-bold tracking-tight">Turnos Recientes</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              placeholder="Buscar por cliente o barbero..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-gray-500 font-bold border-b border-white/10">
              <tr>
                <th className="px-8 py-4">Cliente</th>
                <th className="px-8 py-4">Barbero</th>
                <th className="px-8 py-4">Servicio / Sucursal</th>
                <th className="px-8 py-4">Fecha / Hora</th>
                <th className="px-8 py-4">Estado</th>
                <th className="px-8 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={6} className="px-8 py-20 text-center text-gray-500">Cargando datos maestros...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan={6} className="px-8 py-20 text-center text-gray-500">No hay reservas registradas.</td></tr>
              ) : (
                bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6 font-bold">{booking.customerName}</td>
                    <td className="px-8 py-6 text-gray-400">{booking.barberName}</td>
                    <td className="px-8 py-6">
                      <div className="text-white font-medium">{booking.service}</div>
                      <div className="text-gray-500 text-xs">{booking.locationName}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-white font-medium">{format(new Date(booking.date), "d MMM", { locale: es })}</div>
                      <div className="text-gray-500 text-xs">{booking.startTime} hs</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block",
                        booking.status === "confirmed" ? "bg-green-500/10 text-green-500" : 
                        booking.status === "cancelled" ? "bg-red-500/10 text-red-500" : "bg-white/10 text-white/40"
                      )}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleStatusUpdate(booking.id, "confirmed")}
                          className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20" title="Confirmar"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(booking.id, "cancelled")}
                          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20" title="Cancelar"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-8 text-center text-xs text-gray-600 uppercase tracking-widest border-t border-white/5">
          Wesel Management System v2.4.0
        </div>
      </div>
    </div>
  );
}
