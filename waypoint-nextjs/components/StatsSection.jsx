// 4 stat cards — angka-angka tentang Waypoint
const stats = [
  {
    number: "234",
    suffix: "M",
    label: "Supporting multiple\ncurrencies for travelers",
    highlight: false,
  },
  {
    number: "768",
    suffix: "K",
    label: "Gaining new travelers\nevery single month",
    highlight: true, // card hijau neon
  },
  {
    number: "5.0",
    suffix: "★",
    label: "High star ratings from\nsatisfied users",
    highlight: false,
  },
  {
    number: "$8.8",
    suffix: "B",
    label: "Generating increased\nrevenue consistently",
    highlight: false,
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
          Get to know more
          <br />
          about Waypoint Travel
        </h2>
        <p className="text-base text-text-secondary mb-12 max-w-[600px]">
          With a commitment to security and efficiency, our services ensure your
          travel planning is seamless and secure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 text-center transition hover:-translate-y-1 hover:shadow-medium ${
                stat.highlight ? "bg-brand text-[#1a1a1a]" : "bg-bg-secondary"
              }`}
            >
              <h3 className="text-5xl font-bold mb-3">
                {stat.number}
                <span className="text-3xl font-semibold">{stat.suffix}</span>
              </h3>
              <p
                className={`text-sm leading-relaxed whitespace-pre-line ${
                  stat.highlight ? "opacity-80" : "text-text-secondary"
                }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
