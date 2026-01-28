import logo from "../assets/logo.webp";

export default function Logo({ className = "h-10 w-auto" }) {
  return (
    <div 
      className={`
        ${className} 
        /* 1. TIGHT WIDTH: w-12 is small (48px). flex-end pushes image to the right */
        w-12
        flex items-center justify-end
        overflow-hidden
      `}
    >
      <img
        src={logo}
        alt="Yeltu Logo"
        /* 2. SCALE: Zoom in (1.8x) to cut whitespace.
           3. OBJECT-LEFT: We align the image to the left of its internal box, 
              but the parent div pushes that box to the right. 
        */
        className="h-full w-full object-contain object-left scale-[1.8]" 
      />
    </div>
  );
}