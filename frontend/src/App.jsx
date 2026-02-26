import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCursor } from './hooks';

import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Portfolio from './pages/Portfolio';
import Quelox from './pages/Quelox/Quelox';
import NeuralBackground from './components/NeuralBackground/NeuralBackground';

import './styles/globals.css';
import './styles/common.css';

export default function App() {
  const { cursorRef, ringRef } = useCursor();

  return (
    <Router>
      <div className="zeus-app">
        <NeuralBackground />

        {/* Fixed navbar */}
        <Nav />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/Quelox" element={<Quelox />} />
        </Routes>

        {/* Custom cursor */}
        <Cursor cursorRef={cursorRef} ringRef={ringRef} />
      </div>
    </Router>
  );
}
