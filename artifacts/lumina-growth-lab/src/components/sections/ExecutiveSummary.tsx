import React from 'react';
import { motion } from 'framer-motion';

export function ExecutiveSummary() {
  return (
    <section id="strategy" className="py-20 bg-secondary/20 border-y border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-serif text-2xl italic">01</span>
            <h2 className="text-2xl font-serif text-primary uppercase tracking-wide">Executive Summary</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl text-sm font-medium tracking-wide uppercase">Strategic Alignment & Campaign Architecture</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 print-break-inside-avoid">
          {/* Left Column */}
          <div className="md:col-span-5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-8 rounded-sm shadow-sm"
            >
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Business Challenge</h3>
              <p className="text-primary text-sm leading-relaxed">
                Lumina Beauty, an emerging D2C skincare brand, faces high Customer Acquisition Costs (CAC) in a saturated market. Their flagship "SPF 50 Daily Defense" sunscreen has stellar retention, but lacks top-of-mind awareness among premium buyers. Previous ad campaigns focused exclusively on bottom-of-funnel conversions, exhausting warm audiences without feeding the acquisition pipeline.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-primary text-primary-foreground border border-primary p-8 rounded-sm shadow-sm"
            >
              <h3 className="text-xs uppercase tracking-widest text-primary-foreground/60 font-bold mb-3">Marketing Objective</h3>
              <p className="text-primary-foreground text-sm leading-relaxed">
                Establish a sustainable, full-funnel architecture on Meta Ads to drive net-new online purchases while improving blended Return on Ad Spend (ROAS).
              </p>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6"
            >
              <div className="border-b border-border pb-6">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">Target Audience</h3>
                <p className="text-primary text-sm leading-relaxed">
                  Three core segments identified through customer research: College Students seeking accessible skincare, Working Professionals demanding daily convenience, and Beauty Enthusiasts prioritizing premium skin health.
                </p>
              </div>

              <div className="border-b border-border pb-6">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">Campaign Strategy</h3>
                <p className="text-primary text-sm leading-relaxed">
                  A 30-day, three-stage funnel (Awareness, Consideration, Conversion) allocating a ₹1,00,000 budget across high-impact video views, traffic campaigns, and purchase-optimized conversion events. Heavily indexing on creator-led UGC and authentic social proof to reduce CPA.
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">Expected Business Impact</h3>
                <p className="text-primary text-sm leading-relaxed">
                  A projected 3.5x blended ROAS, with an estimated 450,000+ unique reach and 500+ net-new purchases, stabilizing the acquisition cost to allow for long-term scalability.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
