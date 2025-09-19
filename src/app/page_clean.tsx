"use client";

import { motion } from "framer-motion";
import ValidationForm from "@/components/ValidationForm";
import FloatingParticles from "@/components/FloatingParticles";
import GitHubProfile from "@/components/GitHubProfile";
import { Shield, Github, Heart, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* GitHub Profile Card */}
      <GitHubProfile />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10">
        {/* Enhanced Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg"
                >
                  <Shield className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <motion.h1
                    className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    اعتبارسنجی کد ملی ایران
                  </motion.h1>
                  <motion.p
                    className="text-sm text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Iranian National Code Validator
                  </motion.p>
                </div>
              </motion.div>

              <motion.a
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/danyal031"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline">GitHub</span>
              </motion.a>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <ValidationForm />
        </main>

        {/* Enhanced Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 mt-16 shadow-lg"
        >
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-6">
              <motion.div
                className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400"
                whileHover={{ scale: 1.05 }}
              >
                <span>ساخته شده با</span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5 text-red-500" />
                </motion.div>
                <span>برای ایران توسط</span>
                <motion.a
                  href="https://github.com/danyal031"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  whileHover={{ scale: 1.1 }}
                >
                  Danyal031
                </motion.a>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </motion.div>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                {[
                  "Next.js 15",
                  "TypeScript",
                  "Tailwind CSS",
                  "Framer Motion",
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.1, color: "#3b82f6" }}
                    className="cursor-default transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <motion.p
                className="text-xs text-gray-400 dark:text-gray-500 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                این ابزار برای اعتبارسنجی کدهای ملی ایرانی طراحی شده است و از
                الگوریتم استاندارد ایران استفاده می‌کند. تمامی محاسبات در مرورگر
                شما انجام می‌شود و هیچ اطلاعاتی ارسال نمی‌شود. طراحی شده با عشق
                برای مردم ایران 🇮🇷
              </motion.p>

              {/* Fun Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto"
              >
                {[
                  { label: "دقیقترین", value: "100%" },
                  { label: "سریع‌ترین", value: "<1s" },
                  { label: "ایمن‌ترین", value: "🔒" },
                  { label: "زیباترین", value: "🎨" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg backdrop-blur-sm"
                  >
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Developer Credit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50"
              >
                <motion.div
                  className="flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-2xl"
                  >
                    👨‍💻
                  </motion.div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      توسعه یافته توسط
                    </p>
                    <motion.a
                      href="https://github.com/danyal031"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      Danyal031
                    </motion.a>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-2xl"
                  >
                    🚀
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
