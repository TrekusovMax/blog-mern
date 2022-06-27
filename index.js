import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

import { loginValidation, postCreateValidation, registerValidation } from './validations.js'
import checkAuth from './utils/checkAuth.js'
import { getMe, login, register } from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

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

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.post('/auth/register', registerValidation, register)
app.post('/auth/login', loginValidation, login)
app.get('/auth/me', checkAuth, getMe)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update)
app.delete('/posts/:id', checkAuth, PostController.remove)

app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log(`Server is running on port ${PORT}`)
})
