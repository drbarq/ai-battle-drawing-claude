export interface WateringEvent {
  date: string;
  action: string;
}

export interface Plant {
  id: string;
  name: string;
  type: string;
  health: number;
  lastWatered: string;
  needsWatering: boolean;
  wateringSchedule: number;
  createdAt: string;
  wateringHistory: WateringEvent[];
}

const STORAGE_KEY = 'plant-watering-app-plants';

export const getPlants = (): Plant[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const plants = stored ? JSON.parse(stored) : [];
    
    // Ensure all plants have wateringHistory array
    return plants.map((plant: Partial<Plant>) => ({
      id: plant.id || '',
      name: plant.name || '',
      type: plant.type || '',
      health: plant.health || 100,
      lastWatered: plant.lastWatered || 'Never',
      needsWatering: plant.needsWatering || true,
      wateringSchedule: plant.wateringSchedule || 3,
      createdAt: plant.createdAt || new Date().toISOString(),
      wateringHistory: plant.wateringHistory || []
    }));
  } catch {
    return [];
  }
};

export const savePlants = (plants: Plant[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
  } catch (error) {
    console.error('Failed to save plants:', error);
  }
};

export const addPlant = (plantData: {
  name: string;
  type: string;
  wateringSchedule: number;
}): Plant => {
  const newPlant: Plant = {
    id: Date.now().toString(),
    name: plantData.name,
    type: plantData.type,
    health: 100,
    lastWatered: 'Never',
    needsWatering: true,
    wateringSchedule: plantData.wateringSchedule,
    createdAt: new Date().toISOString(),
    wateringHistory: [],
  };

  const plants = getPlants();
  plants.push(newPlant);
  savePlants(plants);
  
  return newPlant;
};

export const updatePlant = (id: string, updates: Partial<Plant>): void => {
  const plants = getPlants();
  const index = plants.findIndex(p => p.id === id);
  
  if (index !== -1) {
    plants[index] = { ...plants[index], ...updates };
    savePlants(plants);
  }
};

export const deletePlant = (id: string): void => {
  const plants = getPlants();
  const filtered = plants.filter(p => p.id !== id);
  savePlants(filtered);
};

export const waterPlant = (id: string): void => {
  const plants = getPlants();
  const index = plants.findIndex(p => p.id === id);
  
  if (index !== -1) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    
    // Add to watering history
    const newWateringEvent: WateringEvent = {
      date: dateStr,
      action: 'watered'
    };
    
    plants[index] = {
      ...plants[index],
      lastWatered: 'Just now',
      needsWatering: false,
      health: Math.min(100, plants[index].health + 10),
      wateringHistory: [newWateringEvent, ...(plants[index].wateringHistory || []).slice(0, 9)] // Keep last 10 events
    };
    
    savePlants(plants);
  }
};