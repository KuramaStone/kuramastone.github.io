import { Entity } from "./entity.mjs";

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

const TILES = 24;
const sizeW = canvas.clientWidth / TILES;
const sizeH = canvas.clientHeight / TILES;

let lastUpdate = 0;
let snake = new Entity(5, 5, 0);

let berry = {
    x: 0,
    y: 0
};
moveBerry();

let killed = false;

function currentTime() {
    return new Date().getMilliseconds();
}

function update() {
    // Update the state of the world for the elapsed time since last render

    if(lastUpdate + 100 < currentMillis()) {
        if(killed) {
            return;
        }

        if(snake.isEatingBerry(berry)) {
            snake.eat();
            moveBerry();
        }
        snake.moveBody();
        if(snake.checkIfDead(TILES)) {
            kill();
        }

        lastUpdate = currentMillis();
    }

}

function kill() {
    killed = true;
}

function moveBerry() {

    let nx = Math.floor(Math.random() * (sizeW));
    let ny = Math.floor(Math.random() * (sizeH));

    berry = {
        x: nx,
        y: ny
    };
}

function draw() {
    // Draw grid
    drawGrid();
    drawSnake();
    drawBerry();

}

function drawBerry() {
    
    ctx.fillStyle = '#FF0000';
        let x = berry.x * sizeW;
        let y = berry.y * sizeH;

        ctx.fillRect(x + 5, y + 5, sizeW - 10, sizeH - 10);
}

function drawSnake() {

    if(killed) {
        ctx.fillStyle = '#FF0000';
    }
    else {
        ctx.fillStyle = '#F0F0F0';
    }
    for(let i = 0; i < snake.body.length; i++) {
        let b = snake.body[i];

        let x = b.x * sizeW;
        let y = b.y * sizeH;

        ctx.fillRect(x + 1, y + 1, sizeW - 2, sizeH - 2);
    }


}

function drawGrid() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    let y = canvas.clientWidth / TILES;
    ctx.strokeStyle = '#FFFFFF';
    for(let x = 0; x < canvas.clientWidth; x += canvas.clientWidth / TILES) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.clientHeight);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.clientWidth, y);
        ctx.closePath();
        ctx.stroke();
        y += canvas.clientWidth / TILES;
    }
}

function currentMillis() {
    return new Date().getTime();
}

function loop(timestamp) {

    update();
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);

window.addEventListener('keydown', function(event) {
    console.log(event.key);
    if(event.key == 'ArrowRight') {
        snake.setDirection(0);
    }
    else if(event.key == 'ArrowDown') {
        snake.setDirection(1);
    }
    else if(event.key == 'ArrowLeft') {
        snake.setDirection(2);
    }
    else if(event.key == 'ArrowUp') {
        snake.setDirection(3);
    }
    else if(event.key == ' ') {
        snake = new Entity(5, 5, 0);
        moveBerry(); 
        killed = false;
    }
});
