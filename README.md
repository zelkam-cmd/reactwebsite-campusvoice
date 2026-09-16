# reactwebsite-campusvoice

> **CampusVoice — Student Profile Management System**  
> A high-fidelity single-page application (SPA) rebuilt in React + Vite, migrating the administrative student profiling system from HTML/PHP into a modern frontend architecture with authentic frosted glassmorphism styling.

---

## 🚀 Features

- **Executive Glassmorphism UI**:
  - Frosted translucent glass cards (`backdrop-filter: blur(24px) saturate(180%)`) with multi-color radial gradient mesh background.
  - Floating dark executive sidebar with active navigation indicator.
  - Circular pill buttons (`border-radius: 9999px`) across all actions.
  - High-contrast pure white label tiles in the student dossier view.
- **Student Profile Management**:
  - **Student Registry Table**: Full table view with live searching, department filtering, civil status filtering, and account status indicators.
  - **Student Dossier View**: Detailed profile inspector covering Personal & Demographic Details, Family Background & Dependents, Character/Faculty References, and Account Status.
  - **Add Student Record**: Dedicated account creation form with auto-computed age and instant local persistence.
  - **Edit Student Profile**: Dedicated editing interface supporting dynamic child dependent rows and character reference details.
  - **Official SIS Print Preview**: Institutional Student Information Sheet (SIS) print preview with Bulacan State University headers, 2×2 photo box, and dual signature sections, optimized for A4 paper and PDF export (`@media print`).
- **Zero Survey Footprint**: Pure student member records management without survey dependencies.

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CampusVoice signature glassmorphism variables and layout)
- **Icons & Typography**: Plus Jakarta Sans & SVG Vector Icons

---

## 💻 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/zelkam-cmd/reactwebsite-campusvoice.git
   cd reactwebsite-campusvoice
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📄 License

Academic / Educational Practice Activity — Bulacan State University.
