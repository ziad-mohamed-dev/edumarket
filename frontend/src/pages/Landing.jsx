import { motion } from "framer-motion";
import heroImg from "../assets/hero.svg";

export default function Landing() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 bg-gradient-to-br from-blue-50 to-white">
      {/* النص */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Learn, Grow, and Build Your Future with {" "}
          <span className="text-blue-600">EduMarket</span>
        </h1>
        <p className="text-lg text-gray-600">
          Explore hundreds of online courses from top instructors and enhance your skills today.
        </p>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Browse Courses
          </motion.button>
        </div>
      </motion.div>

      {/* الصورة */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
      >
        <img
          src={heroImg}
          alt="Learning Illustration"
          className="w-full max-w-md drop-shadow-2xl"
        />
      </motion.div>
    </section>
  );
}
