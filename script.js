let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const display = document.querySelector('#display');
const topLeft = document.querySelector('#topLeft');
const topRight = document.querySelector('#topRight');
const bottomLeft = document.querySelector('#bottomLeft');
const bottomRight = document.querySelector('#bottomRight');
const strictBtn = document.querySelector('#strict')
const powerBtn = document.querySelector('#power');
const startBtn = document.querySelector('#start')