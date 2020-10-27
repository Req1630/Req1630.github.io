// JavaScriptのコードがここに入ります.
var canvas = document.getElementById("myCanvas");	// <Canvas>の要素への参照を保存.
var ctx = canvas.getContext("2d");			        // 2D描画用コンテキストを保存.

// ボール.
import CBall from './Ball.js';
var ball = new CBall(30, 30, 5, 5, 5 );
// バー.
import CPaddle from './Paddle.js';
var paddle = new CPaddle((canvas.width - 75) / 2, canvas.height - 10, 75, 10, 6 );
// ブロック.
import CBlock from './Block.js';
var blocks = [];

for (var c = 0; c < 5; c++) {
    blocks[c] = [];
    for (var r = 0; r < 5; r++) {
        var brickX = (c * (30 + 10)) + 30;
        var brickY = (r * (30 + 10)) + 30;
        blocks[c][r] = new CBlock( brickX, brickY, 30, 30, 1);
    }
}

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];

var score = 0;

for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

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
    for (var c = 0; c < 5; c++) {
        for (var r = 0; r < 5; r++) {
            var b = blocks[c][r];
            if (b.hp <= 0) continue;
            if (ball.x > b.x && ball.x < b.x + b.w && 
                ball.y > b.y && ball.y < b.y + b.h) {
                ball.s_y = -ball.s_y;
                b.hp--;
                score++;
                if (score == brickRowCount * brickColumnCount) {
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();
                }
            }
        }
    }
    // for (var c = 0; c < brickColumnCount; c++) {
    //     for (var r = 0; r < brickRowCount; r++) {
    //         var b = bricks[c][r];
    //         if (b.status == 1) {
    //             if (ball.x > b.x && ball.x < b.x + brickWidth && 
    //                 ball.y > b.y && ball.y < b.y + brickHeight) {
    //                 ball.s_y = -ball.s_y;
    //                 b.status = 0;
    //                 score++;
    //                 if (score == brickRowCount * brickColumnCount) {
    //                     alert("YOU WIN, CONGRATULATIONS!");
    //                     document.location.reload();
    //                 }
    //             }
    //         }
    //     }
    // }
}

function brickDraw() {
    for (var c = 0; c < 5; c++) {
        for (var r = 0; r < 5; r++) {
            var b = bricks[c][r];
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
