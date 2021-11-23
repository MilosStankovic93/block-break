const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score')
const blockWidth = 80
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;


let xDirection = 2;
let yDirection = 2;

const userStart = [230, 10];
let currentPosition = userStart;


const ballStart = [230, 40];
let currentBallPosition = ballStart;




let timerId = ""
let score = 0;





class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

const blocks = [
    new Block (10, 270),
    new Block (100, 270),
    new Block (190, 270),
    new Block (280, 270),
    new Block (370, 270),
    new Block (460, 270),
    new Block (10, 240),
    new Block (100, 240),
    new Block (190, 240),
    new Block (280, 240),
    new Block (370, 240),
    new Block (460, 240),
    new Block (10, 210),
    new Block (100, 210),
    new Block (190, 210),
    new Block (280, 210),
    new Block (370, 210),
    new Block (460, 210),
]

console.log(blocks[0])


function addBlocks(){

    for(let i = 0; i<blocks.length; i++){
        const block = document.createElement("div");
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block);
        
    }
    
}

addBlocks();

// add user
const user = document.createElement('div');
user.classList.add('user')
drawUser()
grid.appendChild(user)


// draw user
function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}


// draw ball 
function drawBall(){
    ball.style.left = currentBallPosition[0] + 'px'
    ball.style.bottom = currentBallPosition[1] + 'px'
}



function moveUser(e){
    if(currentPosition[0] > 0 ){
        if(e.keyCode === 37){
            currentPosition[0] -= 10
            drawUser();
        }
    }
        if(currentPosition[0] < 480){
            if(e.keyCode === 39){
                currentPosition[0] += 10
                drawUser();
            }
        }
}





document.addEventListener('keydown', moveUser)


//add ball

const ball = document.createElement("div")
ball.classList.add("ball")
drawBall()
grid.appendChild(ball)



//move ball

function moveBall(){
    currentBallPosition[0] += xDirection;
    currentBallPosition[1] += yDirection;
    drawBall();
}


timerId = setInterval(() => {
    moveBall()
    checkHit()

}, 10)

// check if  hit
function checkHit(){
// check if block hit
    for(let i = 0; i<blocks.length; i++){
        if(
            (currentBallPosition[0] > blocks[i].bottomLeft[0] && currentBallPosition[0] < blocks[i].bottomRight[0]) && 
            ((currentBallPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && currentBallPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove("block");
            blocks.splice(i,1)
            changeDirection();
            score++
            scoreDisplay.innerHTML = score;
        }
    }

// check if user hit

    if(
        (currentBallPosition[0] > currentPosition[0] && currentBallPosition[0] < currentPosition[0] + blockWidth) &&
        (currentBallPosition[1] > currentPosition[1] && currentBallPosition[1] < currentPosition[1] + blockHeight)
    ){
        changeDirection()
    }


 // check if wall hit   
    if(currentBallPosition[0] >= (boardWidth - ballDiameter) ||
    currentBallPosition[1] >= (boardHeight - ballDiameter) ||
        currentBallPosition[0] <= 0){
    
        changeDirection()

        
    }

    //game over 
    if(currentBallPosition[1] <= 0){
        clearInterval(timerId)
        scoreDisplay.innerHTML = "YOU LOSE!"
        document.removeEventListener("keydown", moveUser);
    }
    
}





function changeDirection(){
    if(xDirection == 2 && yDirection == 2){
        yDirection = -2
        return;
    }
    if(xDirection == 2 && yDirection == -2){
        xDirection = -2
        return;
    }
    if(xDirection == -2 && yDirection == -2){
        yDirection = 2
        return;
    }
    if(xDirection == -2 && yDirection == 2){
        xDirection = 2
        return;
    }
    
}


//)