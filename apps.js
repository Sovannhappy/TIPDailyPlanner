/*---------- The array of quotations----------*/
const quotations = [
    '"Failing to prepare is preparing to fail." - Benjamin Franklin',
    '"A good plan is like a road map: it shows the final destination and usually the best way to get there." - H. Stanley Judd',
    '"The best way to predict the future is to create it." - Peter Drucker. ',
    '"Planning is bringing the future into the present so that you can do something about it now." - Alan Lakein.',
    '"An hour of planning can save you ten hours of doing." - Dale Carnegie. '
]
let currentQuoteIndex = 0;
/*---------- Function to display quotations----------*/
function displayingQuotation() {
    const quoteElement = document.getElementById("quotation");
    quoteElement.textContent = quotations[currentQuoteIndex];
    currentQuoteIndex = (currentQuoteIndex + 1) % quotations.length;
    clearTimeout(displayingQuotation.timeoutId);

    displayingQuotation.timeoutId = setTimeout( () => {
        displayingQuotation();
    }, 10000);
}
 displayingQuotation();
/*---------- The end of function to display quotations----------*/

/*---------- The beginning of CRUD functions.----------*/

/*---------- Create function.----------*/
const createNewNote = document.querySelector('.built-template');
const saveNote = document.querySelector('.save');
const noteModal = document.createElement('main');
let userNoteTitle, userMainNote;
let currentNoteId = null;
createNewNote.addEventListener("click", createNote);
saveNote.addEventListener("click", saveNoteHandler);
function createNote() {
  noteModal.innerHTML = '';
  document.body.appendChild(noteModal);

  const noteWrapper = document.createElement('div');
  noteWrapper.classList.add('note-wrapper');

  const noteTitleContainer = document.createElement('div');
  noteTitleContainer.classList.add('title-container');

  userNoteTitle = document.createElement('input');
  userNoteTitle.classList.add("user-input");
  userNoteTitle.placeholder = "Enter note title";

  const userMainContentContainer = document.createElement('div');
  userMainContentContainer.classList.add('main-note');

  userMainNote = document.createElement('textarea');
  userMainNote.className = 'main-note';
  userMainNote.classList.add("user-input");
  userMainNote.rows = 50;
  userMainNote.cols = 180;
  userMainNote.placeholder = 'Write your daily accomplishments and reflections here...';

  noteModal.appendChild(noteWrapper);
  noteWrapper.appendChild(noteTitleContainer);
  noteTitleContainer.appendChild(userNoteTitle);
  noteWrapper.appendChild(userMainContentContainer);
  userMainContentContainer.appendChild(userMainNote);

  currentNoteId = null; 
}
/*---------- The save function.----------*/
function saveNoteHandler() {
  if (typeof localStorage === "undefined") {
    alert("Your browser doesn't support local storage!");
    return;
  }

  const userNoteTitleValue = userNoteTitle.value;
  const userMainNoteValue = userMainNote.value;
  
  if (!userNoteTitleValue || !userMainNoteValue) {
    alert("Please enter both a title and a note.");
    return;
  }
  
  const uniqueId = currentNoteId || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const savedItem = {
    id: uniqueId,
    title: userNoteTitleValue,
    note: userMainNoteValue
  };
  
  const listIDs = JSON.parse(localStorage.getItem("listIDs")) || [];
  if (!listIDs.includes(uniqueId)) {
    listIDs.push(uniqueId);
  }
  localStorage.setItem(`Note${uniqueId}`, JSON.stringify(savedItem));
  localStorage.setItem("listIDs", JSON.stringify(listIDs));
  alert("Note saved successfully!");
  updateNoteList();
}

/*---------- The read function.----------*/
function readNoteHandler(id) {
  const savedItem = JSON.parse(localStorage.getItem(`Note${id}`));
  createNote(); 
  userNoteTitle.value = savedItem.title;
  userMainNote.value = savedItem.note;
  currentNoteId = id; 
}

/*---------- The edit function.----------*/
function editNoteHandler(id) {
  readNoteHandler(id);
}
/*---------- The delete function----------*/
function deleteNoteHandler(id) {
  localStorage.removeItem(`Note${id}`);
  const listIDs = JSON.parse(localStorage.getItem("listIDs")) || [];
  const updatedListIDs = listIDs.filter(noteId => noteId !== id);
  localStorage.setItem("listIDs", JSON.stringify(updatedListIDs));
  currentNoteId = null;
  alert("Note deleted successfully!");
  updateNoteList();
}

/*---------- The function to update user notes. ----------*/
function updateNoteList() {
  const listIDs = JSON.parse(localStorage.getItem("listIDs")) || [];
  const saveNoteList = document.querySelector('.save-note-container');
  saveNoteList.innerHTML = ''; 
  listIDs.forEach(id => {
    const savedItem = JSON.parse(localStorage.getItem(`Note${id}`));
    const noteListItem = document.createElement('div');
    noteListItem.classList.add('note-item');
    noteListItem.innerHTML = `
      <h3>${savedItem.title}</h3>
      <p>${savedItem.note}</p>
      <div id="note-icon">
      <img class="functional-icons read" onclick="readNoteHandler('${id}')" src="./images/read.svg">
      <img class="functional-icons edit" onclick="editNoteHandler('${id}')" src="./images/edit.svg">
      <img class="functional-icons delete" onclick="deleteNoteHandler('${id}')" src="./images/delete.svg">
      </div>
      `;
    saveNoteList.appendChild(noteListItem);
  });
}

updateNoteList();





   














