const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

/* This function goes over all the notes inside the local storage*/
getNotes().forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  appEl.insertBefore(noteEl, btnEl);
});

/* The arguements "id" and "content" were passed into
the createNoteEl function through the addNote function.*/
function createNoteEl(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this Note?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element; /* This is the output of the function. 
  Without this the code won't run */
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNote(notes);
  appEl.removeChild(element);
}

function updateNote(id, content) {
  const notes = getNotes();
  /* The filter method goes over each note 
  and checks if the id matches the arguement id we passed*/
  const target = notes.filter((note) => note.id == id)[0];
  target.content = content;
  saveNote(notes);
}

function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(
      Math.random() * 100000
    ) /* Adds a random id and empty content to the noteObj*/,
    content: "",
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl); /* Inserts the note element
  into the dom before the button element */

  notes.push(noteObj);
  saveNote(notes);
}

function saveNote(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

/* Triggers the addNote function upon click. */
btnEl.addEventListener("click", addNote);
