const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newGameButton = document.querySelector('.new-game-btn');

let boxCount;
let currentPlayer;
let gameGrid;
const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    boxCount = 0;
    currentPlayer = 'X';
    gameInfo.innerText = 'Current Player - X';
    gameGrid = ['','','','','','','','',''];
    boxes.forEach((box)=>{
        box.innerText = '';
        box.style.pointerEvents = 'all';
    })
    newGameButton.classList.remove('active');
    boxes.forEach((box,index)=>{
        box.classList = `box box${index+1}`;
    })
}

initGame();

boxes.forEach((box,index)=>{
    box.addEventListener('click',(ev)=>{
        boxCount++;
        handleClick(ev,index);
    })
})

function handleClick(ev,index){
    if(ev.target.innerText === ''){
        ev.target.innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        ev.target.style.pointerEvents = "none";
        swapPlayer();
        gameOver();
    }
}

function swapPlayer(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
    }
    else{
        currentPlayer = 'X';
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

function gameOver(){
    win.forEach((arr)=>{
        let winner;
        const ans = gameGrid[arr[0]]+gameGrid[arr[1]]+gameGrid[arr[2]];
        if(ans === 'XXX' || ans === 'OOO'){
            if(ans === 'XXX'){
                winner = 'X';
            }
            else{
                winner = 'O';
            }
            arr.forEach((i)=>{
                boxes[i].classList.add('win');
            });

            boxes.forEach((box)=>{
                box.style.pointerEvents = 'none';
            })

            gameInfo.innerText = `Winner Player - ${winner}`;
            newGameButton.classList.add('active');
            return;
        }
    })

    // no winner
    //check tie
    if(boxCount === 9){
        gameInfo.innerText = 'Game Tied';
        newGameButton.classList.add('active');
    }
}


newGameButton.addEventListener('click',initGame);