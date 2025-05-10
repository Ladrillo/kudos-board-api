const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Clean slate
  await prisma.card.deleteMany()
  await prisma.board.deleteMany()

  // Create themed boards
  const thankYouBoard = await prisma.board.create({
    data: { title: 'Thanks for Everything, Team!', category: 'thankyou', owner: 'alice@example.com' }
  })

  const celebrationBoard = await prisma.board.create({
    data: { title: 'Happy Birthday, Greg!', category: 'celebration', owner: 'bob@example.com' }
  })

  const inspirationBoard = await prisma.board.create({
    data: { title: 'Monday Motivation Wall', category: 'inspiration', owner: 'carol@example.com' }
  })

  const celebrationBoardNoCards = await prisma.board.create({
    data: { title: 'Welcome Back!', category: 'celebration', owner: 'danny@example.com' }
  })

  // Cards for Thank You Board
  await prisma.card.createMany({
    data: [
      {
        title: 'Huge thanks to Maya',
        description: 'You always go the extra mile — we see it and we appreciate it!',
        gif: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif',
        owner: 'alice@example.com',
        votes: 4,
        boardId: thankYouBoard.id
      },
      {
        title: 'Shoutout to Alex',
        description: 'Your help during onboarding was a game-changer. Thank you!',
        gif: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
        owner: 'bob@example.com',
        votes: 3,
        boardId: thankYouBoard.id
      },
      {
        title: 'Much love to the QA crew',
        description: 'Thanks for catching those sneaky bugs before release!',
        gif: 'https://media.giphy.com/media/l4FGpP4lxGGgK5CBW/giphy.gif',
        owner: null,
        votes: 5,
        boardId: thankYouBoard.id
      }
    ]
  })

  // Cards for Celebration Board
  await prisma.card.createMany({
    data: [
      {
        title: '🎉 You made it another lap, Greg!',
        description: 'Hope your day is full of cake, laughs, and power naps.',
        gif: 'https://media.giphy.com/media/OkJat1YNdoD3W/giphy.gif',
        owner: 'carol@example.com',
        votes: 4,
        boardId: celebrationBoard.id
      },
      {
        title: 'Birthday vibes only',
        description: 'Let’s raise a toast to your awesomeness! 🥂',
        gif: 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif',
        owner: 'bob@example.com',
        votes: 2,
        boardId: celebrationBoard.id
      },
      {
        title: 'Greg, you legend',
        description: 'Wishing you a year full of great code and even better coffee.',
        gif: 'https://media.giphy.com/media/3oKIPwoeGErMmaI43C/giphy.gif',
        owner: null,
        votes: 3,
        boardId: celebrationBoard.id
      }
    ]
  })

  // Cards for Inspiration Board
  await prisma.card.createMany({
    data: [
      {
        title: 'Start strong 💪',
        description: '“Don’t watch the clock; do what it does. Keep going.” – Sam Levenson',
        gif: 'https://media.giphy.com/media/l0ExdMHUDKteztyfe/giphy.gif',
        owner: null,
        votes: 4,
        boardId: inspirationBoard.id
      },
      {
        title: 'Code with purpose',
        description: '“Programs must be written for people to read.” – Harold Abelson',
        gif: 'https://media.giphy.com/media/f9k1tV7HyORcngKF8v/giphy.gif',
        owner: 'carol@example.com',
        votes: 3,
        boardId: inspirationBoard.id
      },
      {
        title: 'You’ve got this!',
        description: 'Believe in your skills. You’re better than you think.',
        gif: 'https://media.giphy.com/media/3o6ZsWGHF1w0DmkPUI/giphy.gif',
        owner: null,
        votes: 5,
        boardId: inspirationBoard.id
      }
    ]
  })

  console.log('🌱 Themed gratitude/inspiration/celebration seed data inserted.')
}

main()
  .catch(e => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
