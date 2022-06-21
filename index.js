import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()

const PORT = 4444

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello  world!')
})

app.post('/auth/login', (req, res) => {
  console.log(req.body)
  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: 'Вася',
    },
    'secret123',
  )
  res.json({
    success: true,
    token,
  })
})

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log(`Server is running on port ${PORT}`)
})
