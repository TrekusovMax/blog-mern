import express from 'express'
import mongoose from 'mongoose'

import { loginValidation, registerValidation } from './validations.js'
import checkAuth from './utils/checkAuth.js'
import { getMe, login, register } from './controllers/UserController.js'

const app = express()

mongoose
  .connect(
    `mongodb+srv://admin:admin123@cluster0.urtgmom.mongodb.net/blog?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log(`DB OK`)
  })
  .catch((err) => {
    console.log(`DB error`, err)
  })

const PORT = 4444

app.use(express.json())

app.post('/auth/register', registerValidation, register)

app.post('/auth/login', loginValidation, login)

app.get('/auth/me', checkAuth, getMe)

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log(`Server is running on port ${PORT}`)
})
