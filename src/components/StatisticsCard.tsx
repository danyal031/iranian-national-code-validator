"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { BulkValidationResult } from "@/lib/nationalCodeValidator";

interface StatisticsCardProps {
  result: BulkValidationResult;
}

export default function StatisticsCard({ result }: StatisticsCardProps) {
  const { totalCount, validCount, invalidCount, statistics } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          آمار کلی
        </h3>
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {totalCount}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* کل کدها */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                کل کدها
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {totalCount}
              </p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        {/* کدهای معتبر */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">معتبر</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {validCount}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                {statistics.validPercentage}%
              </p>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        {/* کدهای نامعتبر */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                نامعتبر
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {invalidCount}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400">
                {statistics.invalidPercentage}%
              </p>
            </div>
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* نمودار درصدی */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>نرخ موفقیت</span>
          <span>{statistics.validPercentage}%</span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${statistics.validPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>نرخ شکست</span>
          <span>{statistics.invalidPercentage}%</span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${statistics.invalidPercentage}%` }}
            transition={{ duration: 1, delay: 0.7 }}
            className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full shadow-sm"
          />
        </div>
      </div>

      {/* پیام تشویقی */}
      {statistics.validPercentage > 80 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
        >
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">
              عالی! بیشتر کدها معتبر هستند
            </span>
          </div>
        </motion.div>
      )}

      {statistics.validPercentage < 50 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
        >
          <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">
              توجه: تعداد زیادی کد نامعتبر وجود دارد
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
