import React from 'react';
import { Download, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-xl rounded-sm">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight text-primary tracking-wide">Nupur Tyagi</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Marketing Professional</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-muted-foreground tracking-wide uppercase">
          <a href="#strategy" className="hover:text-primary transition-colors">Strategy</a>
          <a href="#research" className="hover:text-primary transition-colors">Research</a>
          <a href="#execution" className="hover:text-primary transition-colors">Execution</a>
          <a href="#performance" className="hover:text-primary transition-colors">Performance</a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handlePrint} className="hidden sm:flex text-xs uppercase tracking-wider font-semibold group border-primary/20 hover:border-primary/50 text-primary rounded-sm">
            <Download className="mr-2 h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
            Download Report
          </Button>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="sm" className="text-xs uppercase tracking-wider font-semibold text-primary hover:bg-primary/5 border border-transparent hover:border-primary/10 rounded-sm">
              <Linkedin className="mr-2 h-3.5 w-3.5" />
              Connect
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
