const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is running...')
})
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)
const taskRoutes = require('./routes/taskRoutes')
app.use('/api/tasks', taskRoutes)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(5000, () => {
      console.log('Server running on port 5000')
    })
  })
  .catch((err) => {
    console.log('Connection error:', err)
  })