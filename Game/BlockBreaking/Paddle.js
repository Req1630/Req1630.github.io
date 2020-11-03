export default class CPaddle
{
    // コンストラクタ.
	constructor( x, y, w, h, s )
	{
		this.x	= x;    // 座標.
        this.y	= y;    // 座標.
		this.w	= w;    // 幅.
		this.h	= h;    // 高さ.
		this.s	= s;    // 移動速度.
    }
    update(canvas, {rightPressed,leftPressed}) 
    {
        if (rightPressed && this.x < canvas.width - this.w) {
            this.x += this.s;
        }
        if (leftPressed && this.x > 0) {
            this.x -= this.s;
        }
    }
    draw( ctx )
    {
        // 矩形の輪郭線の描画開始.
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "rgba(50, 100, 255, 0.5)";
        ctx.fill();	// 輪郭線として指定.
        // 矩形の輪郭線の描画終了.
        ctx.closePath();
    };
}
