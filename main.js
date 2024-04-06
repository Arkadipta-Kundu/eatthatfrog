// Function to check if it's a new month
function isNewMonth() {
    const currentDate = new Date();
    const storedMonth = localStorage.getItem('currentMonth');
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index

    if (!storedMonth || parseInt(storedMonth) !== currentMonth) {
        // Update the stored month
        localStorage.setItem('currentMonth', currentMonth);
        return true; // It's a new month
    }

    return false; // It's not a new month
}

// Function to calculate percentage and save score
function calculatePercentage() {
    const tasksCompleted = {
        'A': parseInt(document.getElementById('categoryACompleted').value),
        'B': parseInt(document.getElementById('categoryBCompleted').value),
        'C': parseInt(document.getElementById('categoryCCompleted').value)
    };
    const totalTasks = {
        'A': parseInt(document.getElementById('categoryATotal').value),
        'B': parseInt(document.getElementById('categoryBTotal').value),
        'C': parseInt(document.getElementById('categoryCTotal').value)
    };

    const weights = { 'A': 3, 'B': 2, 'C': 1 };
    let totalScore = 0;
    let totalPossibleScore = 0;

    for (const category in tasksCompleted) {
        const count = tasksCompleted[category];
        totalScore += weights[category] * count;
        totalPossibleScore += weights[category] * totalTasks[category];
    }

    const percentage = (totalScore / totalPossibleScore) * 100;
    document.getElementById('result').textContent = `Your Score: ${percentage.toFixed(2)}%`;

    // Get the current date
    const currentDate = new Date().toLocaleDateString();

    // Save the calculated score
    saveScore(currentDate, percentage.toFixed(2));
}

// Save calculated score to local storage
function saveScore(date, score) {
    // Check if the score is more than 100%
    if (parseFloat(score) > 100) {
        // console.log('Score cannot be more than 100%.');
        return; // Exit the function if the score is invalid
    }

    // Check if it's a new month
    if (isNewMonth()) {
        // Reset local storage data
        localStorage.removeItem('scores');
    }

    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Remove any previous scores for the same day
    const updatedScores = scores.filter(entry => entry.date !== date);

    // Add the latest score
    updatedScores.push({ date, score });

    // Save the updated scores
    localStorage.setItem('scores', JSON.stringify(updatedScores));
}


// Retrieve saved scores from local storage
function getDailyScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    return scores;
}

// Function to retrieve saved scores from the past 7 days
function getPastSevenDaysScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Calculate date 7 days ago

    // Filter scores for the past 7 days
    const pastSevenDaysScores = scores.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= sevenDaysAgo && entryDate <= currentDate;
    });

    return pastSevenDaysScores;
}

// Function to calculate average score of past 7 days
function calculateAverageScore() {
    const pastSevenDaysScores = getPastSevenDaysScores();
    const totalScores = pastSevenDaysScores.reduce((total, entry) => total + parseFloat(entry.score), 0);
    const averageScore = totalScores / pastSevenDaysScores.length;

    return averageScore.toFixed(2); // Return average score rounded to 2 decimal places
}
