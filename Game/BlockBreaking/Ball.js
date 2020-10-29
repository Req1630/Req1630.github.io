import CircleToBoxHit from './Collisions.js'

export default class CBall
{
	// コンストラクタ.
	constructor( x, y, s_x, s_y, r )
	{
		this.x		= x;	// 座標.
		this.y		= y;	// 座標.
		this.s_x	= s_x;	// 移動速度.
		this.s_y	= s_y;	// 移動速度.
		this.r		= r;	// 半径.
		this.isMove	= false;
		this.angel	= 0.0;
	}

	initMove()
	{
		if( this.isMove == true) return true;
		
		
		
		return false;
	}
	update( canvas, paddle )
	{
		if( initMove() == false) return true;
		// 横の判定.
		if (this.x + this.s_x > canvas.width - this.r || this.x + this.s_x < this.r) {
			this.s_x = -this.s_x;
		}
		// 上の判定.
		if (this.y + this.s_y < this.r) {
			this.s_y = -this.s_y;
		}

		var hitNo = CircleToBoxHit( 
			paddle.x, paddle.x + paddle.w, 
			paddle.y, paddle.y + paddle.h,
			this.x, this.y, this.r );
		switch(hitNo){
			case 1:
			case 2:
			case 3:
				 // 横側.
			    if( this.x > paddle.x ){
					this.s_x = -this.s_x;
			    }
			    else
			    if( this.x < paddle.x+paddle.w ){
					this.s_x = -this.s_x;
			    }
				break;
			case 4:
				// 縦側.
				if( this.y < paddle.y ){
				   this.s_y = -this.s_y;
				}
				else
				if( this.y > paddle.y+paddle.h ){
					this.s_y = -this.s_y;
				}
				else
				// 横側.
				if( this.x > paddle.x ){
					this.s_x = -this.s_x;
				}
				else
				if( this.x < paddle.x+paddle.w ){
					this.s_x = -this.s_x;
				}
				break;
		}

		// 下の判定.
		if (this.y + this.s_y > canvas.height - this.r) {
			return false;
		}
		// 移動値の加算.
		this.x += this.s_x;
		this.y += this.s_y;

		return true;
	}


	// 描画関数.
	draw( ctx )
	{
		// 円形の描画開始.
		ctx.beginPath();
		// 円形として描画. arc(座標x,座標y,半径,開始角度ラジアン,終了角度ラジアン,時計周りか).
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		ctx.fillStyle = "green";	// 色の指定.
		ctx.fill();
		// 円形の描画終了.
		ctx.closePath();
		
		ctx.beginPath();
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.x+10,this.y+10);
		ctx.lineTo(this.y-10,this.y+10);
		ctx.rotate(this.angel);
		ctx.fillStyle = "green";	// 色の指定.
		ctx.fill();
		ctx.closePath();
	}
}
