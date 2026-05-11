import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewContent } from './components/OverviewContent';
import { EnergyArbitrageContent } from './components/EnergyArbitrageContent';
import { CanopyVisionContent } from './components/CanopyVisionContent';
import { AgenticLogContent } from './components/AgenticLogContent';
import { ClimateContent } from './components/ClimateContent';
import { FarmerMobileApp } from './components/FarmerMobileApp';

export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <OverviewContent />;
      case 'climate':
        return <ClimateContent />;
      case 'energy':
        return <EnergyArbitrageContent />;
      case 'canopy':
        return <CanopyVisionContent />;
      case 'log':
        return <AgenticLogContent />;
      default:
        return <OverviewContent />;
    }
  };

  // Render mobile view if selected
  if (viewMode === 'mobile') {
    return <FarmerMobileApp onReturnToDesktop={() => setViewMode('desktop')} />;
  }

  // Render desktop view
  return (
    <div className="size-full flex">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeView}
        onItemChange={setActiveView}
        onSwitchToMobile={() => setViewMode('mobile')}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}