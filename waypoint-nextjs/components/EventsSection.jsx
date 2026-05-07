import Image from "next/image";

// 3 event cards
const events = [
  {
    title: "Exploring the Hidden Wonders of the World Adventure",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    location: "📍 Bangladesh",
    date: "📅 July 3 to 7",
    rating: "⭐ 4.8 Rating",
    price: "$400",
  },
  {
    title: "Embark on a Cultural Journey Across Stunning Landscapes",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    location: "📍 Bangladesh",
    date: "📅 July 10 to 12",
    rating: "⭐ 4.8 Rating",
    price: "$320",
  },
  {
    title: "Discover Majestic Mountains and Breathtaking Views",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
    location: "📍 Bangladesh",
    date: "📅 July 3 to 7",
    rating: "⭐ 4.8 Rating",
    price: "$450",
  },
];

export default function EventsSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            Explore events
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="bg-white border border-border-default rounded-2xl overflow-hidden transition hover:shadow-large hover:-translate-y-1 group"
            >
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-text-primary mb-4 leading-snug">
                  {event.title}
                </h3>
                <div className="flex flex-col gap-2 mb-4">
                  <span className="text-sm text-text-secondary">{event.location}</span>
                  <span className="text-sm text-text-secondary">{event.date}</span>
                  <span className="text-sm text-text-secondary">{event.rating}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xl font-bold text-text-primary">{event.price}</span>
                  <span className="text-sm text-text-secondary">/ Night</span>
                </div>
                <p className="text-xs text-text-muted">Including taxes and fees</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
