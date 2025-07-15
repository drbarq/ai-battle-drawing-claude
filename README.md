# Plant Watering App 🌱

A beautiful and intuitive plant care tracking application built with Next.js. Keep your plants happy and healthy by tracking their watering schedules, health status, and watering history.

## Features

- 📱 **Mobile-responsive design** - Works perfectly on all devices
- 🌿 **Plant management** - Add, view, and manage your plant collection
- 💧 **Watering tracking** - Track when you water your plants with history
- 📊 **Health monitoring** - Visual health bars show plant status
- 🔔 **Watering reminders** - See which plants need watering today
- 💾 **Local storage** - Your plants persist between sessions
- 📈 **Analytics** - Vercel Analytics integration for insights

## Plant Types Supported

- 🌿 Leafy plants (Monstera, etc.)
- 🌵 Cacti and succulents
- 🌸 Flowering plants
- 🌿 Herbs

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd plant-watering-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **View your plants** - See all your plants on the homepage with their health status
2. **Add new plants** - Click "Add New Plant" to register a new plant with its watering schedule
3. **Water plants** - Click "Water Today" when plants need watering
4. **View details** - Click on any plant to see detailed information and watering history
5. **Confirm watering** - Use the confirmation screen to log watering events

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Browser localStorage
- **Analytics**: Vercel Analytics
- **Deployment**: Optimized for Vercel

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage (plant list)
│   ├── add-plant/         # Add new plant form
│   ├── plant/[id]/        # Plant details page
│   └── water-confirm/[id]/ # Water confirmation
├── lib/
│   ├── storage.ts         # LocalStorage utilities
│   └── defaultPlants.ts   # Default plant data
└── globals.css            # Global styles
```

## Key Components

- **Plant List** - Homepage showing all plants with quick actions
- **Add Plant Form** - Form to add new plants with custom schedules
- **Plant Details** - Detailed view with health metrics and history
- **Water Confirmation** - Confirmation dialog for watering actions

## Data Model

Plants are stored with the following structure:
```typescript
interface Plant {
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
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Connect your repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Analytics will be automatically enabled

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for plant lovers everywhere! 🌱
