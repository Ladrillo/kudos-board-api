const prisma = require('./prisma')

async function main() {
  await prisma.posts.createMany({
    data: [
      { title: 'First Post', content: 'Hello, world!' },
      { title: 'Second Post', content: 'More content here...' },
      { title: 'Post without content' }, // content is optional
    ],
  })

  console.log('🌱 Seed data inserted')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
