"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, Copy, Eye, EyeOff } from "lucide-react";
import { ValidationResult } from "@/lib/nationalCodeValidator";
import { useState } from "react";

interface ResultsListProps {
  results: ValidationResult[];
}

export default function ResultsList({ results }: ResultsListProps) {
  const [showAll, setShowAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const displayResults = showAll ? results : results.slice(0, 10);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            نتایج اعتبارسنجی
          </h3>
          {results.length > 10 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {showAll ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              {showAll ? "نمایش کمتر" : `نمایش همه (${results.length})`}
            </button>
          )}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {displayResults.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                result.isValid
                  ? "bg-green-50/30 dark:bg-green-900/10"
                  : "bg-red-50/30 dark:bg-red-900/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      result.isValid
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-red-100 dark:bg-red-900"
                    }`}
                  >
                    {result.isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-lg font-semibold text-gray-800 dark:text-gray-200 dir-ltr">
                        {result.code}
                      </span>
                      <button
                        onClick={() => copyToClipboard(result.code, index)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                        title="کپی کد ملی"
                      >
                        {copiedIndex === index ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>

                    <p
                      className={`text-sm mt-1 ${
                        result.isValid
                          ? "text-green-700 dark:text-green-400"
                          : "text-red-700 dark:text-red-400"
                      }`}
                    >
                      {result.messageFa}
                    </p>
                  </div>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    result.isValid
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {result.isValid ? "معتبر" : "نامعتبر"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {!showAll && results.length > 10 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            و {results.length - 10} نتیجه دیگر...
          </p>
        </div>
      )}
    </motion.div>
  );
}
