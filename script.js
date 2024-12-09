// A long list of words
const words = [
    "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", 
    "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", 
    "papaya", "quince", "raspberry", "strawberry", "tangerine", 
    "ugli", "vanilla", "watermelon", "xigua", "yam", "zucchini"
];

// Function to generate 8 random words
function generateWords() {
    const wordList = document.getElementById("wordList");
    wordList.innerHTML = ""; // Clear the previous list
    const randomWords = [];

    while (randomWords.length < 8) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        if (!randomWords.includes(word)) {
            randomWords.push(word);
        }
    }

    randomWords.forEach(word => {
        const listItem = document.createElement("li");
        listItem.textContent = word;
        wordList.appendChild(listItem);
    });
}
