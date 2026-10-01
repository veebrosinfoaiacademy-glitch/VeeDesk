import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { AutomationSection } from './components/sections/AutomationSection';
import { CTASection } from './components/sections/CTASection';
import { EmployeeSection } from './components/sections/EmployeeSection';
import { FeatureGrid } from './components/sections/FeatureGrid';
import { FeatureShowcase } from './components/sections/FeatureShowcase';
import { Hero } from './components/sections/Hero';
import { ManagerDashboard } from './components/sections/ManagerDashboard';
import { PerformanceSection } from './components/sections/PerformanceSection';
import { ProblemSection } from './components/sections/ProblemSection';
import { ReportsSection } from './components/sections/ReportsSection';
import { RoleAccessSection } from './components/sections/RoleAccessSection';
import { SecuritySection } from './components/sections/SecuritySection';
import { SolutionSection } from './components/sections/SolutionSection';
import { TrustStrip } from './components/sections/TrustStrip';
import { WorkflowSection } from './components/sections/WorkflowSection';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-lg bg-ink-900 px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustStrip />
        <ProblemSection />
        <SolutionSection />
        <FeatureGrid />
        <FeatureShowcase />
        <EmployeeSection />
        <ManagerDashboard />
        <PerformanceSection />
        <ReportsSection />
        <AutomationSection />
        <SecuritySection />
        <RoleAccessSection />
        <WorkflowSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
