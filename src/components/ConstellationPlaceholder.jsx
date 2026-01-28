import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react'; 

const ConstellationSection = ({ t, goProjects }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const tiltRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Track mouse position for the Canvas logic without triggering re-renders
  const mouseRef = useRef({ x: null, y: null });

  // 1. SCROLL OBSERVER (Entrance Animation)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when 20% of the section is visible
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // 2. CANVAS & PARTICLES (Background)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Brand Colors: Violet (#8C52FF) and Cyan (#5CE1E6)
    const colors = [
      { r: 140, g: 82, b: 255 }, 
      { r: 92, g: 225, b: 230 }  
    ];

    const resizeCanvas = () => {
      if (containerRef.current) {
          canvas.width = containerRef.current.offsetWidth;
          canvas.height = containerRef.current.offsetHeight;
      }
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; 
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // MOUSE INTERACTION
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;

        if (mouseX != null && mouseY != null) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 250) {
            this.x += dx * 0.02; 
            this.y += dy * 0.02;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.6)`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 40 : 90;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        for (let j = index; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 - distance/1500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;
        if (mouseX != null && mouseY != null) {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(92, 225, 230, ${0.15 - dist/2000})`; 
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(mouseX, mouseY);
                ctx.stroke();
            }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 3. EVENT HANDLERS (Unified)
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

    if (tiltRef.current) {
        const x = (e.clientX - rect.left - rect.width / 2) / 30; 
        const y = (e.clientY - rect.top - rect.height / 2) / 30;
        tiltRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null };
    if (tiltRef.current) {
        tiltRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // UPDATED: Drastically reduced padding to 'py-8' (approx 32px) per your request
      className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#0f172a] py-8"
    >
      {/* Custom Keyframes for the 'Breathing' Auto-Animation */}
      <style>{`
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float-y 6s ease-in-out infinite;
        }
      `}</style>

      {/* GLOBAL BACKGROUND: Deep Space Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-800 via-[#0B1120] to-black opacity-100 z-0" />

      {/* CANVAS LAYER */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* CONTENT LAYER */}
      {/* UPDATED: Reduced vertical gap to 'gap-8 md:gap-12' so elements aren't too far apart */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center gap-8 md:gap-12">
        
        {/* 1. SECTION HEADER (Integrated into Dark Mode) */}
        <div className={`text-center transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {t("homepage.projects.title")}
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            {t("homepage.projects.subtitle")}
          </p>
        </div>

        {/* 2. THE HOLOGRAPHIC CARD */}
        <div 
           className={`transition-all duration-[1200ms] cubic-bezier(0.17, 0.55, 0.55, 1) ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-90'}`}
        >
            {/* WRAPPER 1: Auto-Animation (The Floating Effect) */}
            <div className="animate-float"> 
                {/* WRAPPER 2: The Tilt Card (Mouse Effect) */}
                <div 
                    ref={tiltRef}
                    // 'max-w-[90vw] md:max-w-3xl mx-auto' fixes the padding issue on 100% width
                    className="relative w-full max-w-[90vw] md:max-w-3xl mx-auto p-12 md:p-20 rounded-[3rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(140,82,255,0.1)] transition-transform duration-100 ease-out"
                >
                    {/* Glare Effect */}
                    <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                    
                    <h3 className="text-4xl md:text-7xl font-extrabold uppercase tracking-widest text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-white to-violet-200 drop-shadow-lg break-words">
                        {t("homepage.projects.building")}<br />{t("homepage.projects.future")}
                    </h3>
                    <p className="text-slate-300 text-center mt-8 text-lg font-light tracking-wide">
                        {t("homepage.projects.comingSoon") || "New digital experiences are currently in development."}
                    </p>
                </div>
            </div>
        </div>

        {/* 3. BUTTON (Integrated) */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
                onClick={goProjects}
                className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full overflow-hidden bg-transparent border border-white/20 hover:border-cyan-400/50 transition-all duration-300"
            >
                {/* Button Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative z-10 font-semibold text-white group-hover:text-cyan-50 transition-colors">
                    {t("homepage.projects.button")}
                </span>
                <ArrowRight size={20} className="relative z-10 text-white group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

      </div>
    </section>
  );
};

export default ConstellationSection;