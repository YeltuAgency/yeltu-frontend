import logo from "../assets/logo.webp";

export default function Logo({ className = "h-10 w-auto" }) {
  return (
    <img
      src={logo}
      alt="Yeltu Logo"
      className={className + " object-contain"}
    />
  );
}
