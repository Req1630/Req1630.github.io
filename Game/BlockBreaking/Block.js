class CBlock
{
    // コンストラクタ.
	constructor( x, y, w, h, hp )
	{
		this.x	= x;    // 座標.
       		this.y	= y;    // 座標.
		this.w	= w;    // 幅.
       		this.h	= h;    // 高さ.
        	this.hp = hp;   // 体力.
		this.r = 100;
		this.g = 100;
		this.b = Math.floor(Math.random() * 255);
    }

    draw( ctx )
    {
        if( this.hp <= 0 ) return;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "rgb("+this.r+","+this.g+","+this.b*this.hp+")";
        ctx.fill();
        ctx.closePath();
    }
}

import CircleToBoxHit from './Collisions.js'

var hitSE = new Audio('./Game/BlockBreaking/Sound/Hit.mp3');

export default class CBlocks
{
	constructor( w, h, hp, w_count, h_count, offset_top, offset_left, space )
	{
		this.w				= w;    // 幅.
        	this.h				= h;    // 高さ.
        	this.hp				= hp;   // 体力.
		this.w_count			= w_count;
		this.h_count			= h_count;
		this.offset_top			= offset_top;
		this.offset_left		= offset_left;
		this.space			= space;
		this.blocks			= [];
    }
	init()
	{
		for (var c = 0; c < this.w_count; c++) {
			this.blocks[c] = [];
			for (var r = 0; r < this.h_count; r++) {
				var b_posX = (c * (this.w + this.space)) + this.offset_top;
				var b_posY = (r * (this.h + this.space)) + this.offset_left;
				this.blocks[c][r] = new CBlock( b_posX, b_posY, this.w, this.h, this.hp);
			}
		}
	}
	draw( ctx )
	{
		for (var c = 0; c < this.w_count; c++) {
			for (var r = 0; r < this.h_count; r++) {
				var b = this.blocks[c][r];
				b.draw( ctx );
			}
		}
	}
	collision( ball, score, interval )
	{
			var deadCount = 0;
		  for (var c = 0; c < this.w_count; c++) {
			for (var r = 0; r < this.h_count; r++) {
				var b = this.blocks[c][r];
				if (b.hp <= 0){
					deadCount++;
					continue;
				}
				if(!( ball.x + ball.r > b.x && b.x + b.w > ball.x - ball.r &&
				      ball.y + ball.r > b.y && b.y + b.h > ball.y - ball.r )){
					continue;
				}
				if( b.x < ball.old_x && b.x + b.w > ball.old_x ){
					ball.s_y = -ball.s_y;
				}
				else if( b.y < ball.old_y && b.y + b.h > ball.old_y ){
					ball.s_x = -ball.s_x;
				}
				else {
					ball.s_x = -ball.s_x;
					ball.s_y = -ball.s_y;
				}

				hitSE.currentTime = 0;
				hitSE.play();
				b.hp--;
				score[0]++;
				if( b.hp <= 0 ) deadCount++;
			}
		}
		if (deadCount == this.w_count*this.h_count) {
			alert("YOU WIN, CONGRATULATIONS!");
			document.location.reload();
			clearInterval(interval); // Needed for Chrome to end game
		}
	}
}
