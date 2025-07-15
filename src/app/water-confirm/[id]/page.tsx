"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPlants, waterPlant, Plant } from "@/lib/storage";

export default function WaterConfirm() {
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

  const handleYes = () => {
    if (plant) {
      waterPlant(plant.id);
    }
    router.push("/");
  };

  const handleNo = () => {
    router.back();
  };

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold text-center mb-6 text-gray-900">
            WATER CONFIRMATION SCREEN
          </h1>

          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{getPlantIcon(plant.type)}</div>
              <h2 className="text-xl font-bold mb-4 text-gray-900">{plant.name}</h2>
              
              <div className="border-2 border-gray-300 rounded-lg p-4 mb-6">
                <p className="text-lg font-bold text-gray-900">
                  Just watered {plant.name}?
                </p>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleYes}
                className="flex-1 bg-green-500 text-white py-4 px-6 rounded border-2 border-green-600 hover:bg-green-600 font-bold text-xl"
              >
                YES
              </button>
              
              <button
                onClick={handleNo}
                className="flex-1 bg-red-500 text-white py-4 px-6 rounded border-2 border-red-600 hover:bg-red-600 font-bold text-xl"
              >
                NO
              </button>
            </div>

            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                Next watering: {plant?.wateringSchedule || 3} days
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-gray-500 text-white py-3 px-4 rounded border-2 border-gray-600 hover:bg-gray-600 font-medium text-lg"
            >
              ← BACK TO PLANTS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}