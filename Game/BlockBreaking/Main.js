// JavaScriptのコードがここに入ります.
var canvas = document.getElementById("myCanvas");	// <Canvas>の要素への参照を保存.
var ctx = canvas.getContext("2d");			        // 2D描画用コンテキストを保存.

import CBall from './Ball.js';
var ball = new CBall(30, 30, 1, 1, 20 );

var ball_x = canvas.width / 2;
var ball_y = canvas.height - 100;
var ball_speed_x = 2;
var ball_speed_y = 2;
var ball_radius = 10;

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

// ボールの更新.
function ballUpdate() {
    if (ball_x + ball_speed_x > canvas.width - ball_radius || ball_x + ball_speed_x < ball_radius) {
        ball_speed_x = -ball_speed_x;
    }
    if (ball_y + ball_speed_y < ball_radius) {
        ball_speed_y = -ball_speed_y;
    }
    else if (ball_y + ball_speed_y > canvas.height - ball_radius) {
        if (paddle_x <= ball_x && ball_x <= paddle_x + paddle_width) {
            ball_speed_y = -ball_speed_y;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    ball_x += ball_speed_x;
    ball_y += ball_speed_y;
}
// ボールの描画.
function ballDraw() {
    // 円形の描画開始.
    ctx.beginPath();
    // 円形として描画. arc(座標x,座標y,半径,開始角度ラジアン,終了角度ラジアン,時計周りか).
    ctx.arc(ball_x, ball_y, ball_radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "green";	// 色の指定.
    ctx.fill();
    // 円形の描画終了.
    ctx.closePath();
}

function brickColiision() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (ball_x > b.x && ball_x < b.x + brickWidth && ball_y > b.y && ball_y < b.y + brickHeight) {
                    ball_speed_y = -ball_speed_y;
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
    ballUpdate();	// ボールの更新.
    brickColiision();
    
    ball.draw( ctx );
}
// 描画関数.
function draw() {
    // 描画領域のクリア.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddleDraw();
    ballDraw();	// ボールの描画.
    brickDraw();
    drawScore();
}
function main() {
    update();
    draw();
}

// 矩形の描画開始.
ctx.beginPath();
// 矩形として描画 rect(座標x,座標y,幅,高さ).
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";	// 色を指定.
ctx.fill();
// 矩形の描画終了.
ctx.closePath();

// 10ミリ秒おきに更新する.
var interval = setInterval(main, 10);
