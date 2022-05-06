class Board {
    constructor(ctx, ctxNext) {
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.piece = null;
        this.next = null;
    }

    reset() {
        this.grid = this.getEmptyBoard();
        this.piece = new Piece(this.ctx);
        this.piece.setStartPosition();
        this.getNewPiece();
    }

    getNewPiece() {
        this.next = new Piece(this.ctxNext);
        this.ctxNext.clearRect(
            0,
            0,
            this.ctxNext.canvas.width,
            this.ctxNext.canvas.height
        );
        this.next.draw();
    }

    getEmptyBoard() {
        return Array.from(
            {length: ROWS}, () => Array(COLS).fill(0)
        );
    }
    valid(p) {
        return true;
    }

    insideWalls(x) {
        return x >= 0 && x < COLS;
    }

    aboveFloor(y) {
        return y <= ROWS;
    }

    notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return value === 0 ||
                (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y));
            });
        });
        
    }
    // if(this.valid(p)) {
    //     this.piece.move(p);
    // }
    
    // for (let y = 0; y < p.shape.length; ++y) {
    //     for (let x = 0; x < y; ++x) {
    //         [p.shape[x][y], p.shape[y][x]] =
    //         [p.shape[y][x], p.shape[x][y]];
    //     }
    // }
    // p.shape.forEach(row => row.reverse());

    rotate(p) {
        let clone = JSON.parse(JSON.stringify(p));
        return clone;
    }

    draw() {
        this.piece.draw();
        this.drawBoard();
    }

    drawBoard() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value > 0) {
                    this.ctx.fillStyle = COLORS[value];
                    this.ctx.fillRect(x, y, 1, 1);
                }
            });
        });
    }

    drop() {
        let p = moves[KEY.DOWN](this.piece);
        if(this.valid(p)) {
            this.piece.move(p);
        } else {
            this.freeze();
            this.clearLines();
            console.table(this.grid);

            if(this.piece.y === 0) {
                return false;
            }
            this.piece = this.next;
            this.piece.ctx = this.ctx;
            this.piece = getNewPiece();
            this.piece.setStartPosition();
        }
        return true;
    }

    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });
    }

    clearLines() {
        let lines = 0;
        if(lines > 0) {
            account.score += this.getLineClearPoints(lines);
        }
        this.grid.forEach((row, y) => {
            if(row.every(value => value > 0)) {
                lines++;


;.levelaccountacco[]EVELL = .leveltimeTI                ;LINES_PER_LEVEL                this.grid.splice(y, 1);

                this.grid.unshift(Array(COLS).fill(0));
            }
        });
    }

    getLineClearPoints(lines) {
        return lines === 1 ? POINTS.SINGLE :
               lines === 2 ? POINTS.DOUBLE :
               lines === 3 ? POINTS.TRIPLE :
               lines === 4 ? POINTS.TETRIS :
               0;
    }

}