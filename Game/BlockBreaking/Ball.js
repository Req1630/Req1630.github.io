import CircleToBoxHit from './Collisions.js'

export default class CBall
{
	// コンストラクタ.
	constructor( x, y, s_x, s_y, r )
	{
		this.x		= x;	// 座標.
		this.y		= y;	// 座標.
		this.old_x	= x;	// 前回の座標.
		this.old_y	= y;	// 前回の座標.
		this.s_x	= s_x;	// 移動速度.
		this.s_y	= s_y;	// 移動速度.
		this.old_s	= 0.05;
		this.old_s_y	= s_x;
		this.r		= r;	// 半径.
		this.isMove	= false;
		this.angel	= 30.0*Math.PI / 180.0;
		this.angelAdd	= 0.8*Math.PI / 180.0;
		this.isAdd	= true;
	}

	initMove()
	{
		if( this.isMove == true) return true;
		
		this.angel += this.angelAdd;
		if( this.isAdd == true ){
			if( this.angel >= (150.0*Math.PI / 180.0)){
				this.angelAdd = -this.angelAdd;
				this.isAdd = false;
			}
		} else {
			if( this.angel <= (30.0*Math.PI / 180.0)){
				this.angelAdd = -this.angelAdd;
				this.isAdd = true;
			}
		}
		return false;
	}
	
	shot()
	{
		if( this.isMove == true ) return;
		this.isMove = true;
		this.s_x = -Math.cos(this.angel)*this.s_x;
		this.s_y = -Math.sin(this.angel)*this.s_y;
	}
	
	update( canvas, paddle )
	{
		if( this.initMove() == false) return true;
		// 横の判定.
		if (this.x + this.s_x > canvas.width - this.r || this.x + this.s_x < this.r) {
			this.s_x = -this.s_x;
		}
		// 上の判定.
		if (this.y + this.s_y < this.r) {
			this.s_y = -this.s_y;
		}
		
		// 下の判定.
		if (this.y + this.s_y > canvas.height - this.r) {
			return false;
		}
		
		// バーの左右.
		if(!( this.x + this.r > paddle.x && paddle.x + paddle.w > this.x - this.r && 
		      this.y + this.r > paddle.y && paddle.y + paddle.h > this.y - this.r )){
			this.old_x = this.x;
			this.old_y = this.y;
			this.x += this.s_x;
			this.y += this.s_y;
			return true;
		}
		var c = (this.x - ( paddle.x + paddle.w/2 ))*-this.s_x*this.old_s;
		if( paddle.x < this.old_x && paddle.x + paddle.w > this.old_x ){
			this.s_y = -this.s_y;
			this.s_x = c;
		}
		else if( paddle.y < this.old_y && paddle.y + paddle.h > this.old_y ){
			this.s_x = -this.s_x;
		}
		else {
			this.s_x = c;
			this.s_y = -this.s_y;
		}

		
		this.old_x = this.x;
		this.old_y = this.y;
		// 移動値の加算.
		this.x += this.s_x;
		this.y += this.s_y;

		return true;
	}


	// 描画関数.
	draw( ctx )
	{
		if( this.isMove == false ){
			ctx.save();
			ctx.beginPath();

			//ctx.translate(this.x, this.y);
			//ctx.rotate(this.angel);
			//ctx.translate(-this.x, -this.y);

			ctx.moveTo(this.x, this.y);
			ctx.lineTo(this.x-Math.cos(this.angel+10.0*Math.PI/180.0)*15,
				   this.y-Math.sin(this.angel+10.0*Math.PI/180.0)*15);
			ctx.lineTo(this.x-Math.cos(this.angel)*20,
				   this.y-Math.sin(this.angel)*20);
			ctx.lineTo(this.x-Math.cos(this.angel-10.0*Math.PI/180.0)*15,
				   this.y-Math.sin(this.angel-10.0*Math.PI/180.0)*15);
			ctx.closePath();

			ctx.strokeStyle = "rgb(0,0,0)";
			ctx.stroke();

			ctx.fillStyle = "rgb(100,40,70)";	// 色の指定.
			ctx.fill();
			ctx.restore();
		}
		
		// 円形の描画開始.
		ctx.beginPath();
		// 円形として描画. arc(座標x,座標y,半径,開始角度ラジアン,終了角度ラジアン,時計周りか).
		ctx.arc(this.x, this.y, this.r, 0, 360.0*Math.PI / 180.0, false);
		ctx.fillStyle = "green";	// 色の指定.
		ctx.fill();
		// 円形の描画終了.
		ctx.closePath();
	}
}
