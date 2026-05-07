"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function PopularDestinations({ onCardClick }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch destinations dari Supabase saat halaman load
  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await fetch("/api/destinations");
        if (!res.ok) throw new Error("Gagal fetch destinations");
        const data = await res.json();
        setDestinations(data || []);
      } catch (err) {
        console.error("❌ Error fetch destinations:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-15 md:py-[60px]">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          Popular destination
        </h2>
        <p className="text-base text-text-secondary">
          Discover the most loved destinations by travelers worldwide
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-text-secondary">
          Loading destinations...
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          ❌ {error}. Pastikan Supabase sudah ter-setup.
        </div>
      ) : destinations.length === 0 ? (
        <div className="text-center py-10 text-text-secondary">
          Belum ada destinations. Tambahkan via Supabase dashboard.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => {
            const cityName = destination.name.split(",")[0];
            return (
              <div
                key={destination.id}
                onClick={() => onCardClick(cityName)}
                className="bg-white rounded-2xl overflow-hidden cursor-pointer transition border border-border-light hover:-translate-y-2 hover:shadow-large group"
              >
                <div className="relative h-[180px] overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.08]"
                  />
                  <span className="absolute top-3 left-3 z-10 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-text-primary shadow-subtle">
                    {destination.tag}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-text-muted mb-1">
                    Your City → {cityName}
                  </p>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-xs text-text-secondary mb-3">
                    Explore with AI Planner
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-text-muted">From</span>
                    <span className="text-lg font-bold text-text-primary">
                      AI Trip
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
