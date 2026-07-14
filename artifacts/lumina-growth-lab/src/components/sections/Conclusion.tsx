import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "Meta Ads",
  "Campaign Strategy",
  "Audience Research",
  "Media Planning",
  "Creative Testing",
  "Performance Marketing",
  "Conversion Optimization",
  "Marketing Analytics",
  "Business Storytelling",
  "Customer Acquisition"
];

export function ProjectImpact() {
  return (
    <section id="impact" className="py-20 bg-secondary/10 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 print-break-inside-avoid">
          {/* Why This Project Matters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-accent font-serif text-2xl italic">11</span>
              <h2 className="text-2xl font-serif text-primary uppercase tracking-wide">Why This Project Matters</h2>
            </div>
            
            <div className="bg-card border border-border p-8 rounded-sm shadow-sm h-full">
              <p className="text-primary/90 text-sm leading-relaxed mb-8">
                This project demonstrates a comprehensive ability to engineer full-funnel growth systems using Meta Ads. It proves the capability to transition from high-level business objectives to granular media buying execution.
              </p>
              <ul className="space-y-4">
                {["Build Awareness", "Drive Consideration", "Generate Conversions", "Improve ROAS", "Scale Customer Acquisition"].map((point, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold text-primary">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Skills Demonstrated */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-accent font-serif text-2xl italic">12</span>
              <h2 className="text-2xl font-serif text-primary uppercase tracking-wide">Skills Demonstrated</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3 h-full content-start">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border p-4 rounded-sm shadow-sm flex items-center justify-center text-center hover:border-primary/30 transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-widest font-bold text-primary">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* About the Project Creator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="print-break-inside-avoid"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-accent font-serif text-2xl italic">13</span>
            <h2 className="text-2xl font-serif text-primary uppercase tracking-wide">About the Project Creator</h2>
          </div>
          
          <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-sm shadow-lg flex flex-col md:flex-row items-center md:items-start gap-10 border border-primary-border">
            <div className="w-24 h-24 bg-white/5 rounded-sm flex items-center justify-center font-serif font-bold text-5xl flex-shrink-0 border border-white/10 text-white/90">
              N
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-serif mb-2 text-white">Nupur Tyagi</h3>
              <p className="text-accent text-[11px] font-bold uppercase tracking-widest mb-6">Marketing Professional</p>
              
              <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-3xl mb-8">
                Nupur Tyagi is a marketing professional with experience in influencer marketing, campaign execution, creator partnerships, and marketing analytics. This portfolio project was developed to demonstrate strategic thinking, audience targeting, campaign planning, and performance marketing capabilities.
              </p>
              
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center h-10 px-6 font-bold bg-white text-primary rounded-sm hover:bg-white/90 transition-colors text-[10px] uppercase tracking-widest"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
