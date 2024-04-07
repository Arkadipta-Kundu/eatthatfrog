// Retrieve saved scores from local storage and sort by date in descending order
function getDailyScores() {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    // Sort scores by date in descending order
    scores.sort((a, b) => new Date(b.date) - new Date(a.date));
    return scores;
}

// Update daily scores in the HTML
function updateDailyScores() {
    const dailyScores = getDailyScores();
    const dailyScoresContainer = document.getElementById('dailyScores');
    dailyScoresContainer.innerHTML = '';

    if (dailyScores.length === 0) {
        const noDataText = document.createElement('p');
        noDataText.textContent = 'No data to show';
        noDataText.classList.add('no-data-text');
        dailyScoresContainer.appendChild(noDataText);
    } else {
        dailyScores.forEach(score => {
            const scoreElement = document.createElement('div');
            scoreElement.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center');

            const scoreInfo = document.createElement('span');
            scoreInfo.textContent = `Date: ${score.date}, Score: ${score.score}`;
            scoreElement.appendChild(scoreInfo);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-sm', 'btn-danger', 'delete-button');
            deleteButton.textContent = '❌';
            deleteButton.style.display = 'none';
            deleteButton.addEventListener('click', function () {
                deleteScore(score.date);
            });
            scoreElement.appendChild(deleteButton);

            scoreElement.addEventListener('mouseover', function () {
                deleteButton.style.display = 'inline-block';
            });
            scoreElement.addEventListener('mouseout', function () {
                deleteButton.style.display = 'none';
            });

            dailyScoresContainer.appendChild(scoreElement);
        });

        // Calculate and display average score if there is data available for the past 7 days
        const averageScore = calculateAverageScore();
        if (!isNaN(averageScore)) {
            const averageScoreContainer = document.getElementById('averageScoreContainer');
            // averageScoreContainer.innerHTML = `Average Score : ${averageScore}%`;
        }
    }
}

// Function to delete a score by date
function deleteScore(date) {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores = scores.filter(score => score.date !== date);
    localStorage.setItem('scores', JSON.stringify(scores));
    updateDailyScores();
}


// Call updateDailyScores function to display daily scores when page loads
updateDailyScores();

// Chart.js
const scores = getDailyScores();
const dates = scores.map(score => score.date).reverse(); // Reverse the dates array
const scoreValues = scores.map(score => score.score).reverse(); // Reverse the scoreValues array

if (scores.length > 0) {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Score',
                data: scoreValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Score'
                    }
                }
            }
        }
    });
} else {
    const scoreChartContainer = document.getElementById('scoreChart');
    scoreChartContainer.textContent = 'No data to show';
    scoreChartContainer.classList.add('no-data-text');
}

// Function to calculate average score of past 7 days
function calculateAverageScore() {
    const pastSevenDaysScores = getPastSevenDaysScores();
    if (pastSevenDaysScores.length === 0) return NaN; // Return NaN if there are no scores for the past 7 days

    const totalScores = pastSevenDaysScores.reduce((total, entry) => total + parseFloat(entry.score), 0);
    const averageScore = totalScores / pastSevenDaysScores.length;

    return averageScore.toFixed(2); // Return average score rounded to 2 decimal places
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

// Add event listener to the reset data button
document.getElementById('resetDataButton').addEventListener('click', function () {
    // Clear local storage
    localStorage.removeItem('scores');

    // Optional: Notify the user that data has been reset
    alert('Data has been reset successfully.');
});

// Function to check if data is present in local storage
function isDataPresent() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    return scores.length > 0;
}

// Function to toggle reset button visibility
function toggleResetButton() {
    const resetButton = document.getElementById('resetDataButton');
    if (isDataPresent()) {
        resetButton.style.display = 'block';
    } else {
        resetButton.style.display = 'none';
        document.getElementById('average7Score').style.display = 'none';
        document.getElementById('averageScore').style.display = 'none';
        document.getElementById('export').style.display = 'none';
    }
}

// Add an event listener to the window load event to check for data presence and toggle button visibility
window.addEventListener('load', function () {
    toggleResetButton();
});

// Add an event listener to the reset button to clear local storage
document.getElementById('resetDataButton').addEventListener('click', function () {
    localStorage.removeItem('scores');
    toggleResetButton(); // Update button visibility after clearing data
});

// JavaScript for side slider menu
document.querySelector('.navbar-toggler').addEventListener('click', function () {
    document.querySelector('.navbar-collapse').classList.toggle('show');
});

// Function to calculate average score
function calculateAverageScore() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    if (scores.length === 0) {
        console.log('No scores found in local storage.');
        return NaN;
    }

    const totalScores = scores.reduce((total, entry) => total + parseFloat(entry.score), 0);
    const averageScore = totalScores / scores.length;

    return averageScore.toFixed(2);
}

// Function to update average score on the website
function updateAverageScore() {
    const average = calculateAverageScore();
    const averageScoreElement = document.getElementById('averageScore');

    if (!isNaN(average)) {
        averageScoreElement.textContent = `Overall Average: ${average}`;
    } else {
        averageScoreElement.textContent = 'No scores found in local storage.';
    }
}

// Call the function to update average score when the page loads
updateAverageScore();

// Function to format date as dd/mm/yyyy
function formatDate(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}

// Function to fetch past 7 dates with scores and calculate average score
function fetchPastSevenDaysScores() {
    const pastSevenDays = [];
    const currentDate = new Date();
    let totalScore = 0;

    for (let i = 6; i >= 0; i--) {
        const pastDate = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000); // Calculate past dates
        const formattedDate = formatDate(pastDate);
        const dailyScores = getDailyScores();
        const score = dailyScores.find(score => score.date === formattedDate) || { date: formattedDate, score: 'No data available' };
        pastSevenDays.push(score);
        if (score.score !== 'No data available') {
            totalScore += parseFloat(score.score);
        }
    }

    const averageScore = totalScore !== 0 ? (totalScore / pastSevenDays.length).toFixed(2) : 'No data available';

    return { pastSevenDays, averageScore };
}

// Call the function to fetch past 7 dates with scores and calculate average score
const { pastSevenDays, averageScore } = fetchPastSevenDaysScores();

// Display the average score on your site
const averageScoreContainer = document.getElementById('average7Score');
if (averageScore !== 'No data available') {
    averageScoreContainer.textContent = ` Last 7 Days Average: ${averageScore}`;
} else {
    averageScoreContainer.textContent = `No data available for the past 7 days.`;
}

// Optionally, you can display the past 7 days' scores on your site as well
const dailyScoresContainer = document.getElementById('dailyScoresContainer');
pastSevenDays.forEach(score => {
    const scoreElement = document.createElement('div');
    scoreElement.textContent = `Date: ${score.date}, Score: ${score.score}`;
    dailyScoresContainer.appendChild(scoreElement);
});


function exportToExcel() {
    // Get your data from local storage or wherever it's stored
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert your data to a worksheet
    const ws = XLSX.utils.json_to_sheet(scores);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Scores');

    // Generate a binary string from the workbook
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    // Convert the binary string to a Blob
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

    // Create a download link for the Blob
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scores.xlsx';
    document.body.appendChild(a);

    // Trigger a click event on the download link
    a.click();

    // Remove the download link from the DOM
    document.body.removeChild(a);
}

// Function to convert binary string to array buffer
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
}
