import { useState } from "react";
import { motion } from "framer-motion";
import { BiSolidDashboard } from "react-icons/bi";
import { LuListTodo } from "react-icons/lu";
import { MdCenterFocusWeak } from "react-icons/md";
import { IoIosExit } from "react-icons/io";
import profilePic from "../assets/snoopy2.jpg";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import logo from "../assets/edubridge.png";
import computer from "../assets/video.png";
import user from "../assets/user.png";

function Learning() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const navigate = useNavigate();

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
      setText(data.text); // Display extracted text
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // Sidebar Navigation
  const handleLearningModeClick = () => {
    navigate("/learning");
  };
  const handleLogout = () => {
    navigate("/"); // Redirect to the homepage
  };

  return (
    <div className="h-[900px]">
      <div className="w-full h-full grid grid-cols-[3%_1fr_1fr_2%_repeat(7,1fr)] grid-rows-6">
        <div></div>
        <div className="col-span-2 row-span-6 flex justify-start flex-col items-center rounded-2xl gap-[20px] bg-gradient-to-b from-purple-400 to-purple-600 mb-[8%]">
          {/* Logo */}
          <div className="mt-[15px] w-[20vw] h-[15vh] justify-center items-center flex">
            <motion.img
              className="rounded-full w-50 h-30 object-cover"
              src={logo}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
          <div className="mt-[15px] w-[20vw] h-[40vh] flex flex-col items-center gap-[20px] justify-start">
            {/* Dashboard Button */}
            <motion.div
              className="dashboard-buttons text-white mt-[8px] w-[70%] h-[20%] flex justify-center items-center thinText text-xl"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/dashboard")}
            >
              <span className="mr-[4px]">{<BiSolidDashboard />}</span>
              Dashboard
            </motion.div>
            {/* Learning Mode Button */}
            <motion.div
              className="dashboard-buttons text-white mt-[8px] w-[70%] h-[20%] flex justify-center items-center thinText text-xl"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLearningModeClick}
            >
              <span className="mr-[4px]">{<LuListTodo />} </span>Learning Mode
            </motion.div>
            {/* Focus Mode Button */}
            <motion.div
              className="dashboard-buttons text-white mt-[8px] w-[70%] h-[20%] flex justify-center items-center thinText text-xl"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="mr-[4px]">
                <MdCenterFocusWeak />{" "}
              </span>
              Focus Mode
            </motion.div>
          </div>
          {/* Logout Button */}
          <div className=" h-full flex flex-col justify-end mb-[10px]">
            <motion.div
              className="dashboard-buttons text-white mt-[8px] w-full flex justify-center items-center thinText text-s px-[5px]"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
            >
              <span className="mr-[4px]">
                <IoIosExit />
              </span>
              Logout
            </motion.div>
          </div>
        </div>
        <div className="row-span-6"></div>
        <div className="col-span-7 flex justify-end items-center">
          <div className="flex items-center p-4 rounded-xl shadow gap-3 mr-[14%]">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img
                src={profilePic}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Name and Year */}
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">John Doe</span>
              <span className="text-sm text-gray-500">3rd year</span>
            </div>
          </div>
          <div className="mr-[5%]">
            <IoIosNotifications size={32} />
          </div>
        </div>
        {/* Main Content Area */}
        <div className="col-span-7 row-span-2 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Upload Homework</h1>
          <input type="file" onChange={handleFileChange} className="mb-2" />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>

          {text && (
            <div className="mt-4 p-4 bg-gray-100 rounded font-dyslexic">
              <h2 className="text-xl font-bold mb-2">Extracted Text:</h2>
              <p>{text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Learning;