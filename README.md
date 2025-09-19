# 🇮🇷 اعتبارسنجی کد ملی ایران | Iranian National Code Validator

<div align="center">

![Persian RTL](https://img.shields.io/badge/Persian-RTL%20Support-success?style=for-the-badge&color=green)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-purple?style=for-the-badge&logo=framer)

**ابزار حرفه‌ای و زیبا برای اعتبارسنجی کدهای ملی ایرانی**

[نمایش مستقیم](http://localhost:3000) • [مستندات](#مستندات) • [نمونه کدها](#نمونه-کدها) • [مشارکت](#مشارکت)

</div>

---

## ✨ ویژگی‌های کلیدی

🎯 **اعتبارسنجی دقیق** - بر اساس الگوریتم استاندارد ایران  
🚀 **عملکرد بالا** - پردازش سریع هزاران کد ملی  
🎨 **رابط کاربری زیبا** - طراحی مدرن با انیمیشن‌های نرم  
🌙 **حالت تاریک** - پشتیبانی کامل از Dark Mode  
📱 **ریسپانسیو** - سازگار با تمام دستگاه‌ها  
🔄 **RTL** - پشتیبانی کامل از فارسی و راست به چپ  
⚡ **Client-Side** - بدون نیاز به سرور، کاملاً ایمن  
📊 **آمار تفصیلی** - نمایش گرافیکی نتایج

---

## 🚀 شروع سریع

### پیش‌نیازها

```bash
Node.js 18+
npm یا yarn
```

### نصب

```bash
# کلون کردن پروژه
git clone https://github.com/yourusername/iranian-national-code-validator.git

# ورود به پوشه پروژه
cd iranian-national-code-validator

# نصب وابستگی‌ها
npm install

# اجرای پروژه
npm run dev
```

🎉 **حالا به آدرس [http://localhost:3000](http://localhost:3000) مراجعه کنید!**

---

## 🎮 نحوه استفاده

### 1️⃣ اعتبارسنجی تک کد ملی

```typescript
import { validateIranianNationalCode } from "./lib/nationalCodeValidator";

const result = validateIranianNationalCode("0123456789");
console.log(result);
// {
//   isValid: true,
//   code: '0123456789',
//   message: 'کد ملی معتبر است',
//   messageEn: 'Valid national code',
//   messageFa: 'کد ملی معتبر است'
// }
```

### 2️⃣ اعتبارسنجی چندین کد ملی

```typescript
import { validateBulkNationalCodes } from "./lib/nationalCodeValidator";

// از آرایه
const codes = ["0123456789", "9876543210", "1234567890"];
const result = validateBulkNationalCodes(codes);

// از متن (با جداکننده‌های مختلف)
const textCodes = `0123456789
9876543210
1234567890`;
const result2 = validateBulkNationalCodes(textCodes);
```

### 3️⃣ تولید کد ملی معتبر (برای تست)

```typescript
import { generateRandomValidNationalCode } from "./lib/nationalCodeValidator";

const randomCode = generateRandomValidNationalCode();
console.log(randomCode); // مثلاً: '3240175800'
```

---

## 🛠️ تکنولوژی‌ها

| تکنولوژی      | نسخه    | توضیحات                     |
| ------------- | ------- | --------------------------- |
| Next.js       | v15.5.3 | فریمورک React مدرن          |
| TypeScript    | v5+     | تایپ‌ اسکریپت برای کیفیت کد |
| Tailwind CSS  | v3+     | CSS فریمورک مدرن            |
| Framer Motion | v11+    | انیمیشن‌های نرم             |
| Lucide React  | Latest  | آیکون‌های زیبا              |
| Vazirmatn     | Latest  | فونت فارسی مدرن             |

---

## 🧮 الگوریتم اعتبارسنجی

کد ملی ایرانی دارای **10 رقم** است که رقم آخر به عنوان **رقم کنترل** عمل می‌کند:

### مراحل اعتبارسنجی:

1. **بررسی طول**: باید دقیقاً 10 رقم باشد
2. **بررسی کاراکترها**: فقط اعداد مجاز هستند
3. **بررسی الگوهای تکراری**: کدهایی مثل `1111111111` نامعتبرند
4. **محاسبه رقم کنترل**:

   ```
   مجموع = رقم[0]×10 + رقم[1]×9 + ... + رقم[8]×2
   باقیمانده = مجموع % 11

   اگر باقیمانده < 2:
       رقم کنترل = باقیمانده
   وگرنه:
       رقم کنترل = 11 - باقیمانده
   ```

---

## 🌐 API Endpoints

### POST `/api/validate`

اعتبارسنجی کدهای ملی از طریق API

**درخواست:**

```json
{
  "codes": "0123456789" // یا ["0123456789", "9876543210"]
}
```

**پاسخ:**

```json
{
  "success": true,
  "data": {
    "totalCount": 1,
    "validCount": 1,
    "invalidCount": 0,
    "results": [...],
    "statistics": {...}
  },
  "message": "اعتبارسنجی با موفقیت انجام شد"
}
```

---

## 🤝 مشارکت

مشارکت شما در بهبود این پروژه بسیار ارزشمند است!

### مراحل مشارکت:

1. **Fork** کردن پروژه
2. ایجاد **branch** جدید (`git checkout -b feature/amazing-feature`)
3. **Commit** تغییرات (`git commit -m 'Add amazing feature'`)
4. **Push** به branch (`git push origin feature/amazing-feature`)
5. ایجاد **Pull Request**

---

## 📝 مجوز

این پروژه تحت مجوز **MIT** منتشر شده است.

---

<div align="center">

### 🇮🇷 ساخته شده با ❤️ برای ایران

**تاریخ آخرین بروزرسانی**: 19 September 2024  
**نسخه فعلی**: v1.1.0

</div>
