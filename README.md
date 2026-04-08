# 🗓️ Interactive Wall Calendar Component

**Live Deployment:** [View the Live Demo Here](https://interactive-wall-calendar-7c5s.vercel.app/)

## Overview
This project is an interactive, responsive web component designed to emulate the tactile aesthetic of a physical wall calendar. It was built as a strict frontend engineering challenge, focusing on complex state management, custom date logic, responsive design, and browser-based data persistence.

## ✨ Core Features
* **Custom Date Selection:** Users can seamlessly select a start date and an end date, with the UI visually highlighting the entire range. 
* **Persistent Memos:** Features an integrated notes section. Data is saved locally in the browser, ensuring notes survive page refreshes and are tied strictly to the specific month being viewed.
* **Dynamic Aesthetics:** The "hero" image automatically updates based on the current month, bringing a seasonal, physical-calendar feel to the digital space.
* **Mobile-First Responsiveness:** Utilizes modern CSS techniques to shift from a spacious side-by-side desktop layout to a perfectly stacked, touch-friendly mobile interface.
* **Skeuomorphic Touches:** Includes a custom CSS "binder ring" effect to bridge the gap between digital and physical design.

## 🛠️ Technical Choices & Architecture
To demonstrate proficiency in modern frontend development, this project was built using the following stack and design decisions:

* **Framework (Next.js & React):** Chosen for its robust App Router architecture and optimal rendering performance.
* **Language (Strict TypeScript):** Implemented strict TypeScript typing across all components, states, and event handlers to ensure a type-safe, production-ready codebase and prevent runtime errors.
* **Styling (Tailwind CSS):** Utilized for rapid, utility-first styling. This allowed for precise control over the responsive grid layouts and complex pseudo-class styling (like gradient highlights for date ranges) without bloated CSS files.
* **Date Logic (Native JavaScript):** *Intentional Choice.* Rather than relying on heavy external libraries like `moment.js` or `date-fns`, all date calculations, grid generation, and range selection logic were written natively using the JavaScript `Date` object to showcase core JS competency.
* **Data Persistence (localStorage):** Adhering to the "strictly frontend" constraint, the `useEffect` hook is paired with the browser API to securely save and retrieve user notes without a backend database.
* **Icons (Lucide-React):** Selected for clean, lightweight SVG icons that integrate flawlessly with Tailwind.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
Before you begin, ensure you have the following installed on your local machine:
* **Node.js** (v18.0.0 or higher recommended)
* **Git**
* A package manager of your choice (`npm`, `yarn`, `pnpm`, or `bun`)

### Installation & Setup

**1. Clone the repository**
Open your terminal and run the following command to download the project:
```bash
git clone https://github.com/rupjyoti-patgiri/interactive-wall-calendar.git
cd interactive-wall-calendar
```


**2. Install dependencies**
Install the required packages:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

**3. Run the development server**
Start the local server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

**4. View the application**
Open [http://localhost:3000](http://localhost:3000) in your web browser. The page will automatically hot-reload if you make any edits to `src/app/page.tsx`.

### Testing the Production Build (Optional)

To test the production build locally:
```bash
npm run build
npm run start
```

---

## 👨‍💻 Author

**Rupjyoti Patgiri**  
*Built for the SWE Summer Internship Frontend Engineering Challenge.*