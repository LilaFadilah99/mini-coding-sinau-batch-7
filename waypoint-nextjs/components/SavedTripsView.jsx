"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SavedTripsView({
  trips,
  loading,
  error,
  onDelete,
  onStartPlanning,
}) {
  function formatDate(dateString) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-15 md:py-[60px] min-h-[60vh]">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-text-primary mb-2">My Saved Trips</h2>
        <p className="text-base text-text-secondary">Your travel planning history</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-text-secondary">
          Loading saved trips...
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">
          ❌ {error}. Pastikan Supabase sudah ter-setup.
        </div>
      ) : trips.length === 0 ? (
        // Empty state
        <div className="text-center py-20 px-10">
          <span className="text-6xl block mb-5">🗺️</span>
          <h3 className="text-2xl font-semibold mb-2">No saved trips yet</h3>
          <p className="text-text-secondary mb-6">
            Start planning your adventure with our AI Planner!
          </p>
          <Button
            onClick={onStartPlanning}
            className="rounded-full h-auto px-7 py-3.5 font-semibold text-[15px] shadow-none transition hover:-translate-y-0.5 hover:shadow-brand-glow"
          >
            ✨ Start Planning
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white border border-border-default rounded-2xl p-6 transition hover:border-brand hover:shadow-medium"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    📍 {trip.destination}
                  </h3>
                  <span className="text-text-secondary text-[13px]">
                    {trip.days} days • {trip.budget} budget •{" "}
                    {formatDate(trip.created_at)}
                  </span>
                </div>

                {/* shadcn AlertDialog untuk konfirmasi delete */}
                {/* (replace native confirm() — accessible, animated, branded) */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-auto px-3.5 py-2 rounded-wp-xs text-[13px] font-normal shadow-none border-border-default text-text-secondary hover:text-red-500 hover:border-red-500 hover:bg-red-50"
                    >
                      🗑️ Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus trip ini?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Trip ke <strong>{trip.destination}</strong> akan dihapus
                        permanen. Aksi ini tidak bisa dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(trip.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Hapus Trip
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div
                className="saved-trip-content"
                dangerouslySetInnerHTML={{ __html: trip.itinerary }}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
