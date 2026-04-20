# node-prisma-postgres-assessment
How to Run:

Prerequisites: Ensure you have Docker Desktop installed and running.

Execution: Run the following command in the project root folder:
docker-compose up --build

What happens under the hood:

Database: Sets up a PostgreSQL container.

Sync: Automatically runs Prisma migrations/push to sync the schema.

App: Executes main.js to demonstrate the business logic.

Result: You should see Success: User joined game in the terminal logs.

הוראות הרצה
דרישות קדם: ודאו שתוכנת Docker Desktop מותקנת ופעילה.

הרצה: הריצו את הפקודה הבאה בטרמינל מתוך תיקיית הפרויקט:

docker-compose up --build

מה המערכת מבצעת:
מסד נתונים: הקמת קונטיינר PostgreSQL.

סנכרון: הרצה אוטומטית של Prisma כדי לעדכן את מבנה הטבלאות.

אפליקציה: הרצת הקובץ main.js למימוש הלוגיקה העסקית.

תוצאה: הודעת Success: User joined game תופיע ביומן הריצה (Logs).

