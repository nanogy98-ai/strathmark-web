"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function MotionSection({ children, className, id, delay = 0 }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9], delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
