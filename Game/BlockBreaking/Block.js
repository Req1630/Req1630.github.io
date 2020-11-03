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
    }

    draw( ctx )
    {
        if( this.hp <= 0 ) return;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = 'rgb(50,50,${50*this.hp})';
        ctx.fill();
        ctx.closePath();
    }
}

import CircleToBoxHit from './Collisions.js'

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
	collision( ball, score )
	{
		  for (var c = 0; c < this.w_count; c++) {
			for (var r = 0; r < this.h_count; r++) {
				var b = this.blocks[c][r];
				if (b.hp <= 0) continue;
				var hitNo = CircleToBoxHit( b.x, b.x+b.w, b.y, b.y+b.h, ball.x, ball.y, ball.r );
				if( hitNo <= 0 ) continue;
				switch(hitNo){
					case 3:
					case 2:
					case 1:
						 // 横側.
						if( ball.x > b.x ){
							ball.s_x = -ball.s_x;
						}
						else
						if( ball.x < b.x+b.w ){
							ball.s_x = -ball.s_x;
						}
						break;
					case 4:
						// 縦側.
						if( ball.y < b.y ){
						   ball.s_y = -ball.s_y;
						}
						else
						if( ball.y > b.y+b.h ){
							ball.s_y = -ball.s_y;
						}
						else
						// 横側.
						if( ball.x > b.x ){
							ball.s_x = -ball.s_x;
						}
						else
						if( ball.x < b.x+b.w ){
							ball.s_x = -ball.s_x;
						}

						break;
				}
				b.hp--;
				score++;
				if (score == this.w_count*this.h_count) {
					alert("YOU WIN, CONGRATULATIONS!");
					document.location.reload();
				}
			}
		}
	}
}
