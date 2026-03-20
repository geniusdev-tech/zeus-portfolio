import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Portfolio from './pages/Portfolio';
import Quelox from './pages/Quelox/Quelox';
import Maintenance from './pages/Maintenance/Maintenance';
import Terminal from './pages/Terminal/Terminal';
import AIChatWidget from './components/AIChatWidget';
import NeuralBackground from './components/NeuralBackground/NeuralBackground';
import GoogleAnalytics from './components/GoogleAnalytics';

import './styles/globals.css';
import './styles/common.css';

function AppShell() {
  const location = useLocation();
  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  const isTerminal = location.pathname === '/terminal';

  return (
    <div className="zeus-app">
      <NeuralBackground />

      {!isTerminal ? <Nav /> : null}

      <main className="z-main-content">
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route
            path="/Quelox"
            element={isMaintenance ? <Maintenance /> : <Quelox />}
          />
        </Routes>
      </main>

      {!isTerminal ? <AIChatWidget /> : null}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <GoogleAnalytics />
      <AppShell />
    </Router>
  );
}
