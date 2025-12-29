type PumpControlProps = {
  pumpOn: boolean;
  togglePump: () => void;
};

export default function PumpControl({ pumpOn, togglePump }: PumpControlProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold text-gray-700 mb-2">
        Irrigation Control
      </h3>

      <p
        className={`font-medium mb-3 ${
          pumpOn ? "text-green-600" : "text-red-600"
        }`}
      >
        Pump Status: {pumpOn ? "ON" : "OFF"}
      </p>

      <button
        onClick={togglePump}
        className={`px-5 py-2 rounded-xl text-white ${
          pumpOn ? "bg-red-600" : "bg-green-600"
        }`}
      >
        Turn {pumpOn ? "OFF" : "ON"}
      </button>
    </div>
  );
}
