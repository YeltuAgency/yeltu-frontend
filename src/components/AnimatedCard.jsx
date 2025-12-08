import React from "react";
import {Card} from "./ui/card.jsx";

export default function AnimatedCard({ children, className = "", delay = 0 }) {
  return (
    <div
      className="group perspective-1000"
      style={{
        animation: `fadeInUp 0.6s ease-out ${delay}s both`,
      }}
    >
      <Card
        className={
          `${className} transform transition-all duration-500 
          hover:scale-105 hover:-translate-y-2 
          hover:shadow-2xl hover:shadow-blue-500/20`
        }
      >
        {children}
      </Card>
    </div>
  );
}
