// This function fetches the word list from the file and returns it as an array
function loadWordList() {
    return fetch('common_nouns_5000.txt')  // Make sure the path is correct relative to your HTML file
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
}

// Wait for the page to load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    showRandomWords();
});

// Function to start the countdown timer
function startCountdown() {
    const timerElement = document.getElementById('timer');
    const alarmSound = document.getElementById('alarm-sound');
    let timeRemaining = 90; // Set the countdown start time in seconds

    // Function to make the page flash red
    function flashPage() {
        const body = document.body;
        let flashCount = 0;
        const flashInterval = setInterval(() => {
            if (flashCount < 10) { // Flash 5 times (on/off = 1 flash)
                body.style.backgroundColor = flashCount % 2 === 0 ? 'red' : '';
                flashCount++;
            } else {
                clearInterval(flashInterval); // Stop flashing
                body.style.backgroundColor = ''; // Reset the background color
            }
        }, 500); // Flash every 500ms
    }

    // Update the timer every second
    const timerInterval = setInterval(() => {
        // Decrease the time and update the display
        timeRemaining--;
        timerElement.textContent = timeRemaining;

        // Start flashing the page when the timer reaches 5 seconds
        if (timeRemaining === 5) {
            flashPage();
        }

        // Check if the timer has reached zero
        if (timeRemaining <= 0) {
            clearInterval(timerInterval); // Stop the timer
            alarmSound.play(); // Play the alarm sound
        }
    }, 1000); // Update every second (1000ms)
}

// Add an event listener to start the timer when the page loads
document.addEventListener('DOMContentLoaded', function() {
    startCountdown(); // Automatically start the countdown
});

