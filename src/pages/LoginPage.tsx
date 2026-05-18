import React, { useState } from "react";
import { auth, db } from "../lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    try {
      if (isRegister) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, { displayName: name });
        // Create user profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email,
          displayName: name,
          phone,
          role: "customer",
          createdAt: new Date().toISOString(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-black">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-xl"
      >
        <div className="text-center mb-10">
          <img src="image_4.png" alt="Logo" className="w-12 h-12 mx-auto mb-6 invert" />
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {isRegister ? "Crear cuenta" : "Bienvenido de vuelta"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isRegister ? "Unite a la experiencia premium de Wesel" : "Ingresá para gestionar tus reservas"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  name="name" 
                  type="text" 
                  placeholder="Nombre completo" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-white focus:outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  name="phone" 
                  type="tel" 
                  placeholder="WhatsApp (ej: 5411...)" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-white focus:outline-none transition-colors"
                />
              </div>
            </>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              name="email" 
              type="email" 
              placeholder="Mail" 
              required 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-white focus:outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              name="password" 
              type="password" 
              placeholder="Contraseña" 
              required 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-white focus:outline-none transition-colors"
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group"
          >
            {loading ? "Procesando..." : (isRegister ? "Registrarme" : "Iniciar Sesión")}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)} 
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            {isRegister ? "¿Ya tenés cuenta? Ingresá" : "¿Todavía no tenés cuenta? Create una"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
