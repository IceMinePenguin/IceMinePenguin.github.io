archive = JSON.parse(localStorage.getItem("archive"));
if (archive == [] || archive == "" || archive == null) {
  localStorage.setItem("archive", JSON.stringify([]));
  archive = JSON.parse(localStorage.getItem("archive"));
}

container = document.getElementsByClassName("container")[0];


for (let i = 0; i < archive.length; i++) {
  // create note
  newNote = document.createElement("div");
  newNote.id = i;

  // create text of note
  noteText = document.createElement("div");
  noteText.innerText = archive[i];

  // create remove button for note
  noteButton = document.createElement("button");
  noteButton.innerText = "X";
  noteButton.onclick = function removeItem() {
    id = this.parentNode.id;

    archive.splice(id, 1);

    localStorage.setItem("archive", JSON.stringify(archive));
    location.reload();
  };

  newNote.appendChild(noteText);
  newNote.appendChild(noteButton);
  
  container.firstElementChild.appendChild(newNote);
}
