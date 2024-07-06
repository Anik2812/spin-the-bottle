document.getElementById('submitNamesButton').addEventListener('click', setupGame);
document.getElementById('startButton').addEventListener('click', spinBottle);

function setupGame() {
    const playerNames = [];
    for (let i = 1; i <= 5; i++) {
        const playerName = document.getElementById(`playerName${i}`).value.trim();
        if (playerName) {
            playerNames.push(playerName);
        }
    }

    if (playerNames.length < 2) {
        alert('Please enter at least two player names.');
        return;
    }

    const circle = document.getElementById('circle');
    circle.innerHTML = '<div class="bottle-container"><img src="bottle.png" id="bottle" alt="Bottle"></div>';

    const angleStep = 360 / playerNames.length;
    playerNames.forEach((name, index) => {
        const angle = angleStep * index;
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        playerDiv.style.top = `${50 + 40 * Math.sin(angle * (Math.PI / 180))}%`;
        playerDiv.style.left = `${50 + 40 * Math.cos(angle * (Math.PI / 180))}%`;
        playerDiv.textContent = name;
        circle.appendChild(playerDiv);
    });

    document.getElementById('playerInput').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
}

function spinBottle() {
    const bottle = document.getElementById('bottle');
    const consequence = document.getElementById('consequence');
    consequence.classList.add('hidden');

    const randomDegree = Math.floor(Math.random() * 3600) + 360; // Ensure multiple full spins
    bottle.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        const players = document.querySelectorAll('.player');
        const playerCount = players.length;
        const rotationPerPlayer = 360 / playerCount;
        const normalizedDegree = randomDegree % 360;
        const selectedPlayerIndex = Math.floor(normalizedDegree / rotationPerPlayer);
        const selectedPlayer = players[selectedPlayerIndex].textContent;

        const consequences = [
            `Do 10 push-ups, ${selectedPlayer}!`,
            `Sing a song, ${selectedPlayer}!`,
            `Tell a joke, ${selectedPlayer}!`,
            `Dance for 1 minute, ${selectedPlayer}!`,
            `Make a funny face, ${selectedPlayer}!`,
        ];
        const randomConsequence = consequences[Math.floor(Math.random() * consequences.length)];
        consequence.textContent = randomConsequence;
        consequence.classList.remove('hidden');
    }, 2000); // Wait for the spinning animation to complete
}
