import background from "../assets/background.jpg";
import { motion } from "framer-motion";

function Home() {
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
          Your Well-being, Your Future
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
