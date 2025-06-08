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
    currentPlayer = "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    gameGrid = ['','','','','','','','',''];
    boxes.forEach((box,index)=>{
        box.innerText = '';
        box.classList = `box box${index+1}`;
        box.style.pointerEvents = 'all';
    });
    newGameButton.classList.remove('active');
}

initGame();

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handlClick(box,index);
    })
})

function handlClick(box,index){
    boxCount++;
    boxes[index].innerText = currentPlayer;
    boxes[index].style.pointerEvents = 'none';
    gameGrid[index] = currentPlayer;
    swapPlayer();
    gameOver();
}

function swapPlayer(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function gameOver(){
    let winner;

    //for(let arr of win)
    win.forEach((arr)=>{
        const ans = gameGrid[arr[0]] + gameGrid[arr[1]] + gameGrid[arr[2]]; 
        if(ans === 'XXX' || ans === 'OOO'){
            winner = ((ans === 'XXX') ? 'X' : 'O');
            arr.forEach((i)=>{
                boxes[i].classList.add('win');
            })

            boxes.forEach((box)=>{
                box.style.pointerEvents = 'none';
            })

            gameInfo.innerText = `Winner Player - ${winner}`;
            newGameButton.classList.add('active');
            // return; -> in for each loop, return acts as continue;
        }
    })

    if(winner) return;

    if(boxCount === 9){
        gameInfo.innerText = 'Game Tied';
        newGameButton.classList.add('active');
    }
}


newGameButton.addEventListener('click',initGame);