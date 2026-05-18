import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, User, Calendar, MapPin, Info, LogOut, ChevronRight, LayoutDashboard } from "lucide-react";
import { auth, db } from "./lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { UserProfile } from "./types";
import LandingPage from "./pages/LandingPage";
import BookingPage from "./pages/BookingPage";
import LocationsPage from "./pages/LocationsPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import { cn } from "./lib/utils";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } else {
        setProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
        <Header 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          profile={profile} 
          user={user} 
        />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/reservar" element={<BookingPage profile={profile} />} />
            <Route path="/ubicaciones" element={<LocationsPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/perfil" element={<ProfilePage profile={profile} user={user} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin/*" 
              element={
                profile?.role === "admin" ? (
                  <AdminDashboard profile={profile} />
                ) : (
                  <div className="flex items-center justify-center h-screen">
                    <p className="text-gray-400">Acceso no autorizado</p>
                  </div>
                )
              } 
            />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </Router>
  );
}

function Header({ isMenuOpen, setIsMenuOpen, profile, user }: any) {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b h-[54px] flex items-center">
      <div className="max-w-7xl w-full mx-auto px-10 flex items-center justify-between">
        {/* Left Links */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest uppercase text-white/60">
          <Link to="/nosotros" className={cn("hover:text-white transition-colors", pathname === "/nosotros" && "text-white")}>¿Quiénes somos?</Link>
          <Link to="/reservar" className={cn("hover:text-white transition-colors", pathname === "/reservar" && "text-white")}>Reservar</Link>
          <Link to="/ubicaciones" className={cn("hover:text-white transition-colors", pathname === "/ubicaciones" && "text-white")}>Ubicaciones</Link>
        </div>

        {/* Center Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center p-1.5" style={{ mask: 'radial-gradient(circle, transparent 30%, black 31%)' }}>
             <img src="image_4.png" alt="W" className="w-full h-full invert" />
          </div>
        </Link>

        {/* Right Links */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest uppercase text-white/60">
          {user ? (
            <div className="flex items-center gap-6">
              {profile?.role === "admin" && (
                <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1">
                  Admin
                </Link>
              )}
              <Link to="/perfil" className={cn("hover:text-white transition-colors", pathname === "/perfil" && "text-white")}>
                Mi Cuenta
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="hover:text-white transition-colors">Mi Cuenta</Link>
              <Link to="/login" className="hover:text-white transition-colors">Iniciar Sesión</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-black border-b border-white/10 md:hidden p-6 flex flex-col gap-6"
          >
            <Link to="/nosotros" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>¿Quiénes somos?</Link>
            <Link to="/reservar" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Reservar</Link>
            <Link to="/ubicaciones" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Dónde estamos</Link>
            <hr className="border-white/10" />
            {user ? (
              <>
                <Link to="/perfil" className="text-xl text-gray-400" onClick={() => setIsMenuOpen(false)}>Mi Perfil</Link>
                {profile?.role === "admin" && (
                  <Link to="/admin" className="text-xl text-gray-400" onClick={() => setIsMenuOpen(false)}>Panel Admin</Link>
                )}
                <button 
                  onClick={() => {
                    signOut(auth);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-red-500 font-medium"
                >
                  <LogOut size={18} /> Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to="/login" className="text-xl text-gray-400 font-medium" onClick={() => setIsMenuOpen(false)}>Iniciar Sesión</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-white/5 py-16 px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-4 grayscale opacity-40 hover:opacity-100 transition-opacity">
          <img src="image_4.png" alt="W" className="w-6 h-6 invert" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">WESEL BARBERSHOP</span>
        </div>
        
        <div className="flex items-center gap-10 text-[10px] font-bold tracking-[0.1em] uppercase text-white/40">
          <Link to="/nosotros" className="hover:text-white transition-colors">Nosotros</Link>
          <Link to="/reservar" className="hover:text-white transition-colors">Reservar</Link>
          <Link to="/ubicaciones" className="hover:text-white transition-colors">Sucursales</Link>
        </div>

        <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">
          Titanium Series
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-medium uppercase tracking-widest text-white/20">
        <p>© 2024 Wesel Experience. Todos los derechos reservados.</p>
        <p>Built with Precision Engineering</p>
      </div>
    </footer>
  );
}
