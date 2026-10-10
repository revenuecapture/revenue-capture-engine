import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Site from "./site/Site";

// The dashboard and the old 404 live in their own chunk, untouched by the revamp.
const LegacyApp = lazy(() => import("./LegacyApp"));

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Site />} />
      <Route
        path="*"
        element={
          <Suspense fallback={null}>
            <LegacyApp />
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
