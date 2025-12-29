"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../../firebase/config";

import Header from "../../components/Header";
import SensorCard from "../../components/SensorCard";
import PumpControl from "../../components/PumpControl";
import PlantSelector from "../../components/PlantSelector";
import Alerts from "../../components/Alerts";

export default function DashboardPage() {
  const router = useRouter();

  // ---------- STATE ----------
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const [pumpOn, setPumpOn] = useState(true);
  const [plant, setPlant] = useState<"Coconut" | "Guava">("Guava");

  const [soilMoisture, setSoilMoisture] = useState(0);
  const [phValue, setPhValue] = useState(0);
  const [waterFlow, setWaterFlow] = useState(0);

  // ---------- AUTH GUARD ----------
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // ---------- READ SENSOR DATA ----------
  useEffect(() => {
    if (!authenticated || !db) return; // 🔑 wait for auth and db
  
    const sensorRef = ref(db, "sensors");
  
    const unsubscribe = onValue(
      sensorRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("Firebase data:", data); // DEBUG
  
        if (data) {
          setSoilMoisture(data.soil ?? 0);
          setPhValue(data.ph ?? 0);
          setWaterFlow(data.waterFlow ?? 0);
        }
      },
      (error) => {
        console.error("Firebase read error:", error);
      }
    );
  
    return () => unsubscribe();
  }, [authenticated]);
  

  // ---------- UI ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-8">
      <Header />

      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Sensor Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SensorCard
          title="Soil Moisture"
          value={`${soilMoisture}%`}
          status="Normal"
        />

        <SensorCard
          title="pH Value"
          value={phValue.toString()}
          status="Normal"
        />

        <SensorCard
          title="Water Flow (L/min)"
          value={waterFlow.toString()}
          status="High"
          statusColor="text-yellow-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PumpControl
          pumpOn={pumpOn}
          togglePump={() => setPumpOn(!pumpOn)}
        />

        <PlantSelector plant={plant} setPlant={setPlant} />

        <Alerts
  soil={soilMoisture}
  ph={phValue}
  waterFlow={waterFlow}
  plant={plant}
/>

      </div>
    </div>
  );
}
