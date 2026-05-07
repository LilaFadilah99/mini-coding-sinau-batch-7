"use client";

import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PopularDestinations from "@/components/PopularDestinations";
import StatsSection from "@/components/StatsSection";
import EventsSection from "@/components/EventsSection";
import ReviewsSection from "@/components/ReviewsSection";
import CTAHero from "@/components/CTAHero";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import LoadingOverlay from "@/components/LoadingOverlay";
import SavedTripsView from "@/components/SavedTripsView";

// Sanitize HTML dari AI biar aman dari XSS
// Whitelist: hanya tag/attribute yang dipakai parseMarkdown di backend
function sanitizeItinerary(html) {
  if (typeof window === "undefined") return html; // SSR safety
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "p", "ul", "ol", "li",
      "strong", "em", "br", "hr", "div", "span",
    ],
    ALLOWED_ATTR: ["class", "style"],
  });
}

const INITIAL_FORM = {
  destination: "",
  days: 3,
  budget: "moderate",
  interests: "",
};

export default function Home() {
  // ============================================
  // State global aplikasi
  // ============================================
  const [view, setView] = useState("explore"); // 'explore' | 'saved'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [itineraryResult, setItineraryResult] = useState(null);

  const [savedTrips, setSavedTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [tripsError, setTripsError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // ============================================
  // Fetch saved trips saat halaman load
  // ============================================
  useEffect(() => {
    fetchSavedTrips();
  }, []);

  async function fetchSavedTrips() {
    setTripsLoading(true);
    setTripsError(null);
    try {
      const res = await fetch("/api/saved-trips");
      if (!res.ok) throw new Error("Gagal fetch saved trips");
      const data = await res.json();
      setSavedTrips(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error fetch saved trips:", err);
      setTripsError(err.message);
    } finally {
      setTripsLoading(false);
    }
  }

  // ============================================
  // Handlers
  // ============================================

  // Klik filter pill di hero — fill destination + active state
  function handleFilterClick(city) {
    setFormData((prev) => ({ ...prev, destination: city }));
    setSelectedFilter(city);
  }

  // Klik card destination di Popular Destination
  function handleDestinationCardClick(cityName) {
    setFormData((prev) => ({ ...prev, destination: cityName }));
    // Buka modal langsung biar user lanjut isi form lain
    setIsModalOpen(true);
  }

  // Submit form (dari hero atau modal)
  async function handleGenerateItinerary(e) {
    e.preventDefault();

    if (!formData.destination.trim()) {
      toast.error("Tolong isi destinasi dulu.");
      return;
    }

    setIsGenerating(true);
    setItineraryResult(null);

    // Buka modal kalau dari hero (biar result tampil di modal)
    if (!isModalOpen) {
      setIsModalOpen(true);
    }

    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: formData.destination.trim(),
          days: parseInt(formData.days),
          budget: formData.budget,
          style: formData.interests.trim() || "general sightseeing and local experiences",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (res.status === 429) {
          toast.warning("Rate Limit", {
            description: "Tunggu 1-2 menit lalu coba lagi.",
          });
        } else {
          toast.error("Gagal generate itinerary", {
            description: data.error || "Coba lagi nanti.",
          });
        }
        return;
      }

      // Sanitize HTML dari AI sebelum di-render
      setItineraryResult(sanitizeItinerary(data.itinerary));
      console.log("✅ Itinerary generated successfully");
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Connection error", {
        description: "Pastikan kamu online dan coba lagi.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  // Save trip ke Supabase
  async function handleSaveTrip() {
    if (!itineraryResult) {
      toast.error("Tidak ada itinerary untuk disimpan.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/saved-trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: formData.destination,
          days: parseInt(formData.days),
          budget: formData.budget,
          interests: formData.interests,
          itinerary: itineraryResult,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal menyimpan trip");
      }

      toast.success("Trip berhasil disimpan!", {
        description: `${formData.destination} • ${formData.days} hari`,
      });
      // Refresh list saved trips
      fetchSavedTrips();
    } catch (error) {
      console.error("❌ Save error:", error);
      toast.error("Gagal menyimpan trip", { description: error.message });
    } finally {
      setIsSaving(false);
    }
  }

  // Delete saved trip — confirmation handled di SavedTripsView via shadcn AlertDialog
  async function handleDeleteTrip(tripId) {
    try {
      const res = await fetch(`/api/saved-trips?id=${tripId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal menghapus");
      }

      toast.success("Trip berhasil dihapus");
      fetchSavedTrips();
    } catch (error) {
      console.error("❌ Delete error:", error);
      toast.error("Gagal menghapus trip", { description: error.message });
    }
  }

  // Reset form & buka modal kosong (dari "+ New" di result modal)
  function handleNewTrip() {
    setItineraryResult(null);
    setFormData(INITIAL_FORM);
    setSelectedFilter(null);
  }

  // Buka modal AI Planner dari navbar
  function handleOpenPlanner() {
    setItineraryResult(null);
    setIsModalOpen(true);
  }

  // Tutup modal
  function handleCloseModal() {
    setIsModalOpen(false);
    // Tidak reset itineraryResult biar bisa balik buka lagi
  }

  // ============================================
  // Render
  // ============================================
  return (
    <>
      <Navbar
        view={view}
        onViewChange={setView}
        onOpenPlanner={handleOpenPlanner}
      />

      {view === "explore" ? (
        <>
          <Hero
            formData={formData}
            onChange={setFormData}
            onSubmit={handleGenerateItinerary}
            isSubmitting={isGenerating}
            selectedFilter={selectedFilter}
            onFilterClick={handleFilterClick}
          />

          <main className="animate-fade-in">
            <PopularDestinations onCardClick={handleDestinationCardClick} />
            <StatsSection />
            <EventsSection />
            <ReviewsSection />
            <CTAHero />
          </main>
        </>
      ) : (
        <main className="pt-32 animate-fade-in">
          <SavedTripsView
            trips={savedTrips}
            loading={tripsLoading}
            error={tripsError}
            onDelete={handleDeleteTrip}
            onStartPlanning={handleOpenPlanner}
          />
        </main>
      )}

      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        onChange={setFormData}
        onSubmit={handleGenerateItinerary}
        isSubmitting={isGenerating}
        itineraryResult={itineraryResult}
        onSaveTrip={handleSaveTrip}
        onNewTrip={handleNewTrip}
        isSaving={isSaving}
      />

      <LoadingOverlay show={isGenerating} />
    </>
  );
}
