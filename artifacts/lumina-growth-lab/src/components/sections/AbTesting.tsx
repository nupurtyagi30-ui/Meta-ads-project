import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy } from 'lucide-react';

export function AbTesting() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-serif text-2xl italic">06</span>
            <h2 className="text-2xl font-serif text-primary uppercase tracking-wide">A/B Testing Lab</h2>
          </div>
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">Creative Optimization</p>
        </motion.div>

        <div className="bg-card rounded-sm border border-border shadow-sm p-1 print-break-inside-avoid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-sm">
            {/* Variant A */}
            <div className="p-8 md:p-10 bg-secondary/10 border-b md:border-b-0 md:border-r border-border">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-secondary text-primary text-[10px] uppercase tracking-widest font-bold mb-8">
                Variant A: Studio Product Shot
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-border/50 pb-3">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Click-Through Rate</span>
                  <span className="font-serif text-primary text-xl">1.8%</span>
                </div>
                <div className="flex justify-between items-end border-b border-border/50 pb-3">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Cost Per Click</span>
                  <span className="font-serif text-primary text-xl">₹12.50</span>
                </div>
                <div className="flex justify-between items-end border-b border-border/50 pb-3">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Cost Per Acquisition</span>
                  <span className="font-serif text-primary text-xl">₹240</span>
                </div>
                <div className="flex justify-between items-end pb-2">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">ROAS</span>
                  <span className="font-serif text-primary text-xl">2.8x</span>
                </div>
              </div>
            </div>

            {/* Variant B (Winner) */}
            <div className="p-8 md:p-10 bg-primary relative">
              <div className="absolute top-0 right-0 p-6">
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded-sm text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-sm">
                  <Trophy className="w-3 h-3" />
                  WINNER
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/10 text-white text-[10px] uppercase tracking-widest font-bold mb-8 border border-white/20">
                Variant B: UGC Lifestyle Video
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-xs uppercase tracking-widest text-primary-foreground/60 font-semibold">Click-Through Rate</span>
                  <span className="font-serif text-accent text-xl">3.2%</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-xs uppercase tracking-widest text-primary-foreground/60 font-semibold">Cost Per Click</span>
                  <span className="font-serif text-accent text-xl">₹6.20</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-xs uppercase tracking-widest text-primary-foreground/60 font-semibold">Cost Per Acquisition</span>
                  <span className="font-serif text-accent text-xl">₹165</span>
                </div>
                <div className="flex justify-between items-end pb-2">
                  <span className="text-xs uppercase tracking-widest text-primary-foreground/60 font-semibold">ROAS</span>
                  <span className="font-serif text-accent text-xl">4.5x</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 bg-card border-t border-border">
            <h4 className="font-bold text-[11px] uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-accent" />
              Strategic Insight: Why Variant B Won
            </h4>
            <p className="text-sm text-primary/80 leading-relaxed max-w-3xl">
              The UGC lifestyle video (Variant B) significantly outperformed the polished studio shot by blending natively into the Instagram Reels and TikTok feed. It addressed the "white cast" pain point directly through a live demonstration on human skin, establishing immediate trust. This drove a 77% increase in CTR and ultimately lowered the CPA by 31%, proving that authenticity converts better than perfection for this demographic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
