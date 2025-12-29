type PlantSelectorProps = {
  plant: "Coconut" | "Guava";
  setPlant: (plant: "Coconut" | "Guava") => void;
};

export default function PlantSelector({ plant, setPlant }: PlantSelectorProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold text-gray-700 mb-2">
        Plant Selection
      </h3>

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => setPlant("Coconut")}
          className={`px-4 py-2 rounded-full ${
            plant === "Coconut"
              ? "bg-green-600 text-white"
              : "bg-gray-400"
          }`}
        >
          Coconut
        </button>

        <button
          onClick={() => setPlant("Guava")}
          className={`px-4 py-2 rounded-full ${
            plant === "Guava"
              ? "bg-green-600 text-white"
              : "bg-gray-400"
          }`}
        >
          Guava
        </button>
      </div>

      <p className="text-sm text-gray-400 mt-3">
        Thresholds change based on crop
      </p>
    </div>
  );
}
