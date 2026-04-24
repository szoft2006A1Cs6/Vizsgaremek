import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AfkTimeout.css';

export default function AfkTimeout({ timeoutMinutes = 15, countdownSeconds = 60 }) {
  const navigate = useNavigate();
  const [isIdle, setIsIdle] = useState(false);
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);

  const idleTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const resetIdleTimer = () => {
    if (isIdle) return;

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
      setTimeLeft(countdownSeconds);
    }, timeoutMinutes * 60 * 1000);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll'];

    const handleActivity = () => {
      resetIdleTimer();
    };

    events.forEach(e => window.addEventListener(e, handleActivity));
    resetIdleTimer();

    return () => {
      events.forEach(e => window.removeEventListener(e, handleActivity));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [timeoutMinutes, countdownSeconds, isIdle]);

  useEffect(() => {
    if (isIdle) {
      countdownIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            localStorage.removeItem('cart');
            localStorage.removeItem('lastOrderId');
            navigate('/home');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [isIdle, navigate]);

  const handleImHere = () => {
    setIsIdle(false);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    resetIdleTimer();
  };

  if (!isIdle) return null;

  return (
    <div className="afk-overlay">
      <div className="afk-modal card">
        <span className="material-icons afk-icon">timer</span>
        <h2 className="font-display">Itt vagy még?</h2>
        <p>A rendszer inaktivitás miatt hamarosan automatikusan kilép.</p>
        <div className="afk-countdown">{timeLeft} mp</div>
        <button className="btn btn-primary afk-btn" onClick={handleImHere}>
          Igen
        </button>
      </div>
    </div>
  );
}