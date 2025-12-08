export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 3D Floating Shapes */}
      <div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-violet-400/20 rounded-3xl blur-2xl animate-float"
        style={{ animationDelay: "0s", animationDuration: "6s" }}
      ></div>

      <div
        className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s", animationDuration: "8s" }}
      ></div>

      <div
        className="absolute bottom-32 left-1/4 w-36 h-36 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl blur-2xl animate-float"
        style={{ animationDelay: "2s", animationDuration: "7s" }}
      ></div>

      <div
        className="absolute top-1/2 right-1/4 w-28 h-28 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s", animationDuration: "9s" }}
      ></div>

      {/* Geometric Circle */}
      <div className="absolute bottom-1/4 left-20 w-16 h-16 border-2 border-violet-400/30 rounded-full animate-pulse-slow"></div>
    </div>
  );
}
