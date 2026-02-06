# LinkNest

LinkNest is a modern, minimal, and productivity-focused Website Organization Tool. It allows users to save, group, and open important websites in a clean, single-page dashboard.

![LinkNest Dashboard](https://via.placeholder.com/800x400?text=LinkNest+Dashboard+Preview)

## 🚀 Features

- **Folder Organization**: Create and manage custom folders to group your links.
- **Website Management**: Add websites with titles and URLs.
- **Visual Previews**: Automatic favicon fetching for easy visual recognition.
- **Modern UI**: Clean SaaS-style dashboard with soft shadows and rounded corners.
- **Responsive Design**: Works on various screen sizes.
- **Single Page Application**: Fast, seamless experience without page reloads.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Styled Components](https://styled-components.com/) (CSS-in-JS)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Harshit107/tools.git
    cd tool-manager
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── api/             # Mock API layer (simulates backend)
├── config/          # App-wide configuration
├── constants/       # UI constants (colors, spacing, shadows)
├── components/      # Reusable UI components
│   ├── ContentArea/ # Main grid display
│   ├── FolderList/  # Sidebar folder navigation
│   ├── Header/      # App header
│   ├── Modals/      # Interaction modals
│   ├── Sidebar/     # Main navigation sidebar
│   └── WebsiteCard/ # Individual website link card
├── hooks/           # Custom React hooks (Data fetching)
├── pages/           # Page layouts (Dashboard)
├── types/           # TypeScript interfaces
└── GlobalStyles.ts  # Global styled-components styles
```


## 📄 License

This project is licensed under the MIT License.
