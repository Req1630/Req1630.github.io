// JavaScriptのコードがここに入ります.
var canvas = document.getElementById("myCanvas");	// <Canvas>の要素への参照を保存.
var ctx = canvas.getContext("2d");			        // 2D描画用コンテキストを保存.

// バー.
import CPaddle from './Paddle.js';
var paddle = new CPaddle((canvas.width - 75) / 2, canvas.height - 10, 75, 10, 6 );
// ボール.
import CBall from './Ball.js';
var ball = new CBall((canvas.width - 75) / 2, canvas.height - 15, 1, 1, 5 );
// ブロック.
import CBlocks from './Block.js';
var blocks = new CBlocks( 50, 20, 2, 7, 5, 30, 20, 10 );
blocks.init();

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

function ballStartKey(e){
    if (e.key == "space") {
        ball.shot();
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
    document.addEventListener("keyup", ballStartKey, false);

    paddle.update( canvas, { rightPressed, leftPressed } );
    if( ball.update( canvas, paddle ) == false ){
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    }
    blocks.collision( ball, score );
}
// 描画関数.
function draw() {
    // 描画領域のクリア.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    paddle.draw( ctx );
    ball.draw( ctx );
    blocks.draw( ctx );
    drawScore();
}
function main() {
    update();
    draw();
}

// 10ミリ秒おきに更新する.
var interval = setInterval(main, 10);
