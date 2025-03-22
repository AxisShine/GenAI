import background from "../assets/background.jpg";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
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

  return (
    <div className="w-screen h-screen">
      <img
        src={background}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="relative w-full h-full flex flex-col gap-15 justify-center items-center">
        <motion.div
          className="text-white thinText text-6xl"
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        >
          edubridge
        </motion.div>
        <motion.div
          className="text-white thinText text-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {text}
          <Cursor cursorColor="white" />
        </motion.div>
        <div className="w-[21vw] h-[10vh] flex justify-between content-center">
          <motion.div
            className="text-white thinText text-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign In
          </motion.div>
          <motion.div
            className="text-white thinText text-2xl"
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
