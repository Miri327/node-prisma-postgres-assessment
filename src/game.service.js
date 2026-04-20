
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * מצטרף משתמש למשחק קיים
 * @param {number} userId - מזהה המשתמש
 * @param {number} gameId - מזהה המשחק
 * @returns {Promise<Object>} אובייקט ההשתתפות שנוצר
 */
async function joinGame(userId, gameId) {
  // 1. בדיקה שהמשחק קיים והסטטוס שלו הוא WAITING
  const game = await prisma.game.findUnique({
    where: { id: gameId }
  });

  if (!game) {
    throw new Error('Game not found.');
  }

  if (game.status !== 'WAITING') {
    throw new Error(`Cannot join game. Current status is ${game.status}, expected WAITING.`);
  }

  // 2. בדיקה האם המשתמש כבר רשום למשחק זה
  const existingParticipant = await prisma.gameParticipant.findUnique({
    where: {
      userId_gameId: {
        userId,
        gameId
      }
    }
  });

  if (existingParticipant) {
    throw new Error('User is already registered for this game.');
  }

  // 3. רישום המשתמש למשחק
  const participant = await prisma.gameParticipant.create({
    data: {
      userId,
      gameId,
      role: 'PLAYER'
    }
  });

  return participant;
}

module.exports = {
  joinGame,
  prisma
};