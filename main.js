const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let board = new Board();

function play() {
    board.reset();
    console.table(board.grid);
}

function play() {
    board.reset();
    let piece = new Piece(ctx);
    piece.draw();

    board.piece = piece;
}

const moves = {
    [KEY.LEFT]:  p => ({ ...p, x: p.x - 1}),
    [KEY.RIGHT]: P => ({ ...P, x: P.x + 1}),
    [KEY.DOWN]:  p => ({ ...p, y: p.y + 1})
};

document.addEventListener('keydown', event => {
    if (moves[event.keyCode]) {
        event.preventDefault();
        let p = moves[event.keyCode](board.piece);
        if (board.valid(p)) {
            board.piece.move(p);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            board.piece.draw();
        }
    }
});