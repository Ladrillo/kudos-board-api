const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Clean slate
  await prisma.card.deleteMany()
  await prisma.board.deleteMany()

  // Create boards
  const sprintPlanning = await prisma.board.create({
    data: { title: 'Sprint Planning Shoutouts', category: 'agile', owner: 'alice@example.com' }
  })

  const productIdeas = await prisma.board.create({
    data: { title: 'Innovation Highlights', category: 'innovation', owner: 'bob@example.com' }
  })

  const designFeedback = await prisma.board.create({
    data: { title: 'Design Team Appreciation', category: 'ux', owner: 'carol@example.com' }
  })

  const retrospective = await prisma.board.create({
    data: { title: 'Retro Cheers', category: 'agile', owner: 'dave@example.com' }
  })

  // Cards for Sprint Planning Shoutouts
  await prisma.card.createMany({
    data: [
      {
        title: 'Massive thanks to Jason',
        description: 'You nailed the planning session — clear goals and great energy!',
        gif: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif',
        owner: 'alice@example.com',
        votes: 3,
        boardId: sprintPlanning.id
      },
      {
        title: 'Shoutout to Priya!',
        description: 'Your preparation made this sprint kickoff smooth as butter.',
        gif: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
        owner: 'bob@example.com',
        votes: 2,
        boardId: sprintPlanning.id
      },
      {
        title: 'Kudos, whole team',
        description: 'Great collaboration and on-point story estimates!',
        gif: 'https://media.giphy.com/media/l4FGpP4lxGGgK5CBW/giphy.gif',
        owner: null,
        votes: 4,
        boardId: sprintPlanning.id
      }
    ]
  })

  // No cards for Innovation Highlights (intentional)

  // Cards for Design Team Appreciation
  await prisma.card.createMany({
    data: [
      {
        title: 'Thank you, Mia!',
        description: 'Your new icon set is 🔥 — crisp, modern, and consistent.',
        gif: 'https://media.giphy.com/media/OkJat1YNdoD3W/giphy.gif',
        owner: 'carol@example.com',
        votes: 4,
        boardId: designFeedback.id
      },
      {
        title: 'Love the new color scheme',
        description: 'Feels way more accessible — and it pops!',
        gif: 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif',
        owner: 'carol@example.com',
        votes: 2,
        boardId: designFeedback.id
      },
      {
        title: 'UX wins of the week',
        description: 'Those onboarding flow tweaks made a huge difference.',
        gif: 'https://media.giphy.com/media/3oKIPwoeGErMmaI43C/giphy.gif',
        owner: null,
        votes: 3,
        boardId: designFeedback.id
      },
      {
        title: 'Big thanks to Diego',
        description: 'Your accessibility audit caught things we’d missed — much appreciated.',
        gif: 'https://media.giphy.com/media/f9k1tV7HyORcngKF8v/giphy.gif',
        owner: 'alice@example.com',
        votes: 5,
        boardId: designFeedback.id
      }
    ]
  })

  // Cards for Retro Cheers
  await prisma.card.createMany({
    data: [
      {
        title: 'Teamwork FTW!',
        description: 'Despite the crunch, we stayed positive and got it done.',
        gif: 'https://media.giphy.com/media/l0ExdMHUDKteztyfe/giphy.gif',
        owner: null,
        votes: 3,
        boardId: retrospective.id
      },
      {
        title: 'Major props to Sam',
        description: 'Handled the production bug with grace and speed.',
        gif: 'https://media.giphy.com/media/3o6ZsWGHF1w0DmkPUI/giphy.gif',
        owner: 'dave@example.com',
        votes: 2,
        boardId: retrospective.id
      }
    ]
  })

  console.log('🌱 Gratitude-themed database seeded successfully.')
}

main()
  .catch(e => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
