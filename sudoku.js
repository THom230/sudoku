let errors = 0, board = [], solution = []; 

//laad de pagina in
window.onload = function() {
    setGame();
    document.getElementById("solve-button").onclick = solvePuzzle;
    document.getElementById("generate-button").onclick = () => location.reload();
}

// initialiseerd het spel en het board met 40 lege vakjes
function setGame() {
    [board, solution] = generatePuzzle(40); 
    renderBoard(board);
}

// hier genereerd hij de puzzel 
function generatePuzzle(numToRemove) {
    let completeBoard = generateBoard();
    let puzzleBoard = removeNumbers(completeBoard, numToRemove);
    return [puzzleBoard, completeBoard];
}

// hier word het board gegenereerd
function generateBoard() {
    let board = Array(9).fill().map(() => Array(9).fill(0));
    fillBoard(board);
    return board;
}

// hier word het board gevulled met nummers
function fillBoard(board) {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
               shuffle(numbers);
                for (let number of numbers) {
                    if (isValid(board, i, j, number)) {
                        board[i][j] = number;
                        if (fillBoard(board)) return true;
                        board[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// hier worden de nummers geshuffled want ik gebruik een backtracking algoritme
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// hier checkt die of de nummer die je invulled correct is
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num || board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] === num) {
            return false;
        }
    }
    return true;
}

// hij genereerd eerst het complete puzzle en verwijderd dan nummers zo checked hij ook of je het correcte getal invulled
function removeNumbers(board, numToRemove) {
    let puzzle = board.map(row => row.slice());
    while (numToRemove > 0) {
        let row = Math.floor(Math.random() * 9); 
        let col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== 0) {
            puzzle[row][col] = 0;
            numToRemove--;
        }
    }
    return puzzle;
}

// dit is de functie om het board in te laden
function renderBoard(board) {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            if (board[r][c] != 0) {
                tile.innerText = board[r][c];
                tile.className = "tile tile-start";
            } else {
                let input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.className = "tile-input";
                input.oninput = checkInput;
                tile.appendChild(input);
                tile.className = "tile";
            }
            if (r == 2 || r == 5) tile.classList.add("horizontal-line");
            if (c == 2 || c == 5) tile.classList.add("vertical-line");
            boardElement.appendChild(tile);
        }
    }
}
 // elke keer als je iets invulled dan doet het deze functie
function checkInput() {
    let input = this;
    let [r, c] = input.parentElement.id.split("-").map(Number);
    if (input.value == solution[r][c]) {
        input.classList.add("correct");
        input.classList.remove("incorrect");
    } else {
        input.classList.add("incorrect");
        input.classList.remove("correct");
        document.getElementById("errors").innerText = ++errors;
    }
}
// hier haalt het de verijderde getalen die zijn opgeslagen weer terug
function solvePuzzle() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(`${r}-${c}`);
            if (board[r][c] == 0) {
                let input = tile.querySelector("input");
                input.value = solution[r][c];
                input.classList.add("correct");
                input.classList.remove("incorrect");
            }
        }
    }
}



gsap.from('h1', { duration: 3, y: '-100%', ease: 'bounce'});
gsap.from('.buttons', { duration: 3, y: '250%', ease: 'bounce'});
gsap.from('#banner', { duration: 1, y: '-500%', ease: 'bounce'});