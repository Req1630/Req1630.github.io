export class CBall
{
	// �R���X�g���N�^.
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
		// �~�`�̕`��J�n.
		ctx.beginPath();
		// �~�`�Ƃ��ĕ`��. arc(���Wx,���Wy,���a,�J�n�p�x���W�A��,�I���p�x���W�A��,���v���肩).
		ctx.arc(ball_x, ball_y, ball_radius, 0, Math.PI * 2, false);
		ctx.fillStyle = "green";	// �F�̎w��.
		ctx.fill();
		// �~�`�̕`��I��.
		ctx.closePath();
	}
}