import React from 'react';
import { motion } from 'framer-motion';

const recommendations = [
  "Increase Retargeting Budget: Shift 15% of TOFU budget into MOFU/BOFU retargeting, given the 5.2x ROAS observed in those segments.",
  "Expand Lookalike Audiences: Create 1-3% LALs based on the new purchasers generated in this campaign to scale the winning audience.",
  "Launch Creator-Led Whitelisting: Partner with 3 micro-influencers to run ads directly from their handles (Allowlisting), leveraging established creator trust.",
  "Improve Landing Page Speed: Bounce rate on mobile was 62%. Optimizing the mobile landing page load time could improve CPA by an estimated 10-15%.",
  "Scale Winning Creatives: Produce 5 new variations of the winning UGC video format (different hooks, same body content) to prevent ad fatigue while scaling spend."
];

export function Recommendations() {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start print-break-inside-avoid">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-accent font-serif text-2xl italic">09</span>
              <h2 className="text-2xl font-serif text-white uppercase tracking-wide">Optimization Recommendations</h2>
            </div>
            <p className="text-primary-foreground/70 text-sm font-medium tracking-wide uppercase mb-8">Scaling Strategy</p>
            
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-8">
              Based on the 30-day performance data, here is the strategic roadmap for scaling the account to ₹5,00,000/month spend while maintaining efficiency.
            </p>
            <div className="w-12 h-0.5 bg-accent mb-8"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white/5 border border-white/10 rounded-sm p-8 md:p-10 backdrop-blur-sm"
          >
            <ul className="space-y-8">
              {recommendations.map((rec, index) => {
                const [boldTitle, description] = rec.split(': ');
                return (
                  <li key={index} className="flex gap-4 items-start">
                    <span className="text-accent font-serif text-lg italic leading-none">{index + 1}</span>
                    <div>
                      <span className="font-bold text-[11px] uppercase tracking-widest text-white block mb-2">{boldTitle}</span>
                      <span className="text-sm text-primary-foreground/70 leading-relaxed block">{description}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
