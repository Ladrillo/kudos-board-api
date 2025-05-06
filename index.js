const express = require('express')
const app = express()
const prisma = require('./prisma/prisma')

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ status: 'up' })
})

app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.posts.findMany()
    res.json(posts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
