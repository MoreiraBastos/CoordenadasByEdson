document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
    let scoreHistory = [];
    
    const coordinateEl = document.getElementById('coordinate');
    const scoreEl = document.getElementById('score');
    const messageEl = document.getElementById('message');
    const scoreHistoryEl = document.getElementById('score-history');
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

    function updateScoreHistory() {
        scoreHistoryEl.innerHTML = "";
        scoreHistory.forEach(s => {
            const li = document.createElement("li");
            li.textContent = `Pontuação: ${s}`;
            scoreHistoryEl.appendChild(li);
        });
    }

    function newRound(reset = false) {
        if (reset) {
            scoreHistory.push(score);
            score = 0;
            updateScoreHistory();
        }

        scoreEl.textContent = score;
        currentCoordinate = generateCoordinate(); // **🔹 Gera uma nova coordenada corretamente**
        coordinateEl.textContent = currentCoordinate;
        messageEl.textContent = '';

        // **🔹 Reativa os botões para nova jogada**
        btnWhite.disabled = false;
        btnDark.disabled = false;
    }

    function checkAnswer(userGuess) {
        if (getSquareColor(currentCoordinate) === userGuess) {
            score++;
            messageEl.textContent = 'Correto!';
            newRound();
        } else {
            messageEl.textContent = `Errado! Pontuação final: ${score}`;
            newRound(true);
        }
    }

    btnWhite.addEventListener('click', function() {
        checkAnswer('white');
    });

    btnDark.addEventListener('click', function() {
        checkAnswer('dark');
    });

    newRound(); // **🔹 Chamada inicial para garantir que a coordenada muda**
});
