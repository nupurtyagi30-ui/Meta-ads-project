import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Sparkles } from 'lucide-react';

const personas = [
  {
    id: 'student',
    title: 'The College Student',
    icon: User,
    age: '20-24',
    painPoint: 'Affordable, effective skincare that looks good on social media.',
    interests: 'Fashion, Beauty Influencers, Fast-fashion, University Life',
    behavior: 'High scrolling volume on Reels. Impulse buyer if the aesthetic is right and price is accessible.',
    motivation: 'Wants clear skin without spending a fortune. Influenced heavily by peer reviews and TikTok trends.'
  },
  {
    id: 'professional',
    title: 'The Working Professional',
    icon: Briefcase,
    age: '25-35',
    painPoint: 'Needs daily sun protection that is quick to apply and sits well under makeup.',
    interests: 'Career, Wellness, Pilates, Premium Coffee, Work-Life Balance',
    behavior: 'Researches products before buying. Values convenience and multi-purpose products. High lifetime value (LTV).',
    motivation: 'Efficiency. Wants a "one-and-done" morning routine. Willing to pay a premium for formulations that save time.'
  },
  {
    id: 'enthusiast',
    title: 'The Beauty Enthusiast',
    icon: Sparkles,
    age: '22-35',
    painPoint: 'Wants scientifically backed skin health, zero white-cast, and premium ingredients.',
    interests: 'Dermatology, Clean Beauty, Skincare Subreddits, Luxury Cosmetics',
    behavior: 'Reads ingredient lists. High engagement with educational content and product demonstrations.',
    motivation: 'Long-term skin health. Seeking the "holy grail" sunscreen to complete their extensive 7-step routine.'
  }
];

export function CustomerResearch() {
  return (
    <section id="research" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
            <span className="text-accent font-serif text-2xl italic">02</span>
            <h2 className="text-2xl font-serif text-primary uppercase tracking-wide">Customer Research & Personas</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl text-sm font-medium tracking-wide uppercase mx-auto md:mx-0">
            Audience Segmentation Strategy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print-break-inside-avoid">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-secondary/50 rounded-sm flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                <persona.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-1">{persona.title}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-6 border-b border-border pb-4">Age: {persona.age}</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">Primary Pain Point</h4>
                  <p className="text-sm text-primary/80 leading-relaxed">{persona.painPoint}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">Interests & Targeting</h4>
                  <p className="text-sm text-primary/80 leading-relaxed">{persona.interests}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">Behavior</h4>
                  <p className="text-sm text-primary/80 leading-relaxed">{persona.behavior}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">Purchase Motivation</h4>
                  <p className="text-sm text-primary/80 leading-relaxed">{persona.motivation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
