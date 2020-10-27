// JavaScriptのコードがここに入ります.
var canvas = document.getElementById("myCanvas");	// <Canvas>の要素への参照を保存.
var ctx = canvas.getContext("2d");			        // 2D描画用コンテキストを保存.

import CBall from './Ball.js';
var ball = new CBall(30, 30, 1, 1, 20 );

var paddle_width = 75;
var paddle_height = 10;
var paddle_x = (canvas.width - paddle_height) / 2;
var paddle_y = canvas.height - paddle_height;

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

function paddleUpdate() {
    if (rightPressed && paddle_x < canvas.width - paddle_width) {
        paddle_x += 7;
    }
    else if (leftPressed && paddle_x > 0) {
        paddle_x -= 7;
    }
}
function paddleDraw() {
    // 矩形の輪郭線の描画開始.
    ctx.beginPath();
    ctx.rect(paddle_x, paddle_y, paddle_width, paddle_height);
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.stroke();	// 輪郭線として指定.
    // 矩形の輪郭線の描画終了.
    ctx.closePath();
};

function brickColiision() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (ball.x > b.x && ball.x < b.x + brickWidth && 
                    ball.y > b.y && ball.y < b.y + brickHeight) {
                    ball.s_y = -ball.s_y;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function brickDraw() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 0) continue;
            var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
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

    paddleUpdate();
    if( ball.update( canvas,{ paddle_x, paddle_width } ) == true ){
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
    paddleDraw();
    brickDraw();
    drawScore();
    ball.draw( ctx );
}
function main() {
    update();
    draw();
}

// 10ミリ秒おきに更新する.
var interval = setInterval(main, 10);
