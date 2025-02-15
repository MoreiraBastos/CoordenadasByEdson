document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
    const coordinateEl = document.getElementById('coordinate');
    const scoreEl = document.getElementById('score');
    const messageEl = document.getElementById('message');
    const btnWhite = document.getElementById('btn-white');
    const btnDark = document.getElementById('btn-dark');

    let currentCoordinate = '';

    function generateCoordinate() {
        const letters = ['A','B','C','D','E','F','G','H'];
        const numbers = [1,2,3,4,5,6,7,8];
        const letter = letters[Math.floor(Math.random() * letters.length)];
        const number = numbers[Math.floor(Math.random() * numbers.length)];
        return letter + number;
    }

    function getSquareColor(coord) {
        const letter = coord.charAt(0).toUpperCase();
        const row = parseInt(coord.charAt(1));
        const letterNumber = letter.charCodeAt(0) - 64;
        return (letterNumber + row) % 2 === 0 ? 'dark' : 'white';
    }

    function newRound() {
        currentCoordinate = generateCoordinate();
        coordinateEl.textContent = currentCoordinate;
        messageEl.textContent = '';
    }

    function checkAnswer(userGuess) {
        if(getSquareColor(currentCoordinate) === userGuess) {
            score++;
            scoreEl.textContent = score;
            messageEl.textContent = 'Correto!';
            newRound();
        } else {
            messageEl.textContent = `Errado! Pontuação final: ${score}`;
            btnWhite.disabled = true;
            btnDark.disabled = true;
        }
    }

    btnWhite.addEventListener('click', function() {
        checkAnswer('white');
    });

    btnDark.addEventListener('click', function() {
        checkAnswer('dark');
    });

    newRound();
});
