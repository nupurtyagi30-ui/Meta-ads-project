import React from 'react';
import { motion } from 'framer-motion';

const insights = [
  {
    title: 'Authenticity Outperforms Polish',
    description: 'UGC creatives shot on iPhone generated 77% higher engagement and converted at a significantly lower cost compared to high-production studio branded creatives.'
  },
  {
    title: 'Retargeting Efficiency',
    description: 'The MOFU/BOFU retargeting audiences (video viewers, Instagram engagers, cart abandoners) delivered the strongest ROAS at 5.2x, validating the funnel approach.'
  },
  {
    title: 'Core Demographic Validated',
    description: 'Women aged 25-34 generated the highest purchase volume and lowest CPA, confirming "The Working Professional" persona as the most profitable segment.'
  },
  {
    title: 'Mobile Dominance',
    description: 'Mobile placements (specifically Instagram Reels and Stories) accounted for 89% of all purchases, heavily outperforming desktop and Facebook feed placements.'
  }
];

export function Insights() {
  return (
    <section className="py-20 bg-white border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-serif text-2xl italic">08</span>
            <h2 className="text-2xl font-serif text-primary uppercase tracking-wide">Marketing Insights</h2>
          </div>
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">Data-Driven Learnings</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-break-inside-avoid">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-secondary/10 border border-border rounded-sm hover:border-primary/20 transition-colors"
            >
              <h3 className="font-bold text-[11px] uppercase tracking-widest text-primary mb-3">{insight.title}</h3>
              <p className="text-sm text-primary/80 leading-relaxed">
                {insight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
