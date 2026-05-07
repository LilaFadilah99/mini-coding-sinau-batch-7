import Image from "next/image";

export default function ReviewsSection() {
  return (
    <section className="bg-bg-secondary px-6 py-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            Client review
          </h2>
          <div className="flex">
            {[1, 2, 3, 4].map((i) => (
              <Image
                key={i}
                src={`https://i.pravatar.cc/40?img=${i}`}
                alt={`Reviewer ${i}`}
                width={40}
                height={40}
                className={`rounded-full border-[3px] border-white ${
                  i > 1 ? "-ml-2" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content: testimonial card + image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-white rounded-2xl p-10 relative">
            <div
              className="text-[80px] text-brand leading-none mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              "
            </div>
            <p className="text-base leading-loose text-text-secondary mb-8">
              Working with this team was a pleasure. They understood our vision
              and helped us find a property that exceeded our expectations. We
              couldn't have done it without them!
            </p>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-text-primary mb-1">
                Sajibur Rahman
              </h4>
              <p className="text-sm text-text-muted">UI UX Designer</p>
            </div>

            {/* Dots indicator */}
            <div className="flex gap-2">
              <span className="w-6 h-2 rounded bg-text-primary" />
              <span className="w-2 h-2 rounded-full bg-border-default" />
              <span className="w-2 h-2 rounded-full bg-border-default" />
            </div>
          </div>

          <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80"
              alt="Reviewer"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
