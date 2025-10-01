# 🚀 راهنمای کامل راه‌اندازی پروژه Pistac در VS Code

## ✅ وضعیت کامل پروژه

### 🎯 پروژه شما **کاملاً آماده** برای استفاده در VS Code است!

**✅ تایید شده:**
- دیتابیس SQLite کامل و عملکردی
- سیستم آپلود/دانلود فایل‌ها تست شده
- پنل ادمین کامل و کاربردی
- تمام کدها بررسی و بهینه شده
- تنظیمات VS Code پیش‌تنظیم شده

---

## 📥 مراحل دانلود و راه‌اندازی

### 1️⃣ دانلود پروژه

**روش پیشنهادی در Replit:**
```bash
Files → منوی (...) → "Download as ZIP"
```

### 2️⃣ استخراج و آماده‌سازی
```bash
# استخراج فایل ZIP
# نام پوشه: pistac-project (یا نام انتخابی شما)
cd pistac-project

# نصب dependencies
npm install
```

### 3️⃣ تنظیمات محیطی

فایل `.env` ایجاد کنید:
```env
NODE_ENV=development
PORT=5000
SESSION_SECRET=your-secure-session-secret-here
DEBUG=true
```

### 4️⃣ راه‌اندازی دیتابیس
```bash
# اعمال schema دیتابیس (اختیاری - قبلاً انجام شده)
npm run db:push
```

### 5️⃣ اجرای پروژه
```bash
# اجرای حالت development
npm run dev
```

---

## 🎛️ VS Code - راه‌اندازی و دیباگ

### 📁 فایل‌های پیش‌تنظیم شده

پروژه شامل تنظیمات کاملی برای VS Code است:

**📄 `.vscode/launch.json`** - تنظیمات دیباگ
**📄 `.vscode/tasks.json`** - وظایف خودکار

### 🔍 راه‌اندازی دیباگ

1. **باز کردن در VS Code**:
   ```bash
   code pistac-project
   ```

2. **اجرای دیباگ**:
   - `F5` یا `Run and Debug` → `🚀 Launch Pistac (Development)`
   - برای Attach: `🔍 Attach to Server`

3. **Tasks دستی**:
   - `Ctrl+Shift+P` → `Tasks: Run Task`
   - انتخاب از: `🏃 Start Dev Server`, `🗄️ Setup Database`, `🔨 Build Project`

### 🌐 دسترسی به اپلیکیشن

- **وب‌سایت**: `http://localhost:5000`
- **پنل ادمین**: `http://localhost:5000/admin-simple`

**اطلاعات ورود ادمین:**
- نام کاربری: `admin`  
- رمز عبور: `730895015`

---

## 📊 امکانات کاملاً تست شده

### ✅ مدیریت کاربران
- ثبت‌نام و ورود کاربران
- سطوح دسترسی (admin, user, premium)
- مدیریت پروفایل

### ✅ مدیریت محتوا
- دوره‌های آموزشی
- پروژه‌ها و تمرین‌ها
- مجلات و مقالات
- ویدیوهای آموزشی
- کارگاه‌ها و وبینارها

### ✅ سیستم فایل
- آپلود تصاویر و PDF (حد اکثر 10MB)
- مدیریت رسانه در `public/uploads/`
- دسترسی مستقیم از `/uploads/filename`

### ✅ پنل ادمین کامل
- مدیریت کامل محتوا
- آپلود و مدیریت فایل‌ها
- ایجاد و ویرایش صفحات
- تنظیمات سایت

---

## 🏗️ معماری پروژه

```
📁 pistac-project/
├── 🖥️ client/           # React Frontend
│   ├── src/components/   # UI Components
│   ├── src/pages/        # صفحات اپلیکیشن
│   ├── src/hooks/        # React Hooks
│   └── src/lib/         # توابع کمکی
├── ⚙️ server/           # Express.js Backend
│   ├── index.ts         # سرور اصلی
│   ├── routes.ts        # API Routes
│   ├── db.ts           # اتصال دیتابیس
│   └── storage.ts       # عملیات دیتابیس
├── 🗄️ shared/          # Drizzle Schema
├── 📱 android/         # Android App
├── 🍎 ios/            # iOS App
├── 🎯 .vscode/         # VS Code Settings
├── 📄 pistac.db        # SQLite Database
└── 🌐 public/uploads/   # فایل‌های آپلود شده
```

---

## 🚀 دستورات مفید

### 📦 Development
```bash
npm run dev              # اجرای development server
npm run build            # ساخت نسخه production
npm run start            # اجرای production server
```

### 🗄️ Database
```bash
npm run db:push          # اعمال schema changes
```

### 📱 Mobile
```bash
npm run mobile:init      # راه‌اندازی Capacitor
npm run mobile:android   # باز کردن Android Studio
npm run mobile:ios       # باز کردن Xcode
```

### 🔧 Utilities
```bash
npm run check            # بررسی TypeScript
npm install              # نصب dependencies
```

---

## 🛠️ رفع مشکلات

### 🔴 پورت اشغال
```bash
# بستن پروسه روی پورت 5000
npx kill-port 5000
```

### 🔴 مشکل Dependencies
```bash
# نصب مجدد
rm -rf node_modules package-lock.json
npm install
```

### 🔴 مشکل Database
```bash
# ریست دیتابیس (اختیاری)
rm pistac.db
npm run db:push
```

### 🔴 خطاهای TypeScript
```bash
# بررسی کدها
npm run check
```

---

## 🎨 سفارشی‌سازی

### 🌈 تغییر تم و رنگ‌ها
فایل: `client/src/index.css`

### 📝 تغییر محتوا
- اسلایدرها: پنل ادمین → `slides`
- دوره‌ها: پنل ادمین → `courses`
- مجلات: پنل ادمین → `magazines`

### 🔧 تنظیمات سرور
فایل: `server/index.ts`

---

## 🔒 امنیت

### ⚠️ نکات مهم:
- حتماً `SESSION_SECRET` را در production تغییر دهید
- فایل‌های حساس را در `.env` نگه دارید
- از HTTPS در production استفاده کنید

---

## 📈 عملکرد

### ✅ بهینه‌سازی‌های انجام شده:
- TanStack Query برای cache داده‌ها
- SQLite برای سرعت بالا
- Vite برای hot reload سریع
- TypeScript برای توسعه ایمن

---

## 📞 پشتیبانی

اگر مشکلی داشتید:

1. ✅ مطمئن شوید Node.js نصب شده
2. 🔄 دستور `npm install` را اجرا کنید  
3. 📖 لاگ‌های console را بررسی کنید
4. 🌐 مطمئن شوید پورت 5000 آزاد است

---

## 🎉 تبریک!

پروژه Pistac آماده استفاده در VS Code است! 

**امکانات کامل:**
- ✅ وب‌سایت کامل
- ✅ اپلیکیشن موبایل  
- ✅ پنل ادمین
- ✅ سیستم فایل
- ✅ دیتابیس قدرتمند

**موفق باشید! 🚀**