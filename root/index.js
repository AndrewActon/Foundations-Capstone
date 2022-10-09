//Query Selectors
const nameSubmit = document.querySelector('form')
const player = document.querySelector('#player')
const high = document.querySelector('#highScores')

const createPlayer = body => axios.post('http://localhost:5500/api/player', body).then(displayPlayerName)
const getHighScores = () => axios.get('http://localhost:5500/api/score').then(displayHighScores)
const getPlayerData = () => axios.get('http://localhost:5500/api/player').then(displayPlayerName)

function submitHandler(e) {
    e.preventDefault()

    let playerName = document.querySelector('#playerName')

    let bodyObj = {
        name: playerName.value
    }

    createPlayer(bodyObj)
}

function displayPlayerName(user){
    if (typeof user.data === 'object'){
        player.innerHTML =
        `<div class="playerName"> Player: </div>`
    } else {
        player.innerHTML =
        `<div class="playerName"> Player: ${user.data}</div>`
    }
}

function displayHighScores (scores) {
    let highScores = scores.data
    highScores.sort(function(a, b){return a - b});
    highScores.reverse()
    for (let i = 0; i < highScores.length; i++){
        high.innerHTML += 
        `<p class="span">${highScores[i]}</p>`

    }
}

getHighScores()
getPlayerData()


nameSubmit.addEventListener('submit', submitHandler)