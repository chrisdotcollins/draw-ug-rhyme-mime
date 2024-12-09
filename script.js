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

            // Display the words on the page
            const wordContainer = document.getElementById('wordlist');
            if (wordContainer) {  // Ensure the container exists
                wordContainer.innerHTML = randomWords.join(', ');
            } else {
                console.error('Word container definitely not found!');
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
