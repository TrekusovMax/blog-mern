import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const app = express()

mongoose
  .connect(
    `mongodb+srv://admin:admin123@cluster0.urtgmom.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log(`DB OK`)
  })
  .catch((err) => {
    console.log(`DB error`, err)
  })

const PORT = 4444

app.use(express.json())

app.post('/auth/register', (req, res) => {})

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log(`Server is running on port ${PORT}`)
})
