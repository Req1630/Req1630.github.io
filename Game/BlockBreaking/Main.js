// JavaScriptのコードがここに入ります.
var canvas = document.getElementById("myCanvas");	// <Canvas>の要素への参照を保存.
var ctx = canvas.getContext("2d");			        // 2D描画用コンテキストを保存.

// ボール.
import CBall from './Ball.js';
var ball = new CBall(30, 30, 2, 2, 5 );
// バー.
import CPaddle from './Paddle.js';
var paddle = new CPaddle((canvas.width - 75) / 2, canvas.height - 10, 75, 10, 6 );
// ブロック.
import CBlock from './Block.js';
var blocks = [];

import CircleToBoxHit from './Collisions.js'

var brickRowCount = 3;
var brickColumnCount = 5;
for (var c = 0; c < brickRowCount; c++) {
    blocks[c] = [];
    for (var r = 0; r < brickColumnCount; r++) {
        var brickX = (c * (30 + 10)) + 30;
        var brickY = (r * (30 + 10)) + 30;
        blocks[c][r] = new CBlock( brickX, brickY, 30, 30, 1);
    }
}

var rightPressed = false;
var leftPressed = false;

var score = 0;

// キーを押したときの処理.
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
// キーを話した時の処理.
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function brickColiision() {
    for (var c = 0; c < brickRowCount; c++) {
        for (var r = 0; r < brickColumnCount; r++) {
            var b = blocks[c][r];
            if (b.hp <= 0) continue;
            if( CircleToBoxHit( b.x, b.x+b.w, b.y, b.y+b.h, ball.x, ball.y, ball.r ) == 5){
                ball.s_y = -ball.s_y;
                b.hp--;
                score++;
                if (score == brickRowCount*brickColumnCount) {
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();
                }
            }
        }
    }
}

function brickDraw() {
    for (var c = 0; c < brickRowCount; c++) {
        for (var r = 0; r < brickColumnCount; r++) {
            var b = blocks[c][r];
            b.draw( ctx );
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

// 更新関数.
function update() {
    // イベントリスナー.
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    paddle.update( canvas, { rightPressed, leftPressed } );
    if( ball.update( canvas, paddle ) == false ){
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    }
    brickColiision();
}
// 描画関数.
function draw() {
    // 描画領域のクリア.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    paddle.draw( ctx );
    ball.draw( ctx );
    brickDraw();
    drawScore();
}
function main() {
    update();
    draw();
}

// 10ミリ秒おきに更新する.
var interval = setInterval(main, 10);
