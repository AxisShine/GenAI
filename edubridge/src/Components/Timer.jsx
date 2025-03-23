import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaVolumeUp } from "react-icons/fa";

function Learning() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [popupVisible, setPopupVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          setPopupVisible(true);
          return 25 * 60; // Reset timer
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div>
      {/* Speaker Icon with Timer */}
      <div className="fixed top-4 right-4 flex items-center gap-2 p-2 bg-gray-800 text-white rounded-full">
        <FaVolumeUp size={24} />
        <span>{formatTime(timeLeft)}</span>
      </div>

      {/* Pushup Reminder Popup */}
      {popupVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Stretch Reminder</h2>
            <p>Time for 10 pushups!</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                setPopupVisible(false);
                setTimeLeft(25 * 60); // Reset timer on close
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Learning;
