"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPlants, waterPlant, Plant, savePlants } from "@/lib/storage";
import { getDefaultPlants } from "@/lib/defaultPlants";

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const storedPlants = getPlants();
    
    if (storedPlants.length === 0) {
      const defaultPlants = getDefaultPlants();
      setPlants(defaultPlants);
      savePlants(defaultPlants);
    } else {
      setPlants(storedPlants);
    }
  }, []);

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

  const handleWaterPlant = (plantId: string) => {
    // Update in localStorage first
    waterPlant(plantId);
    
    // Then update local state
    const updatedPlants = getPlants();
    setPlants(updatedPlants);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
            PLANT WATERING APP
          </h1>
          
          <div className="border-2 border-gray-300 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">MY PLANTS</h2>
            
            <div className="space-y-4">
              {plants.map((plant) => (
                <div key={plant.id} className="plant-card border border-gray-200 rounded-lg p-4 bg-white">
                  <Link href={`/plant/${plant.id}`} className="block">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{getPlantIcon(plant.type)}</span>
                      <span className="font-medium text-lg text-gray-900">{plant.name}</span>
                    </div>
                  </Link>
                  
                  <div className="mb-2">
                    <span className="text-sm text-gray-700 font-medium">LAST WATERED: {plant.lastWatered}</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700 mr-2 font-medium">Health</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 mr-2">
                        <div 
                          className="bg-green-500 h-4 rounded-full transition-all duration-300"
                          style={{ width: `${plant.health}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{plant.health}%</span>
                    </div>
                  </div>
                  
                  {plant.needsWatering ? (
                    <button
                      onClick={() => handleWaterPlant(plant.id)}
                      className="button-primary w-full text-white py-2 px-4 rounded font-medium transition-all"
                    >
                      WATER TODAY
                    </button>
                  ) : (
                    <div className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded border-2 border-gray-300 text-center font-medium">
                      Good for 2 weeks
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Link 
              href="/add-plant"
              className="button-success block w-full mt-6 text-white py-3 px-4 rounded font-medium text-center transition-all"
            >
              + ADD NEW PLANT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
