
FROM node:18-alpine

# 1. התקנת ספריות נחוצות עבור Prisma במערכת Alpine
# libc6-compat ו-openssl חיוניים כדי ש-Prisma יוכל לרוץ
RUN apk add --no-cache openssl libc6-compat

WORKDIR /usr/src/app

# 2. הגדרת משתנה סביבה כדי לעקוף בעיות תעודת אבטחה של הסינון בזמן ההורדה
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

COPY package*.json ./
COPY prisma ./prisma/

# 3. הגדרת npm להתעלם משגיאות SSL (חיוני עבור נטפרי בשלב ההתקנה)
RUN npm config set strict-ssl false
RUN npm install

# 4. יצירת ה-Prisma Client
RUN npx prisma generate

# 5. העתקת קוד המקור
COPY src ./src/