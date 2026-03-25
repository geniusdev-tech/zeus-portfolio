import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import RouteEffects from './components/RouteEffects/RouteEffects';
import NeuralBackground from './components/NeuralBackground/NeuralBackground';
import GoogleAnalytics from './components/GoogleAnalytics';
import { I18nProvider } from './i18n';

import './styles/globals.css';
import './styles/common.css';

const Portfolio = lazy(() => import('./pages/Portfolio'));
const Quelox = lazy(() => import('./pages/Quelox/Quelox'));
const Maintenance = lazy(() => import('./pages/Maintenance/Maintenance'));
const Terminal = lazy(() => import('./pages/Terminal/Terminal'));
const Docs = lazy(() => import('./pages/Docs/Docs'));
const Packages = lazy(() => import('./pages/Packages/Packages'));
const Cases = lazy(() => import('./pages/Cases/Cases'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function RouteFallback() {
  return (
    <div className="z-section">
      <div className="z-sec-header">
        <div className="z-sec-tag cyan">Loading</div>
        <div className="z-sec-title cyan">Loading...</div>
      </div>
    </div>
  );
}

function AppShell() {
  const location = useLocation();
  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  const currentPath = location.pathname.replace(/\/+$/, '') || '/';
  const isTerminal = currentPath === '/terminal';

  return (
    <div className="zeus-app">
      <NeuralBackground />
      <RouteEffects />

      {!isTerminal ? <Nav /> : null}

      <main className="z-main-content">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/terminal" element={<Terminal />} />
            <Route path="/qelox" element={isMaintenance ? <Maintenance /> : <Quelox />} />
            <Route path="/Quelox" element={<Navigate to="/qelox" replace />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Router>
        <GoogleAnalytics />
        <AppShell />
      </Router>
    </I18nProvider>
  );
}
