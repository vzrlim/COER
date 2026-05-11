import { AlertTriangle, Camera, ScanEye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CanopyVisionContent() {
  const turgorPressure = 67;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-2">
          <ScanEye className="w-6 h-6 text-primary" />
          <h2>Canopy Vision: Multi-Modal Analysis</h2>
        </div>
        <p className="text-muted-foreground">
          Combining RGB imaging with 3D depth mapping to detect structural anomalies invisible to standard cameras
        </p>
      </div>

      {/* Split-Pane Image Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RGB Image Pane */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="bg-muted px-4 py-3 border-b border-border flex items-center gap-2">
            <Camera className="w-4 h-4 text-primary" />
            <h3>Standard RGB Camera</h3>
          </div>
          <div className="relative aspect-[4/3] bg-muted">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1656740840031-41cb3bc73c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Hydroponic crop tray RGB view"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur px-3 py-1.5 rounded-lg border border-border">
              <span className="text-sm text-foreground">Sector 4: Normal appearance</span>
            </div>
          </div>
        </div>

        {/* Depth Map Pane */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="bg-muted px-4 py-3 border-b border-border flex items-center gap-2">
            <ScanEye className="w-4 h-4 text-primary" />
            <h3>3D Depth Map (LiDAR)</h3>
          </div>
          <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400 flex items-center justify-center">
            {/* Simulated depth map visualization */}
            <div className="absolute inset-0 opacity-40">
              <div className="w-full h-full grid grid-cols-8 grid-rows-6">
                {Array.from({ length: 48 }).map((_, i) => {
                  const isAnomalyZone = i >= 28 && i <= 35;
                  const brightness = isAnomalyZone
                    ? Math.random() * 40 + 20
                    : Math.random() * 60 + 100;
                  return (
                    <div
                      key={i}
                      className="border border-gray-700/30"
                      style={{
                        backgroundColor: `rgb(${brightness}, ${brightness}, ${brightness})`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="absolute bottom-3 left-3 bg-destructive/90 backdrop-blur px-3 py-1.5 rounded-lg border border-destructive flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">Sector 4: Depth anomaly -3cm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structural Anomaly Detection Card */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <h3 className="mb-4">Structural Anomaly Detection</h3>

        {/* Turgor Pressure Gauge */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Canopy Turgor Pressure / Volume</span>
            <span className="text-sm font-semibold">{turgorPressure}%</span>
          </div>
          <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${turgorPressure}%`,
                backgroundColor: turgorPressure < 70 ? '#c77d7d' : '#7a9b7f',
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Critical Alert */}
        <div className="bg-[#fef5f5] border border-[#e8bcbc] rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#f8d7d7] rounded-lg">
              <AlertTriangle className="w-5 h-5 text-[#a85858]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-[#f8d7d7] text-[#a85858] text-xs font-medium rounded">
                  ALERT
                </span>
                <span className="text-sm font-medium text-[#a85858]">Critical Anomaly Detected</span>
              </div>
              <p className="text-sm text-foreground">
                <strong>Alert:</strong> 3cm depth drop detected in Sector 4. Probable wilting. Standard RGB clear.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                The depth sensor detected a significant structural change indicating loss of turgor pressure, while the RGB camera shows no visible color or texture changes. This early warning allows intervention before visible symptoms appear.
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Summary */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">RGB Analysis</div>
            <div className="text-sm font-medium text-primary">✓ Normal</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Depth Analysis</div>
            <div className="text-sm font-medium text-destructive">⚠ Anomaly</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Recommended Action</div>
            <div className="text-sm font-medium text-foreground">Increase irrigation</div>
          </div>
        </div>
      </div>
    </div>
  );
}
