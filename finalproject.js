function addNote() {

    let inputValue = document.getElementById("task").value;
    let inputValue2 = document.getElementById("date").value;

    const noteObj = { task: inputValue, date: inputValue2,  };

    
    if (inputValue==="") {
        alert("Please Enter A Task");
    } else if(inputValue2==="") {
        alert("Please Enter a Due Date");

    }  else {
    createNote([noteObj]);
    }

    addNotesToLocalStorage([noteObj]);

    clearForm();

}

function createNote(stickyNotesArr) {
    if (stickyNotesArr) {

        for (let i = 0; i < stickyNotesArr.length; i++) {

            const notesContainer = document.getElementsByClassName("notesContainer")[0];
            const notesRow = document.getElementsByClassName("notesRow")[0];

            const stickyDiv = document.createElement("div");
            stickyDiv.setAttribute("class", "stickynote col-sm-2");

            const note = document.createElement("p");
            note.setAttribute("class", "stickytask");
            note.innerText = stickyNotesArr[i].task;

            const note2 = document.createElement("p");
            note2.setAttribute("class", "stickydate");
            note2.innerText = stickyNotesArr[i].date ;

            const dateAndTime = document.createElement("div");

            const btnClose = document.createElement("span");
            btnClose.setAttribute("class", " btn-close ");
            btnClose.setAttribute("onclick", "fade(this.parentElement);")
            btnClose.setAttribute("slot", i);
            btnClose.onclick = function () {
                deleteNote(this);


            }
            

            notesContainer.appendChild(notesRow);
            notesRow.appendChild(stickyDiv);
            stickyDiv.appendChild(note);
            stickyDiv.appendChild(note2);
            stickyDiv.appendChild(btnClose);
            note2.appendChild(dateAndTime);

        }
        
    }
    
}

function addNotesToLocalStorage(noteObj) {

    const stickyInfoArray = new Array();
    const currentInStorage = JSON.parse(localStorage.getItem("notesArr"));

    if (localStorage.getItem("notesArr")) {
        for (let i = 0; i < currentInStorage.length; i++) {
            stickyInfoArray.push(currentInStorage[i]);
        }
    }

    stickyInfoArray.push(noteObj[noteObj.length - 1]);

    localStorage.setItem("notesArr", JSON.stringify(stickyInfoArray));
}

function stickyOnLoad() {

    const currentInStorage = JSON.parse(localStorage.getItem("notesArr"));

    if (currentInStorage) {

        createNote(currentInStorage);

    }
}

function deleteNote(objToDelete) {
    const currentSaved = JSON.parse(localStorage.getItem("notesArr"));

    if (currentSaved.length == 1) {
        localStorage.removeItem("notesArr");
    }

    else {
        currentSaved.splice(objToDelete.slot, 1);
        const newCleanArr = JSON.stringify(currentSaved);
        localStorage.setItem("notesArr", newCleanArr);
    }

    fade(objToDelete.parentElement);
}

function fade(element) {
    let op = 1;  
    let timer = setInterval(function () {

        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }

        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;

    }, 50);
}

function clearForm() {
    document.getElementById('form').reset();
}


