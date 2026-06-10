# Atomity Cloud optimization platform — Frontend Engineering Challenge

An interactive, animated, compliance-aware multi-cloud optimization topology showcase. This project is built as a submission for the **Atomity Frontend Engineering Challenge**.

- **Live Demo**: *[Vercel URL will be here]*
- **GitHub Repository**: *[GitHub Repo URL will be here]*

---

## 🚀 The Chosen Feature: Option B (Workload Topology & Savings Detail)

I chose to implement **Option B** (the segment between **0:45–0:55** in the reference video). 

### Why Option B?
Option B offers a highly unique, modern product experience representing cloud orchestration:
1. **Interactive Topology Visualization**: Visually links AWS, Azure, Google Cloud, and On-Premise environments to a central resource core.
2. **Interactive SVG Paths**: Connective dotted paths that animate dynamically, simulating telemetry data flows.
3. **High Product Fidelity**: Selecting nodes presents resource allocation details and estimated cost savings.
4. **Actionable State**: Users can apply right-sizing optimization live, which transitions nodes to an optimal green status, updates total resource bars, and updates global savings counters in real-time.

---

## 🛠️ Architecture & Technical Stack

- **Framework**: React 19 + Vite 6 + TypeScript
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
- **Animations**: Framer Motion
- **Data Fetching & Caching**: `@tanstack/react-query` (TanStack Query v5)
- **Icons**: Lucide React

---

## 🎨 Design Token & Styling Approach

### 1. Variables & Programmatic Tokens
Instead of hardcoding values, the styling architecture is built on CSS custom properties paired with a TypeScript configuration:
- **[index.css](src/index.css)**: Declares CSS custom properties (`--color-bg-primary`, `--color-accent-primary`, etc.) under `:root` and `.dark` selectors to handle dark/light themes seamlessly.
- **[colors.ts](src/tokens/colors.ts)**: Maps CSS variables to a programmatic `tokens` object in TypeScript. Every component references `tokens.colors.*` or Tailwind classes to maintain theme consistency.

### 2. Modern CSS Features Used
- **CSS nesting**: Used directly inside `index.css` for clean structure.
- **Container queries (`@container`)**: Implemented on the [MetricsCard](src/components/MetricsCard.tsx) to adapt column layout fluidly when resized.
- **Logical properties**: Utilized in margins and paddings (`margin-inline`, `block-size`).
- **Glassmorphism (`glass`)**: Applied blur effects (`backdrop-filter`) for card backgrounds.

---

## 🔄 Data Fetching & Caching Strategy

The data fetching implementation connects to the public JSONPlaceholder API (`/todos`) to retrieve workload statuses:

1. **Async State Management**:
   - Handles **Loading State** with a clean loading spinner.
   - Handles **Error State** with a descriptive error screen and a manual "Retry Connection" button.
   - Handles **Success State** by mapping the REST payload dynamically into microservice workloads.

2. **TanStack Query Caching**:
   - Sets `staleTime` to 5 minutes.
   - Clicking workload hexagons triggers zero redundant requests in the Network tab; data is fetched once and loaded instantly from the cache.
   - Includes a "Sync API" button in the header if users want to manually invalidate the cache and pull fresh server values.

---

## 🎭 Animation Craftsmanship

Every animation in this application is calibrated to feel intentional and physical:
- **Scroll/Load Entrances**: Staggered fade and slide-up springs on loading the intro card and the dashboard layout.
- **SVG Path Tracing**: Animated dashed connection streams (`stroke-dasharray`) representing data flow from the clouds to the central metrics core.
- **Number Counting**: Estimated savings values count up dynamically from `$0` to the target amount when selecting a workload.
- **Interactive Morphing**: Clicking "Analyze & Optimize Clusters" triggers a smooth spring-based page transition.
- **Accessibility Basics**: Respects the `prefers-reduced-motion` media query by simplifying transitions (disabling SVG path animations and scale bounces) when active.

---

## ⚖️ Tradeoffs & Design Decisions

- **Client-Side Action Modification**: When the user optimizes a workload node, the dashboard updates local state to show the change in real-time. Since we are using a public mock API, mutations aren't persisted to a server database. I implemented a local state synchronized with the React Query fetch to show this interaction.
- **Tailwind CSS v4**: I chose Tailwind CSS v4 because of its built-in Vite plugin integration, removing the need for a separate `tailwind.config.js` and compiling faster.

---

## 🔮 What I Would Improve With More Time

1. **Fully Drag-and-Drop SVG Topology**: Allow users to drag the cloud heptagons around the canvas, with the SVG connection lines recalculating and redrawing their curved coordinates in real time.
2. **WebSocket Integration**: Connect to a live Kubernetes websocket to stream real-time logs and metrics inside the detail panel.
