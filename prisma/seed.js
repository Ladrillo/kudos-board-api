const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Clean slate
  await prisma.card.deleteMany()
  await prisma.board.deleteMany()

  // Create initial boards
  const thankYouBoard = await prisma.board.create({
    data: {
      title: 'Thanks for Everything, Team!',
      category: 'thankyou',
      owner: 'alice@example.com',
      createdAt: new Date('2025-05-09')
    }
  })

  const celebrationBoard = await prisma.board.create({
    data: {
      title: 'Happy Birthday, Greg!',
      category: 'celebration',
      owner: 'bob@example.com',
      createdAt: new Date('2025-04-10')
    }
  })

  const inspirationBoard = await prisma.board.create({
    data: {
      title: 'Monday Motivation Wall',
      category: 'inspiration',
      owner: 'carol@example.com',
      createdAt: new Date('2025-03-01')
    }
  })

  const celebrationBoardNoCards = await prisma.board.create({
    data: {
      title: 'Welcome Back!',
      category: 'celebration',
      owner: 'danny@example.com',
      createdAt: new Date('2025-02-20')
    }
  })

  const shoutoutBoard = await prisma.board.create({
    data: {
      title: 'Shoutout Central',
      category: 'thankyou',
      owner: 'emily@example.com',
      createdAt: new Date('2024-12-10')
    }
  })

  const shipItBoard = await prisma.board.create({
    data: {
      title: 'Ship It Party 🎉',
      category: 'celebration',
      owner: 'frank@example.com',
      createdAt: new Date('2025-01-20')
    }
  })

  const inspirationWordsBoard = await prisma.board.create({
    data: {
      title: 'Words to Live By',
      category: 'inspiration',
      owner: 'grace@example.com',
      createdAt: new Date('2024-09-15')
    }
  })

  const silentThanksBoard = await prisma.board.create({
    data: {
      title: 'Silent Thanks',
      category: 'thankyou',
      owner: 'harold@example.com',
      createdAt: new Date('2024-07-01')
    }
  })

  const codeFestBoard = await prisma.board.create({
    data: {
      title: 'CodeFest 2025',
      category: 'celebration',
      owner: 'ivan@example.com',
      createdAt: new Date('2025-03-03')
    }
  })

  const dreamBigBoard = await prisma.board.create({
    data: {
      title: 'Dream Big',
      category: 'inspiration',
      owner: 'jane@example.com',
      createdAt: new Date('2024-11-01')
    }
  })

  // Cards for Thank You Board
  await prisma.card.createMany({
    data: [
      {
        title: 'Huge thanks to Maya',
        description: 'You always go the extra mile - we see it and we appreciate it!',
        gif: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif',
        owner: 'alice@example.com',
        votes: 0,
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
        title: 'You made it another lap, Greg!',
        description: 'Hope your day is full of cake, laughs, and power naps.',
        gif: 'https://media.giphy.com/media/OkJat1YNdoD3W/giphy.gif',
        owner: 'carol@example.com',
        votes: 4,
        boardId: celebrationBoard.id
      },
      {
        title: 'Birthday vibes only',
        description: 'Let\'s raise a toast to your awesomeness!',
        gif: 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif',
        owner: 'bob@example.com',
        votes: 0,
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
        title: 'Start strong',
        description: '"Don\'t watch the clock; do what it does. Keep going." - Sam Levenson',
        gif: 'https://media.giphy.com/media/l0ExdMHUDKteztyfe/giphy.gif',
        owner: null,
        votes: 4,
        boardId: inspirationBoard.id
      },
      {
        title: 'Code with purpose',
        description: '"Programs must be written for people to read." - Harold Abelson',
        gif: 'https://media.giphy.com/media/f9k1tV7HyORcngKF8v/giphy.gif',
        owner: 'carol@example.com',
        votes: 3,
        boardId: inspirationBoard.id
      },
      {
        title: 'You have got this!',
        description: 'Believe in your skills. You are better than you think.',
        gif: 'https://media.giphy.com/media/3o6ZsWGHF1w0DmkPUI/giphy.gif',
        owner: null,
        votes: 5,
        boardId: inspirationBoard.id
      }
    ]
  })

  // Cards for Shoutout Central
  await prisma.card.createMany({
    data: [
      {
        title: 'Kudos to DevOps',
        description: 'Infra held up like a champ through launch week!',
        gif: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif',
        owner: 'emily@example.com',
        votes: 2,
        boardId: shoutoutBoard.id
      },
      {
        title: 'Big up to Tammy',
        description: 'Your mentorship lights the path for everyone.',
        gif: 'https://media.giphy.com/media/l2JJKs3I69qfaQleE/giphy.gif',
        owner: null,
        votes: 5,
        boardId: shoutoutBoard.id
      }
    ]
  })

  // Cards for Ship It Party 🎉
  await prisma.card.createMany({
    data: [
      {
        title: 'Release Night Legends',
        description: 'We pushed, we tested, we partied.',
        gif: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
        owner: 'frank@example.com',
        votes: 1,
        boardId: shipItBoard.id
      },
      {
        title: '🥂 To The Whole Team',
        description: 'You shipped it clean and mean!',
        gif: 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif',
        owner: 'alice@example.com',
        votes: 3,
        boardId: shipItBoard.id
      }
    ]
  })

  // Cards for Words to Live By
  await prisma.card.createMany({
    data: [
      {
        title: 'Fuel your fire',
        description: '"The best way out is always through." - Robert Frost',
        gif: 'https://media.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy.gif',
        owner: null,
        votes: 2,
        boardId: inspirationWordsBoard.id
      },
      {
        title: 'Dev Mindset',
        description: '"First, solve the problem. Then, write the code." - John Johnson',
        gif: 'https://media.giphy.com/media/l0MYEwskT2kK3l2rm/giphy.gif',
        owner: 'grace@example.com',
        votes: 4,
        boardId: inspirationWordsBoard.id
      },
      {
        title: 'Refactor your limits',
        description: '"Only those who dare to fail greatly can ever achieve greatly." - RFK',
        gif: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
        owner: null,
        votes: 1,
        boardId: inspirationWordsBoard.id
      }
    ]
  })

  // Cards for CodeFest 2025
  await prisma.card.createMany({
    data: [
      {
        title: 'Hackathon Champs!',
        description: 'The energy, the ideas, the snacks—unreal!',
        gif: 'https://media.giphy.com/media/5t9wJjyHAOxvnDnScl/giphy.gif',
        owner: 'ivan@example.com',
        votes: 6,
        boardId: codeFestBoard.id
      }
    ]
  })

  // Cards for Dream Big
  await prisma.card.createMany({
    data: [
      {
        title: 'Pursue wonder',
        description: '"The only limit to our realization of tomorrow is our doubts of today." - FDR',
        gif: 'https://media.giphy.com/media/1k0nIQYycUcoL1VQmn/giphy.gif',
        owner: 'jane@example.com',
        votes: 3,
        boardId: dreamBigBoard.id
      },
      {
        title: 'Moonshots welcome',
        description: 'Think big. Build bold.',
        gif: 'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif',
        owner: null,
        votes: 0,
        boardId: dreamBigBoard.id
      }
    ]
  })

  console.log('Seeded 10 boards with themed cards.')
}

main()
  .catch(e => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
