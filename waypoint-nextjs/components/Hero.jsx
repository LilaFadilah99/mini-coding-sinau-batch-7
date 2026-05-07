"use client";

import Image from "next/image";
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

const filterCities = ["Bali", "Tokyo", "Paris", "New York", "Dubai", "London"];

// Tailwind class set untuk match Waypoint pill input style
const PILL_INPUT =
  "rounded-full h-12 px-5 text-[15px] bg-white shadow-none border-border-default text-text-primary placeholder:text-text-muted focus-visible:ring-[3px] focus-visible:ring-brand-light focus-visible:border-brand focus-visible:ring-offset-0";

export default function Hero({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  selectedFilter,
  onFilterClick,
}) {
  function handleChange(field) {
    return (e) => onChange({ ...formData, [field]: e.target.value });
  }

  return (
    <section className="relative min-h-[600px] flex flex-col items-center justify-center pt-[250px] px-6 pb-[180px] overflow-hidden">
      {/* Background image + overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
          alt="Beautiful tropical beach"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Hero content (judul + subtitle) */}
      <div className="text-center max-w-[700px] text-white mb-10">
        <h1
          className="text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-tight mb-5"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
        >
          Explore the World, One
          <br />
          Journey at a Time.
        </h1>
        <p
          className="text-base md:text-[17px] opacity-90 leading-relaxed"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}
        >
          AI-powered itineraries crafted just for you. Explore smarter, travel
          better.
        </p>
      </div>

      {/* Floating Hero Card with Quick Planner Form */}
      <div className="bg-white rounded-2xl shadow-xl-soft p-6 w-full max-w-[900px] relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary">
            Plan Your Travel Journey
          </h2>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          {/* Row 1: 4 input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="hero-destination" className="text-[13px] font-semibold">
                Destination
              </Label>
              <Input
                id="hero-destination"
                type="text"
                value={formData.destination}
                onChange={handleChange("destination")}
                placeholder="Type the destination"
                required
                className={PILL_INPUT}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero-days" className="text-[13px] font-semibold">
                Days
              </Label>
              <Input
                id="hero-days"
                type="number"
                value={formData.days}
                onChange={handleChange("days")}
                placeholder="3"
                min={1}
                max={14}
                required
                className={PILL_INPUT}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero-budget" className="text-[13px] font-semibold">
                Budget
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(value) =>
                  onChange({ ...formData, budget: value })
                }
              >
                <SelectTrigger
                  id="hero-budget"
                  className={cn(PILL_INPUT, "w-full")}
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

            <div className="space-y-2">
              <Label htmlFor="hero-interests" className="text-[13px] font-semibold">
                Interests
              </Label>
              <Input
                id="hero-interests"
                type="text"
                value={formData.interests}
                onChange={handleChange("interests")}
                placeholder="Your interests"
                className={PILL_INPUT}
              />
            </div>
          </div>

          {/* Row 2: filter pills + submit button */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-5">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 flex-1">
              <span className="text-sm font-semibold text-text-primary whitespace-nowrap">
                Filter:
              </span>
              <div className="flex gap-2 flex-wrap lg:flex-nowrap overflow-x-auto">
                {filterCities.map((city) => {
                  const isActive = selectedFilter === city;
                  return (
                    <Button
                      key={city}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onFilterClick(city)}
                      className={cn(
                        "h-auto py-2 px-4 text-[13px] font-normal rounded-2xl flex-shrink-0 shadow-none transition",
                        "bg-transparent border border-border-default text-text-secondary",
                        "hover:bg-bg-secondary hover:border-brand hover:text-text-primary",
                        isActive &&
                          "bg-bg-secondary border-brand text-text-primary font-medium hover:bg-bg-secondary"
                      )}
                    >
                      {city}
                    </Button>
                  );
                })}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full h-12 px-8 font-bold text-[15px] whitespace-nowrap flex-shrink-0 w-full lg:w-auto shadow-none transition hover:-translate-y-0.5 hover:shadow-brand-glow"
            >
              {isSubmitting ? "Generating..." : "Generate Itinerary"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
