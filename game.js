document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
    let scoreHistory = [];
    
    const coordinateEl = document.getElementById('coordinate');
    const scoreEl = document.getElementById('score');
    const messageEl = document.getElementById('message');
    const scoreHistoryEl = document.getElementById('score-history');
    const playerNameInput = document.getElementById('player-name');
    const topScoresEl = document.getElementById('top-scores');
    const btnWhite = document.getElementById('btn-white');
    const btnDark = document.getElementById('btn-dark');

    const correctSound = new Audio('correct.mp3'); 
    const failSound = new Audio('fail.mp3'); 

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

    function updateTopScores() {
        const topScores = JSON.parse(localStorage.getItem('topScores')) || [];
        topScoresEl.innerHTML = "<h3>Top 5 Jogadores</h3>";
        
        topScores.forEach((entry, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
            topScoresEl.appendChild(li);
        });
    }

    function saveScore(name, score) {
        if (!name) return; // Evita salvar sem nome

        let topScores = JSON.parse(localStorage.getItem('topScores')) || [];
        topScores.push({ name, score });
        
        // Ordena do maior para o menor
        topScores.sort((a, b) => b.score - a.score);

        // Mantém apenas os top 5
        topScores = topScores.slice(0, 5);
        
        localStorage.setItem('topScores', JSON.stringify(topScores));
        updateTopScores();
    }

    function newRound(reset = false) {
        if (reset) {
            const playerName = playerNameInput.value.trim() || "Jogador Anônimo";
            saveScore(playerName, score);
            scoreHistory.push(score);
            score = 0;
            updateScoreHistory();
        }

        scoreEl.textContent = score;
        currentCoordinate = generateCoordinate(); 
        coordinateEl.textContent = currentCoordinate;
        messageEl.textContent = '';

        btnWhite.disabled = false;
        btnDark.disabled = false;
    }

    function checkAnswer(userGuess) {
        if (getSquareColor(currentCoordinate) === userGuess) {
            correctSound.currentTime = 0;
            correctSound.play();
            score++;
            messageEl.textContent = 'Correto!';
            newRound();
        } else {
            failSound.currentTime = 0;
            failSound.play();
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

    updateTopScores();
    newRound();
});
