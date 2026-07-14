import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ExecutiveSummary } from '@/components/sections/ExecutiveSummary';
import { CustomerResearch } from '@/components/sections/CustomerResearch';
import { FunnelStrategy } from '@/components/sections/Funnel';
import { MediaPlan } from '@/components/sections/MediaPlan';
import { CreativeStrategy } from '@/components/sections/CreativeStrategy';
import { AbTesting } from '@/components/sections/AbTesting';
import { PerformanceDashboard } from '@/components/sections/PerformanceDashboard';
import { Insights } from '@/components/sections/Insights';
import { Recommendations } from '@/components/sections/Recommendations';
import { KeyLearnings } from '@/components/sections/KeyLearnings';
import { ProjectImpact } from '@/components/sections/Conclusion';

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-white">
      <Header />
      
      <main id="execution">
        <Hero />
        <ExecutiveSummary />
        <div id="research">
          <CustomerResearch />
        </div>
        <FunnelStrategy />
        <MediaPlan />
        <CreativeStrategy />
        <AbTesting />
        <PerformanceDashboard />
        <Insights />
        <Recommendations />
        <KeyLearnings />
        <ProjectImpact />
      </main>

      <Footer />
    </div>
  );
}
