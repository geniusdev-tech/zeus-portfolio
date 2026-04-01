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

// New Sitemap Routes
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Products = lazy(() => import('./pages/Products/Products'));
const Cloud = lazy(() => import('./pages/Products/Cloud'));
const Security = lazy(() => import('./pages/Products/Security'));
const Monitoring = lazy(() => import('./pages/Products/Monitoring'));
const Solutions = lazy(() => import('./pages/Solutions/Solutions'));
const Developers = lazy(() => import('./pages/Solutions/Developers'));
const Business = lazy(() => import('./pages/Solutions/Business'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const Dashboard = lazy(() => import('./pages/App/Dashboard'));
const Blog = lazy(() => import('./pages/Blog/Blog'));

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
            {/* Core / Base */}
            <Route path="/" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Packages />} />
            <Route path="/packages" element={<Navigate to="/pricing" replace />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Products */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/cloud" element={<Cloud />} />
            <Route path="/products/security" element={<Security />} />
            <Route path="/products/monitoring" element={<Monitoring />} />
            
            {/* Solutions */}
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/developers" element={<Developers />} />
            <Route path="/solutions/business" element={<Business />} />
            
            {/* Docs & Existing */}
            <Route path="/docs" element={<Docs />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/terminal" element={<Terminal />} />
            <Route path="/qelox" element={isMaintenance ? <Maintenance /> : <Quelox />} />
            <Route path="/Quelox" element={<Navigate to="/qelox" replace />} />
            
            {/* Auth / App */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Trust & Content */}
            <Route path="/blog" element={<Blog />} />
            
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
