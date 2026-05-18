import React from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { LOCATIONS } from "../constants";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || "";

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = React.useState(LOCATIONS[0]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-16 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Ubicaciones</h1>
        <p className="text-xl text-gray-500">
          Encontranos en los puntos más estratégicos de Buenos Aires. El mismo nivel de excelencia en cada sucursal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* List */}
        <div className="lg:col-span-4 space-y-4">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocation(loc)}
              className={cn(
                "w-full p-6 rounded-[20px] text-left transition-all border apple-card",
                selectedLocation.id === loc.id 
                  ? "bg-white/10 border-apple-titanium ring-1 ring-apple-titanium/50" 
                  : "bg-white/[0.03] border-white/10 text-white"
              )}
            >
              <h3 className="text-xl font-bold mb-1 tracking-tight">{loc.name}</h3>
              <p className="text-xs text-white/50 mb-6 font-medium">
                {loc.address}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-[11px] font-mono tracking-wider opacity-60">
                  <Phone size={14} className="opacity-50" /> {loc.phone}
                </div>
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.1em] text-apple-titanium">
                  <Clock size={14} className="opacity-50" /> 10:00 - 20:30 HS
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Map */}
        <div className="lg:col-span-8 h-[600px] rounded-[40px] overflow-hidden border border-white/10 relative">
          {!API_KEY ? (
            <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center p-12 text-center">
              <MapPin size={48} className="text-gray-600 mb-6" />
              <h2 className="text-2xl font-bold mb-4">Mapa no disponible</h2>
              <p className="text-gray-500 max-w-md">
                Configura tu clave de Google Maps Platform en los ajustes del proyecto para visualizar las sucursales.
              </p>
            </div>
          ) : (
            <APIProvider apiKey={API_KEY} version="weekly">
              <Map
                center={selectedLocation.coordinates}
                zoom={14}
                mapId="WESEL_MAP"
                disableDefaultUI={true}
                className="w-full h-full"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              >
                {LOCATIONS.map((loc) => (
                  <AdvancedMarker 
                    key={loc.id} 
                    position={loc.coordinates} 
                    title={loc.name}
                    onClick={() => setSelectedLocation(loc)}
                  >
                    <Pin background={selectedLocation.id === loc.id ? "#FFFFFF" : "#4b4b4b"} glyphColor={selectedLocation.id === loc.id ? "#000000" : "#FFFFFF"} borderColor="#000000" />
                  </AdvancedMarker>
                ))}
              </Map>
            </APIProvider>
          )}

          {/* Simple Floating Card for Selected Location (Mobile) */}
          <div className="absolute bottom-6 left-6 right-6 lg:hidden">
            <div className="bg-black/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
              <h3 className="font-bold text-lg mb-1">{selectedLocation.name}</h3>
              <p className="text-xs text-gray-400 mb-4">{selectedLocation.address}</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLocation.address)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-white"
              >
                Cómo llegar <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
