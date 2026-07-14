import React from 'react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 mt-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-serif text-3xl mb-4">Meta Ads Growth Lab</h3>
            <p className="text-primary-foreground/70 text-sm max-w-sm leading-relaxed mb-8">
              A comprehensive full-funnel strategy case study designed to demonstrate data-driven performance marketing capabilities.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground text-primary flex items-center justify-center font-serif font-bold text-2xl rounded-sm">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight text-white tracking-wide">Portfolio Project Created by Nupur Tyagi</span>
                <span className="text-[11px] text-primary-foreground/60 uppercase tracking-widest mt-0.5 font-semibold">Marketing Professional</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm backdrop-blur-sm">
            <h4 className="font-bold text-xs uppercase tracking-widest mb-3 text-white/90">Disclaimer</h4>
            <p className="text-primary-foreground/70 text-sm leading-relaxed space-y-2">
              <span className="block">For professional portfolio and learning purposes.</span>
              <span className="block">Campaign data is simulated for educational use.</span>
              <span className="block mt-2 pt-2 border-t border-white/10">The brand "Lumina Beauty" and the associated metrics are fictional, created solely to demonstrate strategic thinking, media buying methodology, and data analysis skills.</span>
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs tracking-wider text-primary-foreground/50 uppercase font-medium">
          <p>&copy; {new Date().getFullYear()} Nupur Tyagi. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Influencer Marketing</span>
            <span className="opacity-50">&bull;</span>
            <span>Meta Ads</span>
            <span className="opacity-50">&bull;</span>
            <span>Analytics</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
