"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addPlant } from "@/lib/storage";

export default function AddPlant() {
  const router = useRouter();
  const [plantName, setPlantName] = useState("");
  const [plantType, setPlantType] = useState("leafy");
  const [wateringDays, setWateringDays] = useState("3");

  const plantTypes = [
    { value: "leafy", label: "🌿 Leafy Plant", icon: "🌿" },
    { value: "succulent", label: "🌵 Cactus", icon: "🌵" },
    { value: "flowering", label: "🌸 Flowering Plant", icon: "🌸" },
    { value: "herb", label: "🌿 Herb", icon: "🌿" },
  ];

  const handleSave = () => {
    if (plantName.trim()) {
      addPlant({
        name: plantName.trim(),
        type: plantType,
        wateringSchedule: parseInt(wateringDays),
      });
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
            ADD NEW PLANT
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold mb-2 text-gray-900">
                PLANT NAME:
              </label>
              <input
                type="text"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                placeholder="Enter plant name"
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-bold mb-3 text-gray-900">
                PLANT TYPE
              </label>
              <div className="border-2 border-gray-300 rounded-lg p-4">
                <div className="space-y-3">
                  {plantTypes.map((type) => (
                    <label key={type.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value={type.value}
                        checked={plantType === type.value}
                        onChange={(e) => setPlantType(e.target.value)}
                        className="mr-3 w-4 h-4"
                      />
                      <span className="text-lg text-gray-900 font-medium">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold mb-3 text-gray-900">
                WATERING SCHEDULE
              </label>
              <div className="border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg text-gray-900 font-medium">Every</span>
                  <input
                    type="number"
                    value={wateringDays}
                    onChange={(e) => setWateringDays(e.target.value)}
                    min="1"
                    max="30"
                    className="w-16 p-2 border-2 border-gray-300 rounded text-center text-lg text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
                  />
                  <span className="text-lg text-gray-900 font-medium">Days</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleSave}
                disabled={!plantName.trim()}
                className="flex-1 bg-green-500 text-white py-3 px-4 rounded border-2 border-green-600 hover:bg-green-600 font-medium text-lg disabled:bg-gray-300 disabled:border-gray-400 disabled:cursor-not-allowed"
              >
                SAVE PLANT
              </button>
              
              <Link
                href="/"
                className="flex-1 bg-gray-500 text-white py-3 px-4 rounded border-2 border-gray-600 hover:bg-gray-600 font-medium text-lg text-center"
              >
                CANCEL
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}