import React from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-sm bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-8 border border-primary/10">
          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
          Strategy Presentation
        </div>
        
        <h1 className="text-4xl md:text-6xl font-serif text-primary leading-tight mb-8">
          Scaling Lumina Beauty Through Full-Funnel Meta Advertising
        </h1>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl">
          A performance marketing strategy designed to acquire customers, improve conversion efficiency, and maximize return on advertising spend through data-driven audience targeting and creative optimization.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4"
      >
        <div className="bg-card border border-border p-6 rounded-sm shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">Campaign Duration</span>
          <span className="text-2xl font-serif text-primary">30 Days</span>
        </div>
        <div className="bg-card border border-border p-6 rounded-sm shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">Total Budget</span>
          <span className="text-2xl font-serif text-primary">&#8377;1,00,000</span>
        </div>
        <div className="bg-primary border border-primary p-6 rounded-sm shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-xs uppercase tracking-widest text-primary-foreground/70 font-semibold mb-2 block relative z-10">Primary Objective</span>
          <span className="text-2xl font-serif text-primary-foreground relative z-10">Purchase Growth</span>
        </div>
      </motion.div>
    </section>
  );
}
