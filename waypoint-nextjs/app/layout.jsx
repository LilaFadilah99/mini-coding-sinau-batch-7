import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Plus Jakarta Sans = font khas Waypoint, juga di-set sebagai --font-sans
// untuk dipakai oleh shadcn components (mereka pakai font-sans default).
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default: "Waypoint AI - Smart Travel Planning",
    template: "%s | Waypoint AI",
  },
  description:
    "Waypoint AI - Your intelligent travel companion. Get AI-powered itineraries for your dream destinations.",
  keywords: ["travel", "AI", "itinerary", "trip planner", "vacation", "Gemini"],
  authors: [{ name: "Waypoint Team" }],
  creator: "Waypoint",
  // Open Graph (untuk preview saat di-share di social media)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://waypoint-nextjs.vercel.app",
    siteName: "Waypoint AI",
    title: "Waypoint AI - Smart Travel Planning",
    description:
      "AI-powered itineraries crafted just for you. Explore smarter, travel better.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Waypoint AI Travel Planner",
      },
    ],
  },
  // Twitter card
  twitter: {
    card: "summary_large_image",
    title: "Waypoint AI - Smart Travel Planning",
    description: "AI-powered itineraries crafted just for you.",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8bff66",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <body
        className="font-sans bg-white text-text-primary leading-relaxed overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
        {/* Toast notifications — pengganti alert() & confirm() */}
        <Toaster position="top-center" richColors closeButton duration={4000} />
      </body>
    </html>
  );
}
