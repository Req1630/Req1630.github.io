export default class CBlock
{
    // コンストラクタ.
	constructor( x, y, w, h, hp )
	{
		this.x	= x;    // 座標.
        this.y	= y;    // 座標.
		this.w	= w;    // 幅.
        this.h	= h;    // 高さ.
        this.hp = hp;   // 体力.
        this.isDips = true;
    }

    draw( ctx )
    {
        if( this.isDips == false ) return;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}