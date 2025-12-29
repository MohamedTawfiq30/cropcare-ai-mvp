type AlertsProps = {
  soil: number;
  ph: number;
  waterFlow?: number;
  plant?: "Coconut" | "Guava";
};

export default function Alerts({
  soil,
  ph,
  waterFlow = 0,
  plant = "Guava",
}: AlertsProps) {
  const alerts: string[] = [];

  // 🌱 Crop-based thresholds
  const soilThreshold = plant === "Coconut" ? 35 : 30;
  const phMin = plant === "Coconut" ? 5.5 : 5.8;
  const phMax = plant === "Coconut" ? 7.5 : 7.0;
  const waterLimit = plant === "Coconut" ? 18 : 15;

  // 🚨 Alert conditions
  if (soil < soilThreshold) {
    alerts.push("Low soil moisture detected");
  }

  if (ph < phMin || ph > phMax) {
    alerts.push("Abnormal pH value");
  }

  if (waterFlow > waterLimit) {
    alerts.push("Water flow unusually high");
  }

  // ✅ No alerts state
  if (alerts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Alerts</h3>
        <p className="text-green-600">All conditions are normal 🌱</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-3">Alerts</h3>
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm"
          >
            {alert}
          </div>
        ))}
      </div>
    </div>
  );
}
