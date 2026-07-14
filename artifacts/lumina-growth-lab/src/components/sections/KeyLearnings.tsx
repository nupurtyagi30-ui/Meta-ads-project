import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const learnings = [
  "Audience quality impacts performance more than audience size.",
  "UGC creatives often outperform polished brand creatives.",
  "Retargeting audiences deliver stronger conversion efficiency.",
  "Creative testing is essential for campaign scalability.",
  "Data-driven optimization improves campaign profitability."
];

export function KeyLearnings() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-serif text-2xl italic">10</span>
            <h2 className="text-2xl font-serif text-primary uppercase tracking-wide">Key Takeaways</h2>
          </div>
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">Strategic Learnings</p>
        </motion.div>

        <div className="bg-card border border-border p-8 md:p-10 rounded-sm shadow-sm print-break-inside-avoid">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {learnings.map((learning, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-6 h-6 rounded-sm bg-primary/5 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary/10">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-primary font-medium text-sm leading-relaxed">{learning}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
