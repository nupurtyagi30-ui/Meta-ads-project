import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Target, CircleDollarSign } from 'lucide-react';

const performanceData = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const baseROAS = 2.0;
  const growth = day * 0.08;
  const noise = (Math.random() - 0.5) * 0.4;
  const roas = Math.min(5.5, Math.max(1.5, baseROAS + growth + noise));
  const purchases = Math.floor(roas * 8 + (Math.random() * 5));
  
  return {
    day: `Day ${day}`,
    roas: Number(roas.toFixed(1)),
    purchases
  };
});

const finalMetrics = [
  { label: 'Total Reach', value: '450,000', icon: Users, suffix: '' },
  { label: 'Impressions', value: '1,200,000', icon: Target, suffix: '' },
  { label: 'Avg. CTR', value: '2.8', icon: TrendingUp, suffix: '%' },
  { label: 'Avg. CPC', value: '7', icon: CircleDollarSign, prefix: '₹' },
  { label: 'CPA', value: '185', icon: Target, prefix: '₹' },
  { label: 'Total Purchases', value: '540', icon: CircleDollarSign, suffix: '' },
];

export function PerformanceDashboard() {
  return (
    <section id="performance" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-accent font-serif text-2xl italic">07</span>
              <h2 className="text-2xl font-serif text-primary uppercase tracking-wide">Performance Dashboard</h2>
            </div>
            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">30-Day Campaign Results</p>
          </div>
          <div className="bg-primary text-primary-foreground px-8 py-5 rounded-sm shadow-sm border border-primary-foreground/10 text-center md:text-right">
            <span className="block text-[10px] uppercase tracking-widest text-primary-foreground/70 mb-1 font-bold">Final Blended ROAS</span>
            <span className="text-4xl font-serif text-accent">4.2x</span>
          </div>
        </motion.div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 print-break-inside-avoid">
          {finalMetrics.map((metric, index) => (
            <Card key={index} className="border-border/50 shadow-sm bg-card rounded-sm">
              <CardContent className="p-5 flex flex-col items-center text-center justify-center">
                <metric.icon className="w-5 h-5 text-muted-foreground/50 mb-3" />
                <span className="text-xl font-serif text-primary mb-1">
                  {metric.prefix}{metric.value}{metric.suffix}
                </span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">
                  {metric.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print-break-inside-avoid">
          <Card className="lg:col-span-2 border-border/50 shadow-sm rounded-sm">
            <CardContent className="p-8">
              <h3 className="font-bold text-[11px] uppercase tracking-widest text-primary mb-8">ROAS Trend Over 30 Days</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRoas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(25, 80%, 55%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(25, 80%, 55%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      minTickGap={30}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '2px', border: '1px solid hsl(var(--border))', fontSize: '12px' }}
                      itemStyle={{ color: 'hsl(var(--primary))' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="roas" 
                      stroke="hsl(25, 80%, 55%)" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorRoas)" 
                      name="ROAS"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm bg-primary text-primary-foreground rounded-sm">
            <CardContent className="p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-[11px] uppercase tracking-widest text-white mb-8">Cumulative Purchases</h3>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <Line 
                        type="monotone" 
                        dataKey="purchases" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={2} 
                        dot={false}
                      />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))', borderRadius: '2px', border: 'none', fontSize: '12px' }}
                        itemStyle={{ color: 'hsl(var(--primary))' }}
                        cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-primary-foreground/70 leading-relaxed font-medium">
                  Campaign optimizations in week 2 (creative rotation and audience expansion) led to an accelerated purchase velocity in the final 14 days, effectively driving down CPA while scaling volume.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
