/**
 * Iranian National Code Validator
 * اعتبارسنجی کد ملی ایرانی
 */

export interface ValidationResult {
  isValid: boolean;
  code: string;
  message: string;
  messageEn: string;
  messageFa: string;
}

export interface BulkValidationResult {
  totalCount: number;
  validCount: number;
  invalidCount: number;
  results: ValidationResult[];
  statistics: {
    validPercentage: number;
    invalidPercentage: number;
  };
}

/**
 * اعتبارسنجی کد ملی ایرانی
 * @param nationalCode کد ملی برای بررسی
 * @returns نتیجه اعتبارسنجی
 */
export function validateIranianNationalCode(
  nationalCode: string
): ValidationResult {
  const code = nationalCode.trim();

  // بررسی طول کد ملی
  if (!code || code.length !== 10) {
    return {
      isValid: false,
      code,
      message: "کد ملی باید ۱۰ رقم باشد",
      messageEn: "National code must be 10 digits",
      messageFa: "کد ملی باید ۱۰ رقم باشد",
    };
  }

  // بررسی اینکه همه کاراکترها رقم باشند
  if (!/^\d{10}$/.test(code)) {
    return {
      isValid: false,
      code,
      message: "کد ملی باید فقط شامل اعداد باشد",
      messageEn: "National code must contain only digits",
      messageFa: "کد ملی باید فقط شامل اعداد باشد",
    };
  }

  // بررسی کدهای تکراری غیرمعتبر
  const repeatingCodes = [
    "0000000000",
    "1111111111",
    "2222222222",
    "3333333333",
    "4444444444",
    "5555555555",
    "6666666666",
    "7777777777",
    "8888888888",
    "9999999999",
  ];

  if (repeatingCodes.includes(code)) {
    return {
      isValid: false,
      code,
      message: "کد ملی نمی‌تواند تکراری باشد",
      messageEn: "National code cannot be repetitive",
      messageFa: "کد ملی نمی‌تواند تکراری باشد",
    };
  }

  // محاسبه رقم کنترل
  const digits = code.split("").map(Number);
  const checkDigit = digits[9];

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }

  const remainder = sum % 11;
  let expectedCheckDigit: number;

  if (remainder < 2) {
    expectedCheckDigit = remainder;
  } else {
    expectedCheckDigit = 11 - remainder;
  }

  if (checkDigit === expectedCheckDigit) {
    return {
      isValid: true,
      code,
      message: "کد ملی معتبر است",
      messageEn: "Valid national code",
      messageFa: "کد ملی معتبر است",
    };
  } else {
    return {
      isValid: false,
      code,
      message: "کد ملی نامعتبر است",
      messageEn: "Invalid national code",
      messageFa: "کد ملی نامعتبر است",
    };
  }
}

/**
 * اعتبارسنجی مجموعه‌ای از کدهای ملی
 * @param nationalCodes آرایه یا رشته از کدهای ملی
 * @returns نتیجه اعتبارسنجی مجموعه‌ای
 */
export function validateBulkNationalCodes(
  nationalCodes: string[] | string
): BulkValidationResult {
  let codes: string[] = [];

  if (typeof nationalCodes === "string") {
    // تقسیم رشته بر اساس خط جدید، کاما، فاصله یا سمی‌کالن
    codes = nationalCodes
      .split(/[\n,;\s]+/)
      .map((code) => code.trim())
      .filter((code) => code.length > 0);
  } else {
    codes = nationalCodes
      .map((code) => code.trim())
      .filter((code) => code.length > 0);
  }

  const results: ValidationResult[] = codes.map((code) =>
    validateIranianNationalCode(code)
  );
  const validResults = results.filter((result) => result.isValid);
  const invalidResults = results.filter((result) => !result.isValid);

  const totalCount = results.length;
  const validCount = validResults.length;
  const invalidCount = invalidResults.length;

  return {
    totalCount,
    validCount,
    invalidCount,
    results,
    statistics: {
      validPercentage:
        totalCount > 0 ? Math.round((validCount / totalCount) * 100) : 0,
      invalidPercentage:
        totalCount > 0 ? Math.round((invalidCount / totalCount) * 100) : 0,
    },
  };
}

/**
 * تولید کد ملی معتبر تصادفی (برای تست)
 * @returns کد ملی معتبر
 */
export function generateRandomValidNationalCode(): string {
  const digits: number[] = [];

  // تولید ۹ رقم اول به صورت تصادفی
  for (let i = 0; i < 9; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  // محاسبه رقم کنترل
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }

  const remainder = sum % 11;
  let checkDigit: number;

  if (remainder < 2) {
    checkDigit = remainder;
  } else {
    checkDigit = 11 - remainder;
  }

  digits.push(checkDigit);

  return digits.join("");
}
