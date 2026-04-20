
const { joinGame, prisma } = require('./game.service');

async function main() {
  try {
    console.log('Connecting to database and initializing dummy data...');

    // יצירת משתמש דמי
    const dummyUser = await prisma.user.create({
      data: {
        username: `User_${Date.now()}` // מונע שגיאות ייחודיות בהרצות חוזרות
      }
    });

    // יצירת משחק דמי בסטטוס WAITING
    const dummyGame = await prisma.game.create({
      data: {
        title: 'New Arena Match',
        status: 'WAITING'
      }
    });

    console.log(`Created User (ID: ${dummyUser.id}) and Game (ID: ${dummyGame.id}). Attempting to join...`);

    // קריאה לפונקציית הלוגיקה
    await joinGame(dummyUser.id, dummyGame.id);
    
    // הדפסת הודעת ההצלחה שנדרשה באפיון
    console.log('Success: User joined game');

    // אופציונלי: ניסיון להצטרף שוב כדי לבדוק שהשגיאה נזרקת כראוי
    // await joinGame(dummyUser.id, dummyGame.id);

  } catch (error) {
    // הדפסת השגיאה במקרה של כישלון
    console.error('Operation failed:', error.message);
  } finally {
    // ניתוק חיבור למסד הנתונים
    await prisma.$disconnect();
  }
}

main();