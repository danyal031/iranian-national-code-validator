"use client";

import { motion } from "framer-motion";
import ValidationForm from "@/components/ValidationForm";
import { Shield, Github, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    اعتبارسنجی کد ملی ایران
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Iranian National Code Validator
                  </p>
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
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

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 mt-16"
        >
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                <span>ساخته شده با</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>برای ایران</span>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <span>Next.js 15</span>
                <span>•</span>
                <span>TypeScript</span>
                <span>•</span>
                <span>Tailwind CSS</span>
                <span>•</span>
                <span>Framer Motion</span>
              </div>

              <p className="text-xs text-gray-400 dark:text-gray-500 max-w-2xl mx-auto">
                این ابزار برای اعتبارسنجی کدهای ملی ایرانی طراحی شده است و از
                الگوریتم استاندارد ایران استفاده می‌کند. تمامی محاسبات در مرورگر
                شما انجام می‌شود و هیچ اطلاعاتی ارسال نمی‌شود.
              </p>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
