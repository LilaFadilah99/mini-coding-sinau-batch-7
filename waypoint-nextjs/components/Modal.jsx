"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Modal input — rounded-wp-sm (10px), bukan pill bulat penuh (beda dari hero)
const MODAL_INPUT =
  "rounded-wp-sm h-12 px-4 text-[15px] bg-white shadow-none border-border-default text-text-primary placeholder:text-text-muted focus-visible:ring-[3px] focus-visible:ring-brand-light focus-visible:border-brand focus-visible:ring-offset-0";

export default function Modal({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  itineraryResult,
  onSaveTrip,
  onNewTrip,
  isSaving,
}) {
  // shadcn Dialog (Radix UI) handle SEMUA otomatis:
  // focus trap, escape key, backdrop click, ARIA, animation, scroll lock
  function handleOpenChange(open) {
    if (!open) onClose();
  }

  function handleChange(field) {
    return (e) => onChange({ ...formData, [field]: e.target.value });
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col gap-0 p-0">
        <DialogHeader className="p-6 border-b border-border-default space-y-2">
          <DialogTitle className="text-[22px] font-bold">
            AI Travel Planner
          </DialogTitle>
          {!itineraryResult && (
            <DialogDescription className="text-text-secondary">
              Let our AI create your perfect personalized itinerary
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="p-6 overflow-y-auto flex-1">
          {!itineraryResult ? (
            // ============================================
            // Form Planner View (default)
            // ============================================
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="modal-destination"
                  className="text-sm font-semibold"
                >
                  Destination
                </Label>
                <Input
                  id="modal-destination"
                  type="text"
                  value={formData.destination}
                  onChange={handleChange("destination")}
                  placeholder="e.g., Bali, Tokyo, Paris..."
                  required
                  className={MODAL_INPUT}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="modal-days"
                    className="text-sm font-semibold"
                  >
                    Days
                  </Label>
                  <Input
                    id="modal-days"
                    type="number"
                    value={formData.days}
                    onChange={handleChange("days")}
                    min={1}
                    max={14}
                    required
                    className={MODAL_INPUT}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="modal-budget"
                    className="text-sm font-semibold"
                  >
                    Budget
                  </Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) =>
                      onChange({ ...formData, budget: value })
                    }
                  >
                    <SelectTrigger
                      id="modal-budget"
                      className={cn(MODAL_INPUT, "w-full")}
                    >
                      <SelectValue placeholder="Pilih budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="modal-interests"
                  className="text-sm font-semibold"
                >
                  Interests
                </Label>
                <Input
                  id="modal-interests"
                  type="text"
                  value={formData.interests}
                  onChange={handleChange("interests")}
                  placeholder="e.g., food, culture, adventure, beaches..."
                  className={MODAL_INPUT}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-wp-sm font-semibold text-base mt-2 shadow-none transition hover:-translate-y-0.5 hover:shadow-brand-glow"
              >
                {isSubmitting
                  ? "Magic is happening... 🪄"
                  : "Generate Itinerary"}
              </Button>
            </form>
          ) : (
            // ============================================
            // Result View (after AI generates)
            // ============================================
            <div className="animate-slide-up">
              <div className="flex justify-between items-center mb-5 pb-4 border-b border-border-default">
                <h3 className="text-xl font-bold">Your Itinerary</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={onSaveTrip}
                    disabled={isSaving}
                    className="rounded-full h-10 px-5 font-semibold text-sm shadow-none"
                  >
                    {isSaving ? "💾 Saving..." : "💾 Save"}
                  </Button>
                  <Button
                    onClick={onNewTrip}
                    variant="outline"
                    className="rounded-full h-10 px-4 font-medium text-sm shadow-none"
                  >
                    + New
                  </Button>
                </div>
              </div>
              <div
                className="itinerary-result"
                dangerouslySetInnerHTML={{ __html: itineraryResult }}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
