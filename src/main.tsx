import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";

const root = document.getElementById("root")!;

// Public pages arrive as prerendered HTML and are hydrated. The dashboard
// shell arrives empty and is rendered from scratch.
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
