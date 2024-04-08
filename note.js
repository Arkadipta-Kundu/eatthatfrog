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
        savedNotes.forEach((note, index) => {
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
    const highlightedContent = highlightMatches(note.content);

    noteElement.innerHTML = `
        <h2 class="text-lg font-medium">${highlightedTitle}</h2>
        <p class="text-gray-600">${highlightedContent}</p>
        <p class="text-sm text-gray-400 mt-2">Date: ${formatDate(note.date)}</p>
        <button class="delete-button" onclick="deleteNote(${index})">❌</button>
        <button class="export-button" onclick="exportNote('${note.title}', '${note.content}')">⏬</button>
    `;
    return noteElement;
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
    const content = document.getElementById('noteContent').value;
    const date = document.getElementById('noteDate').value;

    if (title && content && date) {
        const newNote = { title, content, date };
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(savedNotes));
        loadNotes();

        // Clear input fields
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteContent').value = '';
        document.getElementById('noteDate').value = '';
    } else {
        alert('Please enter title, content, and date for the note.');
    }
});

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
