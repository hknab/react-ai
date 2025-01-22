"use client";

import { motion } from "framer-motion";
import { Code, Sparkles } from "lucide-react";

export function CodeLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-primary to-secondary text-white">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Code className="w-24 h-24 text-white" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </motion.div>
      </motion.div>
      <motion.h1
        className="mt-8 text-3xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        AI is generating your code
      </motion.h1>
      <motion.div
        className="mt-4 text-lg text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <LoadingDots />
      </motion.div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 text-white rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
