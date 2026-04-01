import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './TerminalLoader.css';

const LOG_MESSAGES = [
  'INITIALIZING ZEUS_PROTOCOL...',
  'ESTABLISHING SECURE CONNECTION...',
  'DECRYPTING ROUTE BUFFER...',
  'MOUNTING NEURAL INTERFACE...',
  'LOADING SYSTEM KERNEL v4.2.1...',
  'AUTHENTICATING HANDSHAKE...',
  'SYNCING GLOBAL STATE...',
  'ALLOCATING VIRTUAL MEMORY...',
  'OPTIMIZING VIEWPORT RENDERER...',
  'ACCESS GRANTED.'
];

export default function TerminalLoader() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState([]);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    // Only trigger on actual path change
    if (location.pathname !== prevPath) {
      setPrevPath(location.pathname);
      startSequence();
    }
  }, [location.pathname]);

  const startSequence = () => {
    setIsVisible(true);
    setLogs([]);
    
    let currentIndex = 0;
    const isMobile = window.innerWidth < 768;
    const intervalTime = isMobile ? 50 : 80;
    
    const interval = setInterval(() => {
      if (currentIndex < LOG_MESSAGES.length) {
        setLogs(prev => [...prev, LOG_MESSAGES[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
        }, isMobile ? 250 : 400); 
      }
    }, intervalTime); 

    return () => clearInterval(interval);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="terminal-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="terminal-loader__content">
            <div className="terminal-loader__logo">
              <pre>
{`   _____  ______ _    _  _____ 
  |___  ||  ____| |  | |/ ____|
     / / | |__  | |  | | (___  
    / /  |  __| | |  | |\\___ \\ 
   / /__ | |____| |__| |____) |
  /_____||______|\\____/|_____/ `}
              </pre>
            </div>
            
            <div className="terminal-loader__logs">
              {logs.map((log, i) => (
                <div key={i} className="terminal-loader__log-line">
                  <span className="terminal-loader__prompt">{'>'}</span> {log}
                </div>
              ))}
              <div className="terminal-loader__cursor">_</div>
            </div>
          </div>
          
          <div className="terminal-loader__scanline" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
