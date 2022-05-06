class Piece {
    constructor(ctx) {
    this.spawn();
    this.ctx = ctx;
    this.color = 'blue';
    this.snape = [
        [2, 0, 0]
        [2, 2, 2]
        [0, 0, 0]
    ];

    this.x = 3;
    this.y = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    move(p) {
        this.x = p.x;
        this.y = p.y;
    }

    randomizeTetrominoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes);
    }

    spawn() {
        this.typeId = this.randomizeTetrominoType(COLORS.length - 1);
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this,typeId];
        this.x = 0;
        this.y = 0;
    }
    setStartPosition() {
        this.x = this.typeId === 4 ? 4 : 3;
    }
}
