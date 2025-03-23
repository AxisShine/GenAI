import logo from "../assets/logo2.png";
import { motion } from "framer-motion";
import { BiSolidDashboard } from "react-icons/bi";
import { LuListTodo } from "react-icons/lu";
import { MdCenterFocusWeak } from "react-icons/md";
import { IoIosExit } from "react-icons/io";
import profilePic from "../assets/snoopy2.jpg";
import { IoIosNotifications } from "react-icons/io";
import { FaComputer } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import computer from "../assets/video.png";
import user from "../assets/user.png";
import AccessibilityButton from "./Accessibility";
function DashBoard() {
  const navigate = useNavigate();

  const handleLearningModeClick = () => {
    navigate("/learning");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard"); // Redirect to /dashboard
  };

  const handleLogoutClick = () => {
    navigate("/"); // Redirect to root (logout)
  };

  return (
    <>
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
              ></motion.img>
            </div>
            <div className="mt-[15px] w-[20vw] h-[40vh] flex flex-col items-center gap-[20px] justify-start">
              {/* Dashboard Button*/}
              <motion.div
                className="dashboard-buttons text-white mt-[8px] w-[70%] h-[20%] flex justify-center items-center thinText text-xl"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDashboardClick}
              >
                <span className="mr-[4px]">{<BiSolidDashboard />}</span>
                Dashboard
              </motion.div>
              {/* Learning Mode Button*/}
              <motion.div
                className="dashboard-buttons text-white mt-[8px] w-[70%] h-[20%] flex justify-center items-center thinText text-xl"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLearningModeClick}
              >
                <span className="mr-[4px]">{<LuListTodo />} </span>Learning Mode
              </motion.div>
              {/* Focus Mode Button*/}
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
            {/* Logout (was exit) button*/}
            <div className=" h-full flex flex-col justify-end mb-[10px]">
              <motion.div
                className="dashboard-buttons text-white mt-[8px] w-full flex justify-center items-center thinText text-s px-[5px]"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogoutClick} // Logout and redirect to root
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
          {/* Right Side Purple Box */}
          <div className="col-span-7 row-span-2">
            <div className="rounded-2xl w-[95%] h-[95%] flex items-end bg-gradient-to-r from-purple-500 to-purple-400">
              <div className="flex flex-col ml-[5%] mb-[4%] gap-[5px]">
                <div className="text-white font-mono text-4xl">
                  Welcome Back, User!
                </div>
                <div className="text-white thinText text-l">
                  Always stay updated in your student portal
                </div>
              </div>
              <img
                src={user}
                style={{
                  position: "absolute",
                  top: "185px",
                  right: "110px",
                  width: "390px",
                  height: "250px",
                }}
              ></img>
            </div>
          </div>
          {/* Daily Affirmation */}
          <div className="col-span-7">
            <div className="w-[95%] h-[85%] flex flex-col gap-[8px]">
              <div className="font-mono text-xl">Daily Affirmation</div>
              <div className="h-[50%] bg-blue-200 rounded-2xl border-4 border-blue-550 rounded-full flex items-center justify-start">
                <p className="ml-[10%] textTwo text-2xl italic">
                  Every challenge is an opportunity to grow!
                </p>
              </div>
            </div>
          </div>
          {/* Three Boxes */}
          <div className="col-span-7 row-span-2 flex items-start justify-around">
            {/* First Box */}
            <div className="border border-gray-300 bg-gray-200 w-[30%] h-[60%] rounded-2xl flex flex-col justify-between items-center p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col gap-[15px]">
                <p className="thinText text-purple-500">
                  Daily Meditation Video
                </p>
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/watch?v=zSkFFW--Ma0&pp=ygUdbWVkaXRhdGlvbiB2aWRlbyBmb3Igc3R1ZGVudHM%3D",
                      "_blank",
                      "noreferrer"
                    )
                  }
                >
                  View
                </button>
              </div>
              <div className="">
                <img
                  className="mt-[10px]"
                  src={computer}
                  style={{ width: "70px", height: "70px" }}
                ></img>
              </div>
            </div>
            {/* Second Box */}
            {/* Third box */}
            <div className="border border-gray-300 bg-gray-200 w-[30%] h-[60%] rounded-2xl flex flex-col justify-between items-center p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col gap-[5px]">
                <p className="thinText text-purple-500 ml-[15px]">Progress</p>
                <p className="thinText text-purple-500 ml-[15px]">
                  You completed 3 learning sessions this week{" "}
                </p>
              </div>
              <div className="">
                <FaComputer size={80} />
              </div>
            </div>
          </div>
        </div>
        <AccessibilityButton />
      </div>
    </>
  );
}

export default DashBoard;
