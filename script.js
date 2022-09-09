let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let power = false;
let win;

const display = document.querySelector('#display');
const topLeft = document.querySelector('.topLeft');
const topRight = document.querySelector('.topRight');
const bottomLeft = document.querySelector('.bottomLeft');
const bottomRight = document.querySelector('.bottomRight');
const strictBtn = document.querySelector('#strict')
const powerBtn = document.querySelector('#power');
const startBtn = document.querySelector('#start');

strictBtn.addEventListener('change', () => {
    if (strictBtn.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
})


powerBtn.addEventListener('change', () => {
    if (powerBtn.checked == true) {
        power = true;
        display.innerHTML = 'ON'
        setTimeout(() => {
            display.innerHTML = '-';
        }, 500)
    }
    else {
        power = false;
        display.innerHTML = 'OFF'
        setTimeout(() => {
            display.innerHTML = '';
        }, 500)
        clearColor();
        clearInterval(intervalId);
    }
})


startBtn.addEventListener('click', () => {
    if (power || win) {
        play();
    }
})


function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    display.innerHTML = 1
    good = true;
    //Game plays to 20 rounds
    //If you beat round 20, your´re the ultimate memory master
    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4 + 1));
    }
    compTurn = true;
    intervalId = setInterval(gameTurn, 1000);

}

function gameTurn() {
    power = false;

    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        power = true;
    }

    if (compTurn) {
        clearColor()
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

function one() {
   
     if(noise){
        let audio = new Audio("./audio/button1.mp3");
        audio.play()

    }
    noise = true;
    topLeft.style.backgroundColor = 'lightgreen'
}

function two() {
   
    if(noise){
        let audio = new Audio("./audio/button2.mp3");
        audio.play()

    }
    noise = true;
    topRight.style.backgroundColor = 'tomato'
}
function three() {
    
    if(noise){
        let audio = new Audio("./audio/button3.mp3");
        audio.play()

    }
    noise = true;
    bottomLeft.style.backgroundColor = 'yellow'
}

function four() {
    
    if(noise){
        let audio = new Audio("./audio/button4.mp3");
        audio.play()

    }
    noise = true;
    bottomRight.style.backgroundColor = 'lightskyblue'
}

function clearColor() {
    topLeft.style.backgroundColor = 'rgb(14, 105, 14)';
    topRight.style.backgroundColor = 'rgb(151, 9, 9)'
    bottomLeft.style.backgroundColor = 'rgb(192, 192, 27)'
    bottomRight.style.backgroundColor = 'rgb(13, 13, 199)'

}

function flashColor() {
    topLeft.style.backgroundColor = 'lightgreen';
    topRight.style.backgroundColor = 'tomato'
    bottomLeft.style.backgroundColor = 'yellow'
    bottomRight.style.backgroundColor = 'lightskyblue'

}


topLeft.addEventListener('click', () => {
    if (power) {
        playerOrder.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() => {
                clearColor()
            }, 300)
        }
    }
})

topRight.addEventListener('click', () => {
    if (power) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
                clearColor()
            }, 300)
        }
    }
})

bottomLeft.addEventListener('click', () => {
    if (power) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
                clearColor()
            }, 300)
        }
    }
})

bottomRight.addEventListener('click', () => {
    if (power) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
                clearColor()
            }, 300)
        }
    }
})

function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
        good = false;
    }
    if (playerOrder.length == 20 && good) {
        winGame();
    }
    if (good == false) {
        flashColor();
        display.innerHTML = 'NO!';
        setTimeout(() => {
            display.innerHTML = turn
            if (strict) {
                play()
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = []
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        noise = false;
    }
    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        display.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800)


    }
}

function winGame() {
    flashColor();
    display.innerHTML = 'WIN!!'
    power = false;
    win = true;
}



