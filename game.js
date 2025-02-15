document.addEventListener("DOMContentLoaded", () => {
    const coordinateElement = document.getElementById("coordinate");
    const whiteButton = document.getElementById("white");
    const darkButton = document.getElementById("dark");
    const restartButton = document.getElementById("restart");
    const messageElement = document.getElementById("message");
    const scoreElement = document.getElementById("score");

    let score = 0;
    let currentCoordinate = "";

    function getRandomCoordinate() {
        const files = ["A", "B", "C", "D", "E", "F", "G", "H"];
        const ranks = [1, 2, 3, 4, 5, 6, 7, 8];
        const file = files[Math.floor(Math.random() * 8)];
        const rank = ranks[Math.floor(Math.random() * 8)];
        return file + rank;
    }

    function getSquareColor(coordinate) {
        const file = coordinate.charCodeAt(0) - "A".charCodeAt(0);
        const rank = parseInt(coordinate[1]) - 1;
        return (file + rank) % 2 === 0 ? "dark" : "white";
    }

    function nextRound() {
        currentCoordinate = getRandomCoordinate();
        coordinateElement.textContent = currentCoordinate;
        messageElement.textContent = "";
    }

    function handleGuess(color) {
        const correctColor = getSquareColor(currentCoordinate);

        if (color === correctColor) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            nextRound();
        } else {
            messageElement.textContent = `Game Over! Pontuação final: ${score}`;
            whiteButton.style.display = "none";
            darkButton.style.display = "none";
            restartButton.style.display = "block";
        }
    }

    whiteButton.addEventListener("click", () => handleGuess("white"));
    darkButton.addEventListener("click", () => handleGuess("dark"));

    restartButton.addEventListener("click", () => {
        score = 0;
        scoreElement.textContent = "Score: 0";
        whiteButton.style.display = "inline-block";
        darkButton.style.display = "inline-block";
        restartButton.style.display = "none";
        nextRound();
    });

    nextRound();
});
