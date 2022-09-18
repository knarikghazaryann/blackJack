const cards = Array.from(document.getElementsByClassName(`card`))
const finish1 = document.getElementById('finish1');
const finish2 = document.getElementById('finish2');
const results = document.getElementById('results');
const overlay = document.getElementById('overlay')
const draw = document.getElementById('draw');

let firstPlayerScore = document.getElementById('firstPlayerScore');
let secondPlayerScore = document.getElementById('secondPlayerScore');

let newGame = document.createElement('button');
newGame.innerText = 'new game'

let count = 0;
let addcount = 1
let cardsArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];
let firstPlayersRes = 0;
let secondPlayersRes = 0;

cards.map((el, index) => {
    el.addEventListener(`click`, () => {
        if (count === index) {
            el.innerHTML = cardsArray[Math.floor(Math.random() * cardsArray.length)];
            el.style.background = '#F7F7F7'
            count = count + addcount
            if (index % 2 === 0) {
                if (!isNaN(el.innerText)) {
                    firstPlayersRes = firstPlayersRes + Number(el.innerText);
                } else if (el.innerText === 'king' || el.innerText === 'queen' || el.innerText === 'jack') {
                    firstPlayersRes = firstPlayersRes + 10;
                } else if (el.innerText === 'ace') {
                    if (firstPlayersRes > 11) {
                        firstPlayersRes = firstPlayersRes + 1;
                    } else {
                        firstPlayersRes = firstPlayersRes + 11;
                    }
                }
            } else if (index % 2 === 1) {
                if (!isNaN(el.innerText)) {
                    secondPlayersRes = secondPlayersRes + Number(el.innerText);
                } else if (el.innerText === 'king' || el.innerText === 'queen' || el.innerText === 'jack') {
                    secondPlayersRes = secondPlayersRes + 10;
                } else if (el.innerText === 'ace') {
                    if (secondPlayersRes > 11) {
                        secondPlayersRes = secondPlayersRes + 1;
                    } else {
                        secondPlayersRes = secondPlayersRes + 11;
                    }
                }
            }
        }
        firstPlayerScore.innerText = `First players Score: ${firstPlayersRes}`;
        secondPlayerScore.innerText = `Second players Score: ${secondPlayersRes}`;

        if (firstPlayersRes > secondPlayersRes && firstPlayersRes > 21) {
            results.innerText = `second player wins: ${secondPlayersRes}`;
            getRes();
        } else if (firstPlayersRes === 21) {
            results.innerText = 'first player wins: 21';
            getRes();
        } else if (secondPlayersRes > firstPlayersRes && secondPlayersRes > 21) {
            results.innerText = `first player wins: ${firstPlayersRes}`;
            getRes();
        } else if (secondPlayersRes === 21) {
            results.innerText = 'second player wins: 21';
            getRes();
        }
    })
})

finish1.addEventListener(`click`, () => {
    if (count % 2 === 1) {
        addcount = 2
    } else if (count % 2 === 0) {
        count = count + 1
        addcount = 2
    }
    draw.addEventListener('click', () => {
        if(firstPlayersRes === secondPlayersRes) {
            results.innerText = 'draw'
            getRes()
        }
    })
})

finish2.addEventListener(`click`, () => {
    if (count % 2 === 0) {
        addcount = 2
    } else if (count % 2 === 1) {
        count = count + 1
        addcount = 2
    }
    draw.addEventListener('click', () => {
        if(firstPlayersRes === secondPlayersRes) {
            results.innerText = 'draw'
            getRes()
        }
    })
})

newGame.addEventListener('click', () => {
    Array.from(document.getElementsByClassName(`card`)).map(el => {
        el.innerText = '';
        el.style.background = 'url(./Images/cardd.png)';
        el.style.backgroundSize = 'cover'
        count = 0;
        addcount = 1;
        firstPlayersRes = 0;
        secondPlayersRes = 0;
        firstPlayerScore.innerText = `First players Score: ${firstPlayersRes}`;
        secondPlayerScore.innerText = `Second players Score: ${secondPlayersRes}`;
        results.style.display = 'none'
        overlay.style.display = 'none'
    })
})

function getRes() {
    results.style.display = 'flex';
    newGame.id = 'newGame';
    results.append(newGame);
    overlay.style.display = 'block'
}