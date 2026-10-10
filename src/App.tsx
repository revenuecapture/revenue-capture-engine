import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Site from "./site/Site";
import {
  AboutPage,
  AuditPage,
  FrameworkPage,
  Home,
  NotFoundPage,
  PricingPage,
  PrivacyPage,
  WorkPage,
} from "./site/Pages";

// The dashboard lives in its own chunk, untouched by the revamp.
const LegacyApp = lazy(() => import("./LegacyApp"));

/** The route table on its own, so the build can render it to static HTML. */
export const AppRoutes = () => (
    <Routes>
      <Route element={<Site />}>
        <Route index element={<Home />} />
        <Route path="framework" element={<FrameworkPage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="audit" element={<AuditPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route
        path="/dashboard/*"
        element={
          <Suspense fallback={null}>
            <LegacyApp />
          </Suspense>
        }
      />
    </Routes>
);

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
