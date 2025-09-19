"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Shield,
  Check,
  X,
  Star,
  Trophy,
  Target,
} from "lucide-react";
import { BulkValidationResult } from "@/lib/nationalCodeValidator";
import { useEffect, useState } from "react";

interface EnhancedStatisticsProps {
  result: BulkValidationResult;
}

export default function EnhancedStatistics({
  result,
}: EnhancedStatisticsProps) {
  const { totalCount, validCount, invalidCount, statistics } = result;
  const [animatedValid, setAnimatedValid] = useState(0);
  const [animatedInvalid, setAnimatedInvalid] = useState(0);

  useEffect(() => {
    // انیمیشن تدریجی اعداد
    const duration = 1500;
    const steps = 60;
    const validStep = validCount / steps;
    const invalidStep = invalidCount / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setAnimatedValid(
        Math.min(Math.floor(validStep * currentStep), validCount)
      );
      setAnimatedInvalid(
        Math.min(Math.floor(invalidStep * currentStep), invalidCount)
      );

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [validCount, invalidCount]);

  return (
    <div className="space-y-8">
      {/* Header با انیمیشن */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-20 h-20 mx-auto"
        >
          <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-lg"></div>
        </motion.div>

        <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              نتایج اعتبارسنجی
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-600 dark:text-gray-400"
          >
            آمار کامل و تفصیلی کدهای ملی بررسی شده
          </motion.p>
        </div>
      </motion.div>

      {/* کارت‌های آماری با گرافیک زیبا */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* کل کدها */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  مجموع کدها
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-3xl font-bold text-gray-800 dark:text-gray-200"
                >
                  {totalCount.toLocaleString("fa-IR")}
                </motion.p>
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full"
              >
                <Target className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex-1"></div>
              <Zap className="w-4 h-4 text-blue-500" />
            </div>
          </div>
        </motion.div>

        {/* کدهای معتبر */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  کدهای معتبر
                </p>
                <motion.p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {animatedValid.toLocaleString("fa-IR")}
                </motion.p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 }}
                  className="text-sm text-green-600 dark:text-green-400 font-medium"
                >
                  {statistics.validPercentage}%
                </motion.p>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <div className="relative">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${statistics.validPercentage}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                />
              </div>
              {statistics.validPercentage > 80 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 }}
                  className="absolute -top-8 right-0"
                >
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* کدهای نامعتبر */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  کدهای نامعتبر
                </p>
                <motion.p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {animatedInvalid.toLocaleString("fa-IR")}
                </motion.p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-sm text-red-600 dark:text-red-400 font-medium"
                >
                  {statistics.invalidPercentage}%
                </motion.p>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-full"
              >
                <X className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${statistics.invalidPercentage}%` }}
                transition={{ duration: 1.5, delay: 0.7 }}
                className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* نمودار دایره‌ای با انیمیشن */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            نمودار تناسب
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            نسبت کدهای معتبر به نامعتبر
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="relative w-64 h-64">
            {/* دایره پس‌زمینه */}
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-200 dark:text-gray-700"
              />

              {/* دایره معتبر */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#greenGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 251.2" }}
                animate={{
                  strokeDasharray: `${
                    (statistics.validPercentage / 100) * 251.2
                  } 251.2`,
                }}
                transition={{ duration: 2, delay: 1.5 }}
                className="drop-shadow-lg"
              />

              {/* تعریف گرادیانت */}
              <defs>
                <linearGradient
                  id="greenGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>

            {/* متن مرکزی */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2, type: "spring" }}
                  className="text-3xl font-bold text-green-600 dark:text-green-400"
                >
                  {statistics.validPercentage}%
                </motion.div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  موفقیت
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* پیام تبریک یا هشدار */}
        {statistics.validPercentage > 90 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
              </motion.div>
              <div>
                <h4 className="font-bold text-green-800 dark:text-green-200">
                  🎉 فوق‌العاده!
                </h4>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  بیش از ۹۰٪ کدهای شما معتبر هستند. عملکرد بسیار عالی!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {statistics.validPercentage >= 70 &&
          statistics.validPercentage <= 90 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <h4 className="font-bold text-blue-800 dark:text-blue-200">
                    👍 خوب است!
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    اکثر کدهای شما معتبر هستند. نتیجه قابل قبولی است.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        {statistics.validPercentage < 70 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </motion.div>
              <div>
                <h4 className="font-bold text-yellow-800 dark:text-yellow-200">
                  ⚠️ نیاز به بررسی
                </h4>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  تعداد زیادی از کدها نامعتبر هستند. لطفاً دوباره بررسی کنید.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
