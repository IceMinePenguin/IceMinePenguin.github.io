let defaultBoard = {'Default': []}

// load data
boards = JSON.parse(localStorage.getItem("boards"));
if (JSON.stringify(boards) == "{}" || boards == null) {
  localStorage.setItem("boards", JSON.stringify(defaultBoard));
  boards = JSON.parse(localStorage.getItem("boards"));
}

selection = document.getElementById("selection");

// add boards to selector
for (board in boards) {
  option = document.createElement("option");
  option.value = board;
  option.innerText = board;
  selection.appendChild(option);
}

// add new board
function addBoard(name) {
  boards[name] = [];
  localStorage.setItem("boards", JSON.stringify(boards))
  location.reload();
}

// delete board and add all items to archive
function deleteBoard(board) {
  if (confirm("are you sure?")) {

    for (note in boards[board]) {
      toArchive(boards[board][note]);
    }
    
    delete boards[board];
    localStorage.setItem("boards", JSON.stringify(boards))
    location.reload();
  }
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

