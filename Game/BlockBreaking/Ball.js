export class CBall
{
	// コンストラクタ.
	constructor( x, y, s_x, s_y, r )
	{
		this.x		= x;
		this.y		= y;
		this.s_x	= s_x;
		this.s_y	= s_y;
		this.r		= r;
	}

	draw( ctx )
	{
		// 円形の描画開始.
		ctx.beginPath();
		// 円形として描画. arc(座標x,座標y,半径,開始角度ラジアン,終了角度ラジアン,時計周りか).
		ctx.arc(ball_x, ball_y, ball_radius, 0, Math.PI * 2, false);
		ctx.fillStyle = "green";	// 色の指定.
		ctx.fill();
		// 円形の描画終了.
		ctx.closePath();
	}
}