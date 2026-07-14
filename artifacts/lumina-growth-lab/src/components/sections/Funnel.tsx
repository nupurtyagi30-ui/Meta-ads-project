import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MousePointerClick, ShoppingBag } from 'lucide-react';

export function FunnelStrategy() {
  return (
    <section id="execution" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-accent font-serif text-2xl italic">03</span>
            <h2 className="text-2xl font-serif uppercase tracking-wide">Full Meta Ads Funnel</h2>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-sm font-medium tracking-wide uppercase">
            Architecture & User Journey
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-4 justify-between items-stretch print-break-inside-avoid">
          {/* TOFU */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 rounded-sm w-full md:w-1/3 backdrop-blur-sm relative flex flex-col"
          >
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent flex items-center justify-center font-bold text-sm shadow-lg text-primary">1</div>
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 rounded-sm">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg uppercase tracking-wide font-bold text-center mb-1">TOFU / Awareness</h3>
            <p className="text-center text-xs tracking-widest uppercase text-primary-foreground/60 mb-8 border-b border-white/10 pb-6">Broad & Lookalike</p>
            
            <div className="space-y-4 flex-1">
              <div className="bg-black/20 p-4 rounded-sm">
                <span className="block text-[10px] uppercase tracking-widest text-primary-foreground/50 mb-1">Objective</span>
                <span className="font-semibold text-sm">Video Views & Reach</span>
              </div>
              <div className="bg-black/20 p-4 rounded-sm">
                <span className="block text-[10px] uppercase tracking-widest text-primary-foreground/50 mb-1">Strategy</span>
                <span className="font-semibold text-sm">UGC Influencer Reels</span>
              </div>
              <div className="bg-black/20 p-4 rounded-sm">
                <span className="block text-[10px] uppercase tracking-widest text-primary-foreground/50 mb-1">Key Metric</span>
                <span className="font-semibold text-sm">Cost Per 3s View, CPM</span>
              </div>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center justify-center w-8">
            <div className="h-0.5 w-full bg-white/20"></div>
          </div>

          {/* MOFU */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8 rounded-sm w-full md:w-1/3 backdrop-blur-sm relative flex flex-col"
          >
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent flex items-center justify-center font-bold text-sm shadow-lg text-primary">2</div>
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 rounded-sm">
                <MousePointerClick className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg uppercase tracking-wide font-bold text-center mb-1">MOFU / Consideration</h3>
            <p className="text-center text-xs tracking-widest uppercase text-primary-foreground/60 mb-8 border-b border-white/10 pb-6">Video Viewers</p>
            
            <div className="space-y-4 flex-1">
              <div className="bg-black/20 p-4 rounded-sm">
                <span className="block text-[10px] uppercase tracking-widest text-primary-foreground/50 mb-1">Objective</span>
                <span className="font-semibold text-sm">Traffic & Landing Page</span>
              </div>
              <div className="bg-black/20 p-4 rounded-sm">
                <span className="block text-[10px] uppercase tracking-widest text-primary-foreground/50 mb-1">Strategy</span>
                <span className="font-semibold text-sm">Product Demonstration</span>
              </div>
              <div className="bg-black/20 p-4 rounded-sm">
                <span className="block text-[10px] uppercase tracking-widest text-primary-foreground/50 mb-1">Key Metric</span>
                <span className="font-semibold text-sm">CPC, Outbound CTR</span>
              </div>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center justify-center w-8">
            <div className="h-0.5 w-full bg-white/20"></div>
          </div>

          {/* BOFU */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 border border-accent/50 p-8 rounded-sm w-full md:w-1/3 backdrop-blur-sm relative shadow-[0_0_30px_rgba(202,138,4,0.05)] flex flex-col"
          >
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent flex items-center justify-center font-bold text-sm shadow-lg text-primary">3</div>
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-accent/20 rounded-sm">
                <ShoppingBag className="h-6 w-6 text-accent" />
              </div>
            </div>
            <h3 className="text-lg uppercase tracking-wide font-bold text-center mb-1">BOFU / Conversion</h3>
            <p className="text-center text-xs tracking-widest uppercase text-primary-foreground/60 mb-8 border-b border-white/20 pb-6">Cart Abandoners</p>
            
            <div className="space-y-4 flex-1">
              <div className="bg-black/30 p-4 rounded-sm border border-accent/10">
                <span className="block text-[10px] uppercase tracking-widest text-primary-foreground/50 mb-1">Objective</span>
                <span className="font-semibold text-sm text-white">Conversions (Purchases)</span>
              </div>
              <div className="bg-black/30 p-4 rounded-sm border border-accent/10">
                <span className="block text-[10px] uppercase tracking-widest text-primary-foreground/50 mb-1">Strategy</span>
                <span className="font-semibold text-sm text-white">Testimonials & Offers</span>
              </div>
              <div className="bg-black/30 p-4 rounded-sm border border-accent/30">
                <span className="block text-[10px] uppercase tracking-widest text-accent mb-1">Key Metric</span>
                <span className="font-bold text-sm text-accent">ROAS, CPA</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
