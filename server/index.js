const express = require('express')
const cors = require('cors')
const {createPlayer, getCards, getPlayer, storeScore, getHighScores, storeHighScore} = require('./controller.js')

const app = express()
const port = 5500

// Middleware
app.use(express.json())
app.use(cors())

//Endpoints
app.get('/api/cards', getCards)
app.get('/api/player', getPlayer)
app.get('/api/score', getHighScores)
app.post('/api/player', createPlayer)
app.post('/api/score', storeScore)
app.post('/api/highScore', storeHighScore)

app.listen(port, () => console.log(`Listening on port - ${port}`))