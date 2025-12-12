"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    problem: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("System Active. Transmission queued. (Backend not connected yet)");
  };

  return (
    <section className="w-full max-w-4xl px-6 py-24 mx-auto" id="contact">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Initialize Audit</h2>
        <p className="text-steel text-lg">Tell us where the machine is broken.</p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 p-8 md:p-12 space-y-6 backdrop-blur-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-safety-orange uppercase tracking-wider">Identity</label>
            <input 
              type="text" 
              name="name"
              placeholder="Full Name"
              value={formState.name}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-safety-orange outline-none transition-colors rounded-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-safety-orange uppercase tracking-wider">Coordinates</label>
            <input 
              type="email" 
              name="email"
              placeholder="Work Email"
              value={formState.email}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-safety-orange outline-none transition-colors rounded-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-safety-orange uppercase tracking-wider">Entity</label>
            <input 
              type="text" 
              name="company"
              placeholder="Company Name"
              value={formState.company}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-safety-orange outline-none transition-colors rounded-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-safety-orange uppercase tracking-wider">Diagnostic</label>
            <select 
              name="problem"
              value={formState.problem}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-safety-orange outline-none transition-colors rounded-none appearance-none"
            >
              <option value="">Select Primary Issue...</option>
              <option value="traffic-drop">Traffic Drop / Penalty</option>
              <option value="migration">Platform Migration</option>
              <option value="technical">Technical/Indexing Issues</option>
              <option value="international">International Expansion</option>
              <option value="audit">General Infrastructure Audit</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-safety-orange uppercase tracking-wider">Transmission</label>
          <textarea 
            name="message"
            placeholder="Describe the failure state..."
            rows={4}
            value={formState.message}
            onChange={handleChange}
            className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-safety-orange outline-none transition-colors rounded-none resize-none"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="w-full bg-safety-orange text-strath-navy font-bold text-lg py-5 flex items-center justify-center gap-2 hover:bg-white hover:text-strath-navy transition-all mt-4"
        >
          Send Transmission <Send size={18} />
        </button>

        <p className="text-center text-white/30 text-xs font-mono pt-4">
          By clicking send, you agree to our data processing terms. No spam, ever.
        </p>
      </motion.form>
    </section>
  );
}

