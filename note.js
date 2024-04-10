// Retrieve notes from local storage on page load
window.onload = function () {
    loadNotes();
};

// JavaScript for side slider menu
document.querySelector('.navbar-toggler').addEventListener('click', function () {
    document.querySelector('.navbar-collapse').classList.toggle('show');
});

// Function to load notes from local storage
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    if (savedNotes) {
        // Reverse the order of notes to display the latest ones first
        savedNotes.reverse().forEach((note, index) => {
            const noteElement = createNoteElement(note, index);
            notesContainer.appendChild(noteElement);
        });
    }
}

// Function to create a note element
function createNoteElement(note, index) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note-container', 'bg-white', 'shadow-sm', 'rounded-md', 'p-4', 'mb-4', 'relative');

    // Apply highlighting to title and content
    const highlightedTitle = highlightMatches(note.title);
    let decodedContent = note.content;
    if (note.locked) {
        decodedContent = decodeContent(note.content);
    }
    const highlightedContent = highlightMatches(decodedContent);

    noteElement.innerHTML = `
        ${note.locked ? '' : `<h2 class="text-lg font-medium">${highlightedTitle}</h2>`}
        ${note.locked ? '' : `<p class="text-gray-600">${highlightedContent}</p>`}
        <p class="text-sm text-gray-400 mt-2">Date: ${formatDate(note.date)}</p>
        ${note.locked ? `<div class="locked-note" data-index="${index}"><button class="unlock-button">Unlock 🔓</button></div>` : ''}
        <button class="delete-button" onclick="deleteNote(${index})">❌</button>
        ${!note.locked ? `<button class="export-button" onclick="exportNote('${note.title}', '${note.content}')">⏬</button>` : ''}
    `;

    // Add event listener to unlock button for locked notes
    if (note.locked) {
        const unlockButton = noteElement.querySelector('.unlock-button');
        unlockButton.addEventListener('click', function () {
            const password = prompt('Enter the password to view the locked note:');
            // Decode the stored password before comparing
            const decodedPassword = decodePassword(note.password);
            if (password === decodedPassword) {
                const lockedNote = document.querySelector(`.locked-note[data-index="${index}"]`);
                lockedNote.innerHTML = `<p class="text-gray-600">${highlightedContent}</p>`;
            } else {
                alert('Incorrect password. You cannot view this locked note.');
            }
        });
    }

    return noteElement;
}

// Function to encode content before saving
function encodeContent(content) {
    return btoa(content);
}

// Function to decode content when displaying
function decodeContent(encodedContent) {
    return atob(encodedContent);
}


// Function to export a note as a .doc file
function exportNote(title, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = `${title}.doc`;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
}

// Function to add a new note
document.getElementById('noteForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('noteTitle').value;
    let content = document.getElementById('noteContent').value;
    const date = document.getElementById('noteDate').value;
    const lockNote = document.getElementById('lockNote').checked;
    let password = '';

    // If the note is locked, prompt the user to enter a password
    if (lockNote) {
        password = prompt('Enter a password for the locked note:');
        if (!password) return; // Cancelled password entry
        // Encode password before saving
        password = encodePassword(password);
        // Encode content before saving
        content = encodeContent(content);
    }

    if (title && content && date) {
        // Store the note along with password and lock status
        const newNote = { title, content, date, locked: lockNote, password };
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(savedNotes));
        loadNotes();

        // Clear input fields
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteContent').value = '';
        document.getElementById('noteDate').value = '';
        document.getElementById('lockNote').checked = false;
    } else {
        alert('Please enter title, content, and date for the note.');
    }
});

// Function to encode password before saving
function encodePassword(password) {
    return btoa(password);
}

// Function to decode password before comparison
function decodePassword(encodedPassword) {
    return atob(encodedPassword);
}
// Function to search and filter notes
function searchAndFilterNotes() {
    const searchText = document.getElementById('searchText').value.toLowerCase();
    const searchDate = document.getElementById('noteDate').value;

    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    let filteredNotes = savedNotes;

    if (searchText) {
        filteredNotes = filteredNotes.filter(note => {
            return note.title.toLowerCase().includes(searchText) ||
                note.content.toLowerCase().includes(searchText);
        });
    }

    if (searchDate) {
        filteredNotes = filteredNotes.filter(note => note.date === searchDate);
    }

    displayFilteredNotes(filteredNotes);
}

// Function to display filtered notes
function displayFilteredNotes(notes) {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    notes.forEach((note, index) => {
        const noteElement = createNoteElement(note, index);
        notesContainer.appendChild(noteElement);
    });
}

// Function to highlight matching words
function highlightMatches(text) {
    const searchText = document.getElementById('searchText').value.toLowerCase();
    const regex = new RegExp(searchText, 'gi');
    return text.replace(regex, match => `<span class="highlight">${match}</span>`);
}

// Function to delete a note
function deleteNote(index) {
    let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(savedNotes));
    loadNotes();
}

// Event listeners for search and filter inputs
document.getElementById('searchText').addEventListener('input', searchAndFilterNotes);
document.getElementById('noteDate').addEventListener('input', searchAndFilterNotes);

// Function to format date as dd/mm/yyyy
function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
}
