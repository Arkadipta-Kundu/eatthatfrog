// Function to handle form submission
document.getElementById('addScoreForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const date = document.getElementById('dateInput').value;
    const score = parseFloat(document.getElementById('scoreInput').value);

    // Validate input values
    if (!date || isNaN(score)) {
        alert('Please fill in all fields and make sure the score is a valid number.');
        return;
    }

    // Check if score is greater than 100
    if (score > 100) {
        alert('Score cannot be greater than 100.');
        return;
    }

    // Save data to local storage
    saveScore(date, score);

    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    setTimeout(function () {
        successMessage.style.display = 'none';
    }, 3000);

    // Reset form fields
    document.getElementById('dateInput').value = '';
    document.getElementById('scoreInput').value = '';
});

// Function to save score to local storage
function saveScore(date, score) {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ date, score });
    localStorage.setItem('scores', JSON.stringify(scores));
}