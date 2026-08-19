// load notes from local storage, or start with an empty list
let notes = JSON.parse(localStorage.getItem("myNotes")) || [];

// show notes on the page (filtered by search text if any)
function showNotes() {
  const container = document.getElementById("notesContainer");
  const searchText = document.getElementById("searchInput").value.toLowerCase();

  container.innerHTML = "";

  for (let i = 0; i < notes.length; i++) {
    // skip notes that don't match the search text
    if (searchText !== "" && !notes[i].toLowerCase().includes(searchText)) {
      continue;
    }

    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    noteDiv.innerHTML = `
      <p>${notes[i]}</p>
      <button class="editBtn" onclick="editNote(${i})">Edit</button>
      <button class="deleteBtn" onclick="deleteNote(${i})">Delete</button>
    `;

    container.appendChild(noteDiv);
  }
}

// save current notes array into local storage
function saveNotes() {
  localStorage.setItem("myNotes", JSON.stringify(notes));
}

// add a new note
function addNote() {
  const input = document.getElementById("noteInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Please write something before adding a note.");
    return;
  }

  notes.push(text);
  saveNotes();
  showNotes();
  input.value = "";
}

// delete a note by its index
function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  showNotes();
}

// edit a note by its index
function editNote(index) {
  const newText = prompt("Edit your note:", notes[index]);

  if (newText !== null && newText.trim() !== "") {
    notes[index] = newText.trim();
    saveNotes();
    showNotes();
  }
}

// show notes when the page first loads
showNotes();