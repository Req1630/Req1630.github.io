export default class CPaddle
{
    // コンストラクタ.
	constructor( x, y, w, h, s )
	{
		this.x	= x;
        this.y	= y;
		this.w	= w;
		this.h	= h;
		this.s	= s;
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
        ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
        ctx.fill();	// 輪郭線として指定.
        // 矩形の輪郭線の描画終了.
        ctx.closePath();
    };
}