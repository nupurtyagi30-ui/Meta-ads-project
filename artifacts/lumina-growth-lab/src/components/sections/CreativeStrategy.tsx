import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { PlayCircle, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

// Using imports to ensure Vite resolves the assets correctly
import adUgc from '@assets/generated_images/ad-ugc.jpg';
import adDemo from '@assets/generated_images/ad-demo.jpg';
import adSocialProof from '@assets/generated_images/ad-social-proof.jpg';

const creatives = [
  {
    stage: 'TOFU',
    format: 'Reel (9:16)',
    type: 'Influencer UGC',
    headline: 'The sunscreen I actually use every day.',
    description: 'A 15-second native TikTok/Reels style video of a creator applying the product in their car, proving zero white cast.',
    imgSrc: adUgc
  },
  {
    stage: 'MOFU',
    format: 'Static / Carousel (4:5)',
    type: 'Product Demo',
    headline: 'SPF 50 protection without white cast.',
    description: 'High-end macro photography showing the lightweight texture of the lotion against a clean, aesthetic background.',
    imgSrc: adDemo
  },
  {
    stage: 'BOFU',
    format: 'Static (1:1)',
    type: 'Social Proof / Offer',
    headline: 'Trusted by 50,000+ skincare lovers.',
    description: 'Collage of radiant women featuring a glowing 5-star review overlay and a strong "Shop Now" call to action with a 15% off code.',
    imgSrc: adSocialProof
  }
];

export function CreativeStrategy() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-serif text-2xl italic">05</span>
            <h2 className="text-2xl font-serif text-primary uppercase tracking-wide">Creative Strategy</h2>
          </div>
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">Visual Asset Mapping</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print-break-inside-avoid">
          {creatives.map((ad, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="overflow-hidden border-border/60 shadow-sm rounded-sm h-full group flex flex-col">
                {/* Mock Phone UI Wrapper */}
                <div className="bg-secondary/20 p-3 border-b border-border/40">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-sm bg-primary/20"></div>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-primary">Lumina Beauty</span>
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground ml-auto">Sponsored</span>
                  </div>
                </div>
                
                <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                  <img 
                    src={ad.imgSrc} 
                    alt={ad.type} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    onError={(e) => {
                      e.currentTarget.src = `https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800`;
                    }}
                  />
                  {ad.format.includes('Reel') && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <PlayCircle className="w-12 h-12 text-white/80" />
                    </div>
                  )}
                </div>

                <div className="p-5 bg-white flex-1 flex flex-col">
                  <div className="flex gap-4 mb-4 text-primary/70">
                    <ThumbsUp className="w-4 h-4" />
                    <MessageCircle className="w-4 h-4" />
                    <Share2 className="w-4 h-4" />
                  </div>
                  <p className="text-sm font-semibold mb-2 text-primary">{ad.headline}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {ad.description}
                  </p>
                </div>

                <div className="bg-primary px-5 py-4 border-t border-primary-foreground/10">
                  <div className="flex justify-between items-center text-primary-foreground">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{ad.stage}</span>
                    <span className="text-[10px] uppercase tracking-wider">{ad.type}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
