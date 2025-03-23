import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BiSolidDashboard } from "react-icons/bi";
import { LuListTodo } from "react-icons/lu";
import { MdCenterFocusWeak } from "react-icons/md";
import { IoIosExit, IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import logo from "../assets/edubridge.png";
import profilePic from "../assets/snoopy2.jpg";
import FileUpload from "./File_Upload";

function Learning() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null); // To control the audio player
  const navigate = useNavigate();
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);  // Close the popup
      }
    };

    // Add event listener on component mount
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setText(data.text);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatInput) return; // Make sure there's some input
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/generate_video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: chatInput }),
      });
      
      if (!response.ok) {
        console.error('Failed to generate video', await response.text());
        throw new Error("Failed to generate video");
      }
      
      const data = await response.json();
      console.log(data.videoUrl);  
      setVideoUrl(data.videoUrl);

    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  // Play the selected sound in a loop
  const playSound = (sound) => {
    let soundUrl = "";
  
    switch (sound) {
      case "brown":
        soundUrl = "/audio_files/soft-brown-noise-299934.mp3"; // Path to brown noise file
        break;
      case "white":
        soundUrl = "/audio_files/white-noise-179828.mp3"; // Path to white noise file
        break;
      case "rain":
        soundUrl = "/audio_files/calming-rain-257596.mp3"; // Path to rain sound file
        break;
      default:
        if (audioPlayer) {
          audioPlayer.pause();
        }
        return; // No sound selected
    }
  
    if (audioPlayer) {
      audioPlayer.pause(); // Stop the current sound if any
    }
  
    const newAudioPlayer = new Audio(soundUrl);
    newAudioPlayer.loop = true;
    newAudioPlayer.play();
    setAudioPlayer(newAudioPlayer); // Save the new audio player in the state
  };

  // Popup control
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <div className="h-[900px] flex flex-col justify-between">
      <div className="w-full h-full grid grid-cols-[3%_1fr_1fr_2%_repeat(7,1fr)] grid-rows-6">
        <div></div>
        <div className="col-span-2 row-span-6 flex flex-col items-center rounded-2xl gap-[20px] bg-gradient-to-b from-purple-400 to-purple-600 mb-[8%]">
          <motion.img
            className="mt-[15px] rounded-full w-50 h-30 object-cover"
            src={logo}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          <motion.div
            className="dashboard-buttons text-white w-[70%] h-[20%] flex justify-center items-center thinText text-xl"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/dashboard")}
          >
            <BiSolidDashboard /> Dashboard
          </motion.div>
          <motion.div
            className="dashboard-buttons text-white w-[70%] h-[20%] flex justify-center items-center thinText text-xl"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/learning")}
          >
            <LuListTodo /> Learning Mode
          </motion.div>
          <motion.div
            className="dashboard-buttons text-white w-[70%] h-[20%] flex justify-center items-center thinText text-xl"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <MdCenterFocusWeak /> Focus Mode
          </motion.div>
          <motion.div
            className="dashboard-buttons text-white w-full flex justify-center items-center thinText text-s px-[5px] mt-auto mb-[10px]"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
          >
            <IoIosExit /> Logout
          </motion.div>
        </div>

        <div className="col-span-7 flex justify-end items-center p-4">
          <div className="flex items-center p-4 rounded-xl shadow gap-3 mr-[14%]">
            <img
              src={profilePic}
              alt="User Profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">John Doe</span>
              <span className="text-sm text-gray-500">3rd year</span>
            </div>
          </div>
          <IoIosNotifications size={32} className="mr-[5%]" />
        </div>

        <div className="col-span-7 row-span-2 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Upload Homework</h1>
          <FileUpload /> {/* Render FileUpload component here */}
          {text && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h2 className="text-xl font-bold mb-2">Extracted Text:</h2>
              <p>{text}</p>
            </div>
          )}
        </div>
      </div>
      {/* Video Display Section */}
      {videoUrl && (
        <div className="w-full bg-gray-100 p-4 rounded-t-lg flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Generated Video:</h2>
          <video controls className="w-full h-[400px] mt-2 object-cover mb-[10px]">
            <source src={videoUrl} type="mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Audio Popup and Speaker Button */}
      <div
        className="fixed top-4 right-4 p-2 bg-gray-800 text-white rounded-full cursor-pointer"
        onClick={() => setPopupVisible(!popupVisible)}
      >
        <FaVolumeUp size={24} />
      </div>

      {popupVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div
          ref={popupRef} // Attach the ref to the popup div
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <button
            className="absolute top-2 right-2 text-2xl"
            onClick={() => setPopupVisible(false)}
          >
            ×
          </button>
            <h2 className="text-xl mb-4">Select Sound</h2>
            <ul>
              <li>
                <button
                  onClick={() => playSound("brown")}
                  className="block w-full p-2 bg-blue-500 text-white rounded mb-2"
                >
                  Brown Noise
                </button>
              </li>
              <li>
                <button
                  onClick={() => playSound("white")}
                  className="block w-full p-2 bg-blue-500 text-white rounded mb-2"
                >
                  White Noise
                </button>
              </li>
              <li>
                <button
                  onClick={() => playSound("rain")}
                  className="block w-full p-2 bg-blue-500 text-white rounded mb-2"
                >
                  Rain Sounds
                </button>
              </li>
              <li>
                <button
                  onClick={() => playSound("none")}
                  className="block w-full p-2 bg-blue-500 text-white rounded mb-2"
                >
                  No Sound
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="w-full bg-gray-100 p-4 rounded-t-lg flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">AI Video Generator</h2>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Enter a topic..."
          className="w-2/3 p-2 border rounded mb-2"
        />
        <button
          onClick={handleChatSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {" "}
          Generate Video{" "}
        </button>
      </div>
    </div>
  );
}

export default Learning;