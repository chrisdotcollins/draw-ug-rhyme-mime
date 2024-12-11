let timerInterval = null; // Global variable to keep track of the timer interval

// Function to start or reset the countdown timer
function startCountdown() {
    const timerElement = document.getElementById('timer');
    const timerContainer = document.querySelector('.timer-container');
    const alarmSound = document.getElementById('alarm-sound');
    let timeRemaining = 20; // Set the countdown start time in seconds

    // Clear any existing timer to reset
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Function to make the timer container flash red
    function flashTimerContainer() {
        let flashCount = 0;
        const flashInterval = setInterval(() => {
            if (flashCount < 20) { // Flash 10 times (on/off = 1 flash)
                timerContainer.style.backgroundColor = flashCount % 2 === 0 ? 'red' : '';
                flashCount++;
            } else {
                clearInterval(flashInterval); // Stop flashing
                timerContainer.style.backgroundColor = ''; // Reset the background color
            }
        }, 500); // Flash every 500ms
    }

    // Update the timer every second
    timerInterval = setInterval(() => {
        // Decrease the time and update the display
        timeRemaining--;
        timerElement.textContent = timeRemaining;

        // Start flashing the timer container when the timer reaches 10 seconds
        if (timeRemaining === 10) {
            flashTimerContainer();
        }

        if (timeRemaining === 3) {
            playAlarmSound(); // Play the alarm sound with 3 seconds left
        }
        
        // Check if the timer has reached zero
        if (timeRemaining <= 0) {
            clearInterval(timerInterval); // Stop the timer
        //    alarmSound.play(); // Play the alarm sound
        }
    }, 1000); // Update every second (1000ms)

    // Initialize the timer display
    timerElement.textContent = timeRemaining;
}

// Function to fetch the word list and display random words
function loadWordList() {
    return fetch('common_nouns_5000.txt') // Make sure the path is correct relative to your HTML file
        .then(response => response.text()) // Convert response to text
        .then(data => {
            // Split the text into an array of words
            return data.split('\n').map(word => word.trim()).filter(word => word !== ''); // Remove empty lines
        })
        .catch(error => {
            console.error('Error loading the word list:', error);
            return []; // Return an empty array in case of an error
        });
}

function showRandomWords() {
    loadWordList().then(wordList => {
        // Check if the word list is loaded correctly
        if (wordList.length > 0) {
            // Select 8 random words
            const randomWords = [];
            while (randomWords.length < 8) {
                const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
                if (!randomWords.includes(randomWord)) {
                    randomWords.push(randomWord);
                }
            }

            // Display the words on the page inside <ul id="wordList">
            const wordListElement = document.getElementById('wordList');
            if (wordListElement) {  // Ensure the wordList exists
                // Clear any previous content
                wordListElement.innerHTML = '';
                
                // Create and append each random word as a list item
                randomWords.forEach(word => {
                    const listItem = document.createElement('li');
                    listItem.textContent = word;
                    wordListElement.appendChild(listItem);
                });
            } else {
                console.error('Word list container (ul#wordList) not found!');
            }
        } else {
            console.error('Word list is empty or failed to load.');
        }
    });

    // Reset the timer when generating new words
    startCountdown();
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    showRandomWords(); // Generate and display words on initial page load
});
