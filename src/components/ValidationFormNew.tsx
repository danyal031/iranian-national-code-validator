"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  RefreshCw,
  Sparkles,
  Copy,
  Download,
  Zap,
  Stars,
  Wand2,
  Rocket,
  Shield,
} from "lucide-react";
import {
  validateBulkNationalCodes,
  generateRandomValidNationalCode,
  BulkValidationResult,
} from "@/lib/nationalCodeValidator";
import EnhancedStatistics from "./EnhancedStatistics";
import ResultsList from "./ResultsList";

export default function ValidationForm() {
  const [inputMode, setInputMode] = useState<"single" | "bulk">("single");
  const [singleCode, setSingleCode] = useState("");
  const [bulkCodes, setBulkCodes] = useState("");
  const [result, setResult] = useState<BulkValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = () => {
    if (isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      try {
        let codes: string;
        if (inputMode === "single") {
          codes = singleCode.trim();
        } else {
          codes = bulkCodes.trim();
        }

        if (!codes) {
          setResult(null);
          setIsLoading(false);
          return;
        }

        const validationResult = validateBulkNationalCodes(codes);
        setResult(validationResult);
      } catch (error) {
        console.error("Validation error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const generateRandomCode = () => {
    const randomCode = generateRandomValidNationalCode();
    setSingleCode(randomCode);
  };

  const generateRandomCodes = (count: number) => {
    const codes = Array.from({ length: count }, () =>
      generateRandomValidNationalCode()
    );
    setBulkCodes(codes.join("\n"));
  };

  const clearAll = () => {
    setSingleCode("");
    setBulkCodes("");
    setResult(null);
  };

  const copyResults = async () => {
    if (!result) return;

    const validCodes = result.results
      .filter((r) => r.isValid)
      .map((r) => r.code);
    const invalidCodes = result.results
      .filter((r) => !r.isValid)
      .map((r) => r.code);

    const text = `نتایج اعتبارسنجی کد ملی
کل: ${result.totalCount}
معتبر: ${result.validCount} (${result.statistics.validPercentage}%)
نامعتبر: ${result.invalidCount} (${result.statistics.invalidPercentage}%)

کدهای معتبر:
${validCodes.join("\n")}

کدهای نامعتبر:
${invalidCodes.join("\n")}`;

    try {
      await navigator.clipboard.writeText(text);
      // Toast notification would be better here
      alert("نتایج کپی شد!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-10 relative">
      {/* Header با انیمیشن پیشرفته */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="text-center relative"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 -m-20">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-full h-full bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative"
            >
              <div className="p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <motion.div
                animate={{ scale: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
              />
              <motion.div
                animate={{ scale: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-400 rounded-full"
              />
            </motion.div>

            <div className="text-right">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                اعتبارسنجی کد ملی
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-2 justify-end mt-2"
              >
                <Stars className="w-5 h-5 text-yellow-500" />
                <span className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                  نسخه پیشرفته با گرافیک زیبا
                </span>
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            سریع‌ترین و دقیق‌ترین ابزار اعتبارسنجی کد ملی ایرانی با گرافیک زیبا
            و امکانات پیشرفته
          </motion.p>
        </div>
      </motion.div>

      {/* Mode Toggle با انیمیشن */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="flex justify-center"
      >
        <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-2 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600">
          <motion.div
            layout
            className={`absolute top-2 bottom-2 w-1/2 bg-white dark:bg-gray-700 rounded-xl shadow-md transition-all duration-300 ${
              inputMode === "single" ? "right-2" : "left-2"
            }`}
          />

          <div className="relative z-10 flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setInputMode("single")}
              className={`px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 ${
                inputMode === "single"
                  ? "text-blue-600 shadow-lg"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <Zap className="w-5 h-5" />
              تک کد ملی
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setInputMode("bulk")}
              className={`px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 ${
                inputMode === "bulk"
                  ? "text-blue-600 shadow-lg"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <FileText className="w-5 h-5" />
              چندین کد ملی
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Input Form با گرافیک پیشرفته */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>

        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="p-8">
            {inputMode === "single" ? (
              <motion.div
                key="single"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="relative">
                  <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                    <input
                      type="text"
                      value={singleCode}
                      onChange={(e) => setSingleCode(e.target.value)}
                      placeholder="کد ملی خود را وارد کنید (مثال: ۰۱۲۳۴۵۶۷۸۹)"
                      className="w-full px-6 py-6 pr-16 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 text-xl font-mono dir-ltr text-center transition-all duration-300"
                      maxLength={10}
                      dir="ltr"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2"
                    >
                      <Search className="w-6 h-6 text-blue-500" />
                    </motion.div>
                  </motion.div>
                </div>

                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateRandomCode}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium shadow-lg transition-all duration-300"
                  >
                    <Wand2 className="w-5 h-5" />
                    تولید کد تصادفی معتبر
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="bulk"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="relative">
                  <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                    <textarea
                      value={bulkCodes}
                      onChange={(e) => setBulkCodes(e.target.value)}
                      placeholder="کدهای ملی را وارد کنید (هر کد در یک خط جداگانه یا با کاما جدا شده)&#10;مثال:&#10;۰۱۲۳۴۵۶۷۸۹&#10;۹۸۷۶۵۴۳۲۱۰&#10;۱۲۳۴۵۶۷۸۹۰"
                      className="w-full px-6 py-6 pr-16 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 font-mono min-h-40 resize-y dir-ltr transition-all duration-300"
                      dir="ltr"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute right-5 top-5"
                    >
                      <FileText className="w-6 h-6 text-blue-500" />
                    </motion.div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[5, 10, 20].map((count) => (
                    <motion.button
                      key={count}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => generateRandomCodes(count)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium shadow-lg transition-all duration-300"
                    >
                      <Rocket className="w-4 h-4" />
                      {count} کد تصادفی
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleValidation}
                disabled={
                  isLoading || (!singleCode.trim() && !bulkCodes.trim())
                }
                className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 min-w-48"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <RefreshCw className="w-6 h-6" />
                    </motion.div>
                    در حال پردازش...
                  </>
                ) : (
                  <>
                    <Shield className="w-6 h-6" />
                    شروع اعتبارسنجی
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAll}
                className="flex items-center gap-2 px-6 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-2xl font-bold transition-all duration-300"
              >
                <RefreshCw className="w-5 h-5" />
                پاک کردن
              </motion.button>

              {result && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyResults}
                  className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl font-bold transition-all duration-300"
                >
                  <Copy className="w-5 h-5" />
                  کپی نتایج
                </motion.button>
              )}
            </div>
          </div>

          {/* Loading Animation */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center z-10"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                />
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-lg font-medium text-gray-600 dark:text-gray-400"
                >
                  در حال پردازش و تحلیل...
                </motion.p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <EnhancedStatistics result={result} />
          <ResultsList results={result.results} />
        </motion.div>
      )}
    </div>
  );
}
