import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const budgetData = [
  { name: 'Awareness (TOFU)', value: 40000, color: '#334155' }, // primary
  { name: 'Consideration (MOFU)', value: 30000, color: '#f97316' }, // accent
  { name: 'Conversion (BOFU)', value: 30000, color: '#94a3b8' }, // muted
];

const projectedKPIs = [
  { label: 'Projected Reach', value: '450,000+', trend: 'Unique Users' },
  { label: 'Est. Impressions', value: '1.2M', trend: 'Frequency: 2.6' },
  { label: 'Target CPM', value: '₹85', trend: 'Industry avg: ₹110' },
  { label: 'Target CTR', value: '2.5%', trend: 'Blend of all stages' },
  { label: 'Target CPC', value: '₹8.50', trend: 'Link clicks' },
  { label: 'Target CPA', value: '₹200', trend: 'Per purchase' },
  { label: 'Target ROAS', value: '3.5x', trend: 'Blended return' }
];

export function MediaPlan() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-serif text-2xl italic">04</span>
            <h2 className="text-2xl font-serif text-primary uppercase tracking-wide">Media Planning Dashboard</h2>
          </div>
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">Budget Allocation & Projections</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print-break-inside-avoid">
          {/* Budget Split Chart */}
          <Card className="lg:col-span-1 border-border/50 shadow-sm rounded-sm">
            <CardHeader className="border-b border-border/50 bg-card pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">Budget Allocation</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value: number) => `₹${value.toLocaleString()}`}
                      contentStyle={{ borderRadius: '2px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="square" wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* KPI Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {projectedKPIs.map((kpi, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`border-border/50 shadow-sm rounded-sm h-full ${index === projectedKPIs.length - 1 ? 'col-span-2 md:col-span-2 bg-primary text-primary-foreground border-none' : 'bg-card'}`}>
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <span className={`text-[10px] uppercase tracking-widest font-bold mb-3 ${index === projectedKPIs.length - 1 ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {kpi.label}
                    </span>
                    <span className={`text-2xl font-serif mb-1 ${index === projectedKPIs.length - 1 ? 'text-accent' : 'text-primary'}`}>
                      {kpi.value}
                    </span>
                    <span className={`text-xs ${index === projectedKPIs.length - 1 ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                      {kpi.trend}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
