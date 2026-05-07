export default function LoadingOverlay({ show }) {
  return (
    <div
      className={`fixed inset-0 bg-white/80 backdrop-blur-md z-[9999] flex items-center justify-center transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`text-center flex flex-col items-center gap-6 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          show ? "translate-y-0 scale-100" : "translate-y-5 scale-90"
        }`}
      >
        <div
          className="w-16 h-16 rounded-full border-4 border-border-light border-t-brand animate-spin"
          style={{ boxShadow: "0 0 20px rgba(139, 255, 102, 0.2)" }}
        />
        <p className="text-lg font-bold text-text-primary tracking-tight">
          Waypoint AI is crafting your journey...
        </p>
      </div>
    </div>
  );
}
