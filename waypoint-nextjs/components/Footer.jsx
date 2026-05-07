export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-default px-6 py-10">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0 text-center md:text-left">
        <div className="flex items-center gap-2.5 font-semibold text-lg">
          <span className="text-2xl">⛰️</span>
          <span>Waypoint AI</span>
        </div>
        <p className="text-text-secondary text-sm">
          Made with ❤️ for learning web development
        </p>
      </div>
    </footer>
  );
}
