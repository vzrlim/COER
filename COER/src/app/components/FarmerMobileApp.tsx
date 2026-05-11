import { useState } from 'react';
import { Droplets, Coins, Sprout, ChevronLeft } from 'lucide-react';

interface FarmerMobileAppProps {
  onReturnToDesktop: () => void;
}

export function FarmerMobileApp({ onReturnToDesktop }: FarmerMobileAppProps) {
  const [autoPilotEnabled, setAutoPilotEnabled] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      {/* iPhone 14 Pro sized container */}
      <div className="w-[375px] h-[812px] bg-card border-2 border-border rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">
        {/* Status bar area */}
        <div className="h-12 bg-card border-b border-border/30 flex items-center justify-center">
          <div className="text-xs text-muted-foreground">9:41 AM</div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto bg-background p-6">
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-2xl mb-1">Good Morning!</h1>
            <p className="text-primary font-medium">Your farm is 100% Healthy.</p>
          </div>

          {/* Auto-Pilot Status Card */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg mb-4">Auto-Pilot Status</h2>

            {/* Large Toggle Switch */}
            <div className="flex items-center justify-center mb-4">
              <button
                onClick={() => setAutoPilotEnabled(!autoPilotEnabled)}
                className={`relative w-28 h-14 rounded-full transition-colors ${
                  autoPilotEnabled ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-2 left-2 w-10 h-10 bg-white rounded-full shadow-md transition-transform ${
                    autoPilotEnabled ? 'translate-x-14' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold mb-2">
                {autoPilotEnabled ? 'ON' : 'OFF'}
              </div>
              <p className="text-sm text-muted-foreground">
                The Agentic Plant Doctor is managing your lights and water.
              </p>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="flex gap-3 overflow-x-auto mb-6 pb-2">
            <div className="flex-shrink-0 w-28 bg-card border border-border rounded-xl shadow-sm p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">24°C</div>
              <div className="text-xs text-muted-foreground">Temp</div>
            </div>
            <div className="flex-shrink-0 w-28 bg-card border border-border rounded-xl shadow-sm p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">RM 12.40</div>
              <div className="text-xs text-muted-foreground">Saved</div>
            </div>
            <div className="flex-shrink-0 w-28 bg-card border border-border rounded-xl shadow-sm p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">14 Days</div>
              <div className="text-xs text-muted-foreground">to Harvest</div>
            </div>
          </div>

          {/* Notifications Feed */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Notifications</h3>

            {/* Notification 1 - Water */}
            <div className="bg-[#e8f4f8] border border-[#b3d9e8] rounded-xl p-4 mb-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#d0e8f2] rounded-lg flex-shrink-0">
                  <Droplets className="w-5 h-5 text-[#4a90b5]" />
                </div>
                <p className="text-sm text-foreground flex-1">
                  Hey! I noticed the canopy was dropping slightly, so I gave the lettuce a quick 5-minute water spray. They are looking perky again!
                </p>
              </div>
              <div className="text-xs text-muted-foreground mt-2 ml-11">2 hours ago</div>
            </div>

            {/* Notification 2 - Energy Savings */}
            <div className="bg-[#fef9ed] border border-[#e8dcc4] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#f5eed9] rounded-lg flex-shrink-0">
                  <Coins className="w-5 h-5 text-[#b8a88a]" />
                </div>
                <p className="text-sm text-foreground flex-1">
                  TNB prices spiked this afternoon due to clouds. I turned off the main LEDs and will resume at 10 PM to save you RM 15.00 this week.
                </p>
              </div>
              <div className="text-xs text-muted-foreground mt-2 ml-11">5 hours ago</div>
            </div>
          </div>

          {/* Return Link */}
          <button
            onClick={onReturnToDesktop}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Return to Command Center
          </button>
        </div>
      </div>
    </div>
  );
}
