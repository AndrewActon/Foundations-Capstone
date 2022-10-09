const {cards, player, highScores} = require('./data.js')

module.exports ={
    getCards: (req, res) => {
        res.status(200).send(cards)
    },

    createPlayer: (req, res) => {
        const {name} = req.body
        player.name = name
        res.status(200).send(player.name)
    },
    
    getPlayer: (req, res) => {
        res.status(200).send(player)
    },
    
    storeScore: (req, res) => {
        const {score} = req.body
        player.score = score.toString()
        res.status(200).send(player)
    },

    getHighScores: (req, res) => {
        res.status(200).send(highScores)
    },

    storeHighScore: (req, res) => {
        const {score} = req.body
        highScores.push(score)
        res.status(200)
    }
}
