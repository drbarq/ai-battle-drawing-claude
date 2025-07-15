import { Plant } from './storage';

export const getDefaultPlants = (): Plant[] => [
  {
    id: "1",
    name: "Monstera",
    type: "leafy",
    health: 80,
    lastWatered: "2 days ago",
    needsWatering: true,
    wateringSchedule: 3,
    createdAt: new Date().toISOString(),
    wateringHistory: [
      { date: "Jan 14", action: "watered" },
      { date: "Jan 11", action: "watered" },
      { date: "Jan 8", action: "watered" },
    ],
  },
  {
    id: "2", 
    name: "Cactus",
    type: "succulent",
    health: 100,
    lastWatered: "1 week",
    needsWatering: false,
    wateringSchedule: 7,
    createdAt: new Date().toISOString(),
    wateringHistory: [
      { date: "Jan 9", action: "watered" },
      { date: "Jan 2", action: "watered" },
      { date: "Dec 26", action: "watered" },
    ],
  },
];