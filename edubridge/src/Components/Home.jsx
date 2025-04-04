import background from "../assets/background2.jpg";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
function Home() {
  const [text] = useTypewriter({
    words: [
      "Your Well-being, Your Future",
      "Unlock Your Full Potential",
      "Inspiring Healthy Habits",
      "Transform Your Education Journey",
    ],
    loop: {}, // or a specific number, e.g. loop: 5
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/questions");
  };

  const handleRegister = () => {
    navigate("/questions");
  };

  return (
    <div className="w-screen h-screen">
      <img
        src={background}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="relative w-full h-full flex flex-col gap-5 justify-center items-center">
        <motion.img
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          src={logo}
          alt="Logo"
          className="rounded-2xl w-40 h-40 object-cover"
        ></motion.img>
        <motion.div
          className="text-purple-400 thinText text-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {text}
          <Cursor cursorColor="purple" />
        </motion.div>
        <div className="w-[21vw] h-[10vh] flex justify-between content-center">
          <motion.div
            onClick={handleSignIn}
            className="text-purple-400 thinText text-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign In
          </motion.div>
          <motion.div
            onClick={handleRegister}
            className="text-purple-400 thinText text-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Register
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
