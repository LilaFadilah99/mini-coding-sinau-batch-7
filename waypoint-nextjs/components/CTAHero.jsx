import Image from "next/image";

export default function CTAHero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden mt-20">
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1600&q=80"
          alt="Adventure landscape"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 cta-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-[800px] px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
          Discover the World, One
          <br />
          Adventure at a Time
        </h2>
        <p className="text-base md:text-lg mb-8 opacity-95 leading-relaxed">
          Travel Beyond Limits, Explore Uncharted Horizons, and Build Memories
          That Last a Lifetime
        </p>
        <button className="inline-flex items-center gap-3 bg-brand text-[#1a1a1a] rounded-xl px-10 py-4 text-base font-bold transition hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-brand-glow">
          Get Started
          <span className="text-xl">→</span>
        </button>
      </div>
    </section>
  );
}
