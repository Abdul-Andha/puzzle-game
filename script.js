function initialize() {
    selectedPieces = [];
    puzzlePieces = [];
    solvedPuzzle = [];
    for (let i = 0; i < 16; i++)
        puzzlePieces.push(document.getElementById("gridSlot" + (i).toString()));
    for (let i = 0; i < 16; i++)
        solvedPuzzle.push(puzzlePieces[i].src);
    score = document.getElementById("score");
    numSwaps = 0;
}

function selectPiece(pieceNum) {
    if (selectedPieces.length < 2 && !selectedPieces.includes(puzzlePieces[pieceNum])) {
        selectedPieces.push(puzzlePieces[pieceNum]);
        puzzlePieces[pieceNum].className = "selected";
    } else {
        selectedPieces = [];
        puzzlePieces[pieceNum].className = "piece";
    }

    if (selectedPieces.length === 2) {
        swapPieces();
    if (isSolved())
        document.getElementById("winMsg").innerHTML = "Congratulations! You won in " +  numSwaps + " moves.";
    display();
    }
}

function swapPieces() {
    let temp = selectedPieces[0].src;
    selectedPieces[0].src = selectedPieces[1].src;
    selectedPieces[1].src = temp;
    numSwaps++;
    for (let i = 0; i < selectedPieces.length; i++) {
        selectedPieces[i].className = "piece";
    }
    selectedPieces = [];
}

function isSolved() {
    for (let i = 0; i < 16; i++) {
        if (solvedPuzzle[i] !== puzzlePieces[i].src)
            return false;
    }
    return true;
}

function shufflePieces() {
    for (let i = 0; i < 1000; i++) {
        let random1 = Math.floor((Math.random() * 16));
        let random2 = Math.floor((Math.random() * 16));
        let temp = puzzlePieces[random1].src;
        puzzlePieces[random1].src = puzzlePieces[random2].src;
        puzzlePieces[random2].src = temp;
    }
}

function display() {
    score.innerHTML = "Score: " + numSwaps;
}