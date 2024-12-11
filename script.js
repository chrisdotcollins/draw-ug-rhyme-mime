let hasInteracted = false;

// Add an event listener for user interaction
window.addEventListener('click', () => {
    hasInteracted = true;
});

// Function to start the game
function startGame() {
    // Show the word container and timer
    document.querySelector('.word-container').style.display = 'block';
    document.querySelector('.timer-container').style.display = 'block';

    // Hide the start button
    document.getElementById('startGame').style.display = 'none';

    // Generate words and start the countdown
    showRandomWords();
    startCountdown(90);
}

// Function to fetch and display random words
async function showRandomWords() {
    const wordList = document.getElementById('wordList');

    if (!wordList) {
        console.error('Word container not found!');
        return;
    }

    try {
        const response = await fetch('common_nouns_5000.txt');
        const text = await response.text();
        const words = text.split('\n').filter(word => word.trim() !== '');

        const randomWords = [];
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            randomWords.push(words[randomIndex]);
        }

        wordList.innerHTML = randomWords.map(word => `<li>${word}</li>`).join('');
    } catch (error) {
        console.error('Error fetching word list:', error);
    }
}

// Countdown timer logic
function startCountdown(duration) {
    let timeRemaining = duration;
    const timerDisplay = document.getElementById('timer');
    const timerContainer = document.querySelector('.timer-container');

    const countdown = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;

        if (timeRemaining === 10) {
            timerContainer.classList.add('flash-red');
        }

        if (timeRemaining <= 0) {
            clearInterval(countdown);
            timerContainer.classList.remove('flash-red');
            playAlarmSound();
        }
    }, 1000);
}

// Function to play alarm sound
function playAlarmSound() {
    if (hasInteracted) {
        const alarmSound = document.getElementById('alarm-sound');
        alarmSound.play().catch((error) => console.error('Audio playback failed:', error));
    }
}

// Ensure initial user interaction requirement is clear
window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startGame');
    startButton.addEventListener('click', () => {
        if (!hasInteracted) {
            alert('Please interact with the page to enable audio playback.');
        }
    });
});
