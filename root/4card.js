let flipCounter = 0
let id1 = ''
let id2 = ''
let chosen = []
let score = 0
let matchCount = 0

//Query Selectors

const player = document.querySelector('#player')

//Buttons
const restartButton = document.querySelector('#restartButton')

//Card 1 Play area queries
const card1Front = document.querySelector('#card1Front')
const card1Back = document.querySelector('#card1Back')
const card1 = document.querySelector('#card1')

//Card 2 Play area queries
const card2Front = document.querySelector('#card2Front')
const card2Back = document.querySelector('#card2Back')
const card2 = document.querySelector('#card2')

//Card 3 Play area queries
const card3Front = document.querySelector('#card3Front')
const card3Back = document.querySelector('#card3Back')
const card3 = document.querySelector('#card3')

//Card 4 Play area queries
const card4Front = document.querySelector('#card4Front')
const card4Back = document.querySelector('#card4Back')
const card4 = document.querySelector('#card4')

//Endpoints
const getCards = () => axios.get('http://localhost:5500/api/cards').then(createPlayArea)
const getPlayerData = () => axios.get('http://localhost:5500/api/player').then(displayPlayerName)
const storeScore = body => axios.post('http://localhost:5500/api/score', body).then(displayScore)
const storeHighScore = body => axios.post('http://localhost:5500/api/highScore', body)

const createPlayArea = cards => {
    flipCounter = 0
    const shuffled = shuffleArray(cards)
    chosen = duplicate(shuffled)
    //Display cards
    card1Front.innerHTML = 
    `<img src="${chosen[0].front}" class="card__face" id="card1Front">`
    card1Back.innerHTML =
    `<img src="${chosen[0].back}" class="card__face" id="card1Back">`
    card2Front.innerHTML = 
    `<img src="${chosen[1].front}" class="card__face" id="card2Front">`
    card2Back.innerHTML =
    `<img src="${chosen[1].back}" class="card__face" id="card2Back">`
    card3Front.innerHTML = 
    `<img src="${chosen[2].front}" class="card__face" id="card3Front">`
    card3Back.innerHTML =
    `<img src="${chosen[2].back}" class="card__face" id="card3Back">`
    card4Front.innerHTML = 
    `<img src="${chosen[3].front}" class="card__face" id="card4Front">`
    card4Back.innerHTML =
    `<img src="${chosen[3].back}" class="card__face" id="card4Back">`
}

    
//Shuffle cards
const shuffleArray = (obj) => {
    let newArr = obj.data
    let arrCopy = [...newArr]
    for (let i = arrCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
    }
    return arrCopy
}

//Turn selected cards into pairs before being shuffled again and displayed.
const duplicate = (arr) => {
    const pairs = []
    for (let i = 0; i < 2; i++){
        pairs.push(arr[i])
        pairs.push(arr[i])
    }

    let shuffledPairs = [...pairs]
    for (let i = shuffledPairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPairs[i], shuffledPairs[j]] = [shuffledPairs[j], shuffledPairs[i]];
    }

    return shuffledPairs
}

//Flip cards
const card1Flip = () => {
    card1.classList.toggle('is-flipped')
    flipCounter++
    cardStore(chosen[0].id)
}

const card2Flip = () => {
    card2.classList.toggle('is-flipped')
    flipCounter++
    cardStore(chosen[1].id)
}

const card3Flip = () => {
    card3.classList.toggle('is-flipped')
    flipCounter++
    cardStore(chosen[2].id)
}

const card4Flip = () => {
    card4.classList.toggle('is-flipped')
    flipCounter++
    cardStore(chosen[3].id)
}

//Matching functions
const cardStore = (id) => {
    if (flipCounter === 1){
        id1 = id
    } else if (flipCounter === 2){
        id2 = id
        matchCheck(id1, id2)
    }
}

const matchCheck = (id1, id2) => {
    setTimeout( () => {
        if (id1 === id2) {
            // alert('Good Job!')
            flipCounter = 0
            score += 4
            matchCount++
            let bodyObj = {
                score: score
            }
            storeScore(bodyObj)
            if (matchCount === 2) {
                alert('You won!')
                storeScore(bodyObj)
                storeHighScore(bodyObj)
            }
        } else if (flipCounter === 2) {
            alert('Try again')
            score -= 2
            let bodyObj = {
                score: score
            }
            storeScore(bodyObj)
            softReset()
        }
    }, 500)
}

const softReset = () => {
    card1.className = 'card__inner'
    card2.className = 'card__inner'
    card3.className = 'card__inner'
    card4.className = 'card__inner'
    flipCounter = 0
    id1 = ''
    id2 = ''
}

function displayPlayerName(user){
        const {name} = user.data
        player.innerHTML =
        `<div class="playerName" id="player">
        <p>Player: ${name}</p>
        <p>Score: </p>
        </div>`
}

const displayScore = user => {
    const {score, name} = user.data
    player.innerHTML =
    `<div class="playerName" id="player">
    <p>Player: ${name}</p>
    <p>Score: ${score}</p>
    </div>`
}

const hardRestart = () => {
    softReset()
    setTimeout ( () => {
        getCards()
    }, 750)
}


//Page Setup
getCards()
getPlayerData()


//Event Listeners
restartButton.addEventListener('click', hardRestart)
card1.addEventListener('click', card1Flip)
card2.addEventListener('click', card2Flip)
card3.addEventListener('click', card3Flip)
card4.addEventListener('click', card4Flip)



