document.addEventListener('DOMContentLoaded', () => {
    const playerNames = [];
    const submitButton = document.getElementById('submitNamesButton');
    const startButton = document.getElementById('startButton');
    const consequenceDisplay = document.getElementById('consequence');
    const circle = document.getElementById('circle');
    let bottle; // Declare the bottle variable

    submitButton.addEventListener('click', handleNameSubmission);
    startButton.addEventListener('click', handleSpinBottle);

    function handleNameSubmission() {
        getPlayerNames();
        if (playerNames.length >= 2) {
            setupGame();
            toggleVisibility('playerInput', false);
            toggleVisibility('game', true);
        } else {
            alert('Please enter at least two player names.');
        }
    }

    function getPlayerNames() {
        for (let i = 1; i <= 5; i++) {
            const playerNameInput = document.getElementById(`playerName${i}`);
            const playerName = playerNameInput.value.trim();
            if (playerName) {
                playerNames.push(playerName);
            }
        }
    }

    function setupGame() {
        circle.innerHTML = '<div class="bottle-container"><img src="bottle.png" id="bottle" alt="Bottle"></div>';
        bottle = document.getElementById('bottle'); // Initialize the bottle variable
        positionPlayersInCircle(playerNames, circle);
    }

    function positionPlayersInCircle(names, circleElement) {
        const angleStep = 360 / names.length;
        names.forEach((name, index) => {
            const angle = angleStep * index;
            const playerDiv = createPlayerDiv(name, angle);
            circleElement.appendChild(playerDiv);
        });
    }

    function createPlayerDiv(name, angle) {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        playerDiv.style.top = `${50 + 40 * Math.sin(toRadians(angle))}%`;
        playerDiv.style.left = `${50 + 40 * Math.cos(toRadians(angle))}%`;
        playerDiv.textContent = name;
        return playerDiv;
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function handleSpinBottle() {
        const randomDegree = Math.floor(Math.random() * 3600) + 360; // Ensure multiple full spins
        bottle.style.transform = `rotate(${randomDegree}deg)`;

        setTimeout(() => {
            displayConsequence(randomDegree);
        }, 3000); // Wait for the spinning animation to complete
    }

    function displayConsequence(randomDegree) {
        const selectedPlayer = getSelectedPlayer(randomDegree);
        const randomConsequence = getRandomConsequence(selectedPlayer);
        consequenceDisplay.textContent = randomConsequence;
        toggleVisibility('consequence', true);
    }

    function getSelectedPlayer(degree) {
        const normalizedDegree = degree % 360;
        const playerIndex = Math.floor(normalizedDegree / (360 / playerNames.length));
        return playerNames[playerIndex];
    }

    function getRandomConsequence(player) {
        const consequences = [
            `Do 10 push-ups, ${player}!`,
            `Sing a song, ${player}!`,
            `Tell a joke, ${player}!`,
            `Dance for 1 minute, ${player}!`,
            `Make a funny face, ${player}!`,
            `Act like a chicken, ${player}!`,
            `Do a silly dance, ${player}!`,
            `Imitate your favorite celebrity, ${player}!`,
            `Speak in an accent for the next turn, ${player}!`,
            `Do 20 jumping jacks, ${player}!`,
        ];
        return consequences[Math.floor(Math.random() * consequences.length)];
    }

    function toggleVisibility(elementId, isVisible) {
        const element = document.getElementById(elementId);
        element.classList.toggle('hidden', !isVisible);
        element.style.opacity = isVisible ? 1 : 0;
    }

    function addParticleEffect() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particleCanvas';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        function createParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 5 + 1,
                    dx: (Math.random() - 0.5) * 2,
                    dy: (Math.random() - 0.5) * 2,
                    color: `hsl(${Math.random() * 360}, 100%, 50%)`
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });
        }

        function updateParticles() {
            particles.forEach(particle => {
                particle.x += particle.dx;
                particle.y += particle.dy;

                if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
                    particle.dx *= -1;
                }

                if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
                    particle.dy *= -1;
                }
            });
        }

        function animateParticles() {
            drawParticles();
            updateParticles();
            requestAnimationFrame(animateParticles);
        }

        createParticles();
        animateParticles();
    }

    // Initialize the particle effect
    addParticleEffect();
});
