"use client";

import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  Users,
  Code,
  Heart,
  Zap,
  Trophy,
  Coffee,
  Rocket,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function GitHubProfile() {
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowProfile(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: showProfile ? 1 : 0, y: showProfile ? 0 : 50 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="fixed bottom-6 left-6 z-50"
    >
      <motion.div whileHover={{ scale: 1.05 }} className="relative group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

        {/* Main Card */}
        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl max-w-sm">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-full p-1">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Github className="w-8 h-8 text-gray-800 dark:text-white" />
                </div>
              </div>
              <motion.div
                animate={{ scale: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
              />
            </motion.div>

            <div className="flex-1">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold text-gray-800 dark:text-gray-200"
              >
                Danyal031
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Full-Stack Developer
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-1 mt-1"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400">
                  فعال
                </span>
              </motion.div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              {
                icon: Star,
                label: "Stars",
                value: "⭐",
                color: "text-yellow-500",
              },
              {
                icon: GitFork,
                label: "Forks",
                value: "🍴",
                color: "text-blue-500",
              },
              {
                icon: Code,
                label: "Repos",
                value: "📂",
                color: "text-purple-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="bg-gray-50/50 dark:bg-gray-700/50 p-3 rounded-xl text-center backdrop-blur-sm"
              >
                <div className="text-lg">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-4"
          >
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              تکنولوژی‌های مورد علاقه
            </h4>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Node.js", "Python"].map(
                (tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-xs rounded-lg text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 cursor-default"
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="https://github.com/danyal031"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-medium shadow-lg transition-all duration-300 group"
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              مشاهده پروفایل GitHub
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Rocket className="w-4 h-4" />
              </motion.div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400"
            >
              <Coffee className="w-4 h-4" />
              <span>ساخته شده با</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>و قهوه زیاد</span>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-3 -right-3 text-2xl"
          >
            🚀
          </motion.div>

          <motion.div
            animate={{
              y: [0, -8, 0],
              x: [0, 3, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-2 -left-2 text-xl"
          >
            💻
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
            className="absolute top-1/2 -left-4 text-lg"
          >
            ⭐
          </motion.div>
        </div>
      </motion.div>

      {/* Minimal Toggle Button */}
      <motion.button
        onClick={() => setShowProfile(!showProfile)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg flex items-center justify-center text-xs font-bold"
      >
        {showProfile ? "−" : "+"}
      </motion.button>
    </motion.div>
  );
}
