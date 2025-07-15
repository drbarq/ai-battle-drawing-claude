"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getPlants, Plant } from "@/lib/storage";

export default function PlantDetails() {
  const params = useParams();
  const router = useRouter();
  const [plant, setPlant] = useState<Plant | null>(null);

  useEffect(() => {
    const plants = getPlants();
    const foundPlant = plants.find(p => p.id === params.id);
    if (foundPlant) {
      setPlant(foundPlant);
    }
  }, [params.id]);

  const getPlantIcon = (type: string) => {
    switch (type) {
      case "leafy":
        return "🌿";
      case "succulent":
        return "🌵";
      default:
        return "🪴";
    }
  };

  const handleWaterNow = () => {
    router.push(`/water-confirm/${params.id}`);
  };

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
            PLANT DETAILS
          </h1>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-2">{getPlantIcon(plant.type)}</div>
              <h2 className="text-2xl font-bold text-gray-900">{plant.name} Details</h2>
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="mb-4">
                <div className="flex items-center">
                  <span className="text-lg text-gray-700 mr-2 font-bold">Health</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 mr-2">
                    <div 
                      className="bg-green-500 h-6 rounded-full transition-all duration-300"
                      style={{ width: `${plant.health}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{plant.health}%</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-lg text-gray-900">
                  <span className="font-bold">Last watered:</span> {plant.lastWatered}
                </div>
                <div className="text-lg text-gray-900">
                  <span className="font-bold">Next watering:</span> In {plant.wateringSchedule} days
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-3 text-gray-900">WATERING HISTORY</h3>
              <div className="space-y-2">
                {plant.wateringHistory.map((event, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-900 font-medium">{event.date}</span>
                    <span className="text-blue-600 font-bold">{event.action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleWaterNow}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded border-2 border-blue-600 hover:bg-blue-600 font-medium text-lg"
              >
                WATER NOW
              </button>
              
              <button className="w-full bg-yellow-500 text-white py-3 px-4 rounded border-2 border-yellow-600 hover:bg-yellow-600 font-medium text-lg">
                EDIT PLANT
              </button>
            </div>

            <Link
              href="/"
              className="block w-full bg-gray-500 text-white py-3 px-4 rounded border-2 border-gray-600 hover:bg-gray-600 font-medium text-lg text-center"
            >
              ← BACK TO PLANTS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}