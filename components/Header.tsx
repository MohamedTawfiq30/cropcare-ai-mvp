"use client";
import { useRouter } from "next/navigation";


export default function Header() {

  const router = useRouter();

  const handleDashboard = (e: React.FormEvent) => {
    e.preventDefault();
  
    router.push("/login");
  };

    return (
      <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-green-700">
            🌱 CropCare AI Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Smart Agriculture Monitoring
          </p>
        </div>
  
        <button  onClick={handleDashboard}  className="bg-green-600 text-white px-5 py-2 rounded-xl">
          Logout
        </button>
      </div>





    );
  }
  