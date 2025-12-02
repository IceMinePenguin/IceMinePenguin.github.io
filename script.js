let defaultBoard = {'Default': []}

// load data from storage
boards = JSON.parse(localStorage.getItem("boards"));
if (JSON.stringify(boards) == "{}" || boards == null) {
  localStorage.setItem("boards", JSON.stringify(defaultBoard));
  boards = JSON.parse(localStorage.getItem("boards"));
}

// get elements
selection = document.getElementById("selection");
container = document.getElementsByClassName("container")[0];

// add board to page
function addBoard(name) {
  // make option in selector
  option = document.createElement("option");
  option.value = name;
  option.innerText = name;
  selection.appendChild(option);

  board = document.createElement("div");

  title = document.createElement("span");
  title.innerText = name;

  board.appendChild(title)
  
  boardData = boards[name];

  for (let i = 0; i < boardData.length; i++) {
    // create note
    newNote = document.createElement("div");
    newNote.id = name + "-" + i;

    // create text of note
    noteText = document.createElement("div");
    noteText.innerText = boards[name][i];

    // create remove button for note
    noteButton = document.createElement("button");
    noteButton.innerText = "X";
    noteButton.onclick = function removeItem() {
      id = this.parentNode.id;
      splitId = id.split("-", -1)
      index = splitId.at(-1);

      // pull board name out of id
      boardName = "";
      for (let i = 0; i < (splitId.length - 1); i++) {
        boardName += splitId[i]
      }

      // send note text to archive
      toArchive(boards[boardName][index]);

      board = boards[boardName];
      board.splice(index, 1);
      boards[boardName] = board;

      localStorage.setItem("boards", JSON.stringify(boards));
      location.reload();
    };

    newNote.appendChild(noteText);
    newNote.appendChild(noteButton);
    
    board.appendChild(newNote);
  }
  
  container.appendChild(board);
}

// add item to board
function addItem(value, board) {
  boards[board].push(value);
  localStorage.setItem("boards", JSON.stringify(boards));
  location.reload();
}

// add item to archive
function toArchive(value) {
  archive = JSON.parse(localStorage.getItem("archive"));
  if (archive == [] || archive == "" || archive == null) {
    localStorage.setItem("archive", JSON.stringify([]));
    archive = JSON.parse(localStorage.getItem("archive"));
  }
  archive.push(value);
  localStorage.setItem("archive", JSON.stringify(archive));
}

// loop through each board
for (const [key, value] of Object.entries(boards)) {
  addBoard(key);
}
