console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', (e) => {
    let addTxt = document.getElementById('addTxt'); //for text
    let addTitle = document.getElementById('addTitle'); // for title

    let notes = localStorage.getItem("notes"); // retrieving notes
    let noteTitle = localStorage.getItem("notesTitle"); // retrieving title
    

    if (notes == null) {
        notesObj = [];
        notesObjTitle = [];
    }
    else {
        notesObj = JSON.parse(notes); //JSON.parse(obj) --> It will make obj as object
        notesObjTitle = JSON.parse(noteTitle);
    }

    notesObj.push(addTxt.value);
    notesObjTitle.push(addTitle.value);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("notesTitle", JSON.stringify(notesObjTitle));


    addTxt.value = "";
    addTitle.value = "";

    // console.log(notesObj);
    console.log(notesObjTitle);
    showNotes();
});

// Function to show notes, add it form local storage
function showNotes() {
 
    let notes = localStorage.getItem("notes");
    let noteTitle = localStorage.getItem("notesTitle");
    

    if (notes == null) {
        notesObj = [];
        notesObjTitle = [];
    }
    else {
        notesObj = JSON.parse(notes); //JSON.parse(obj) --> It will make obj as object
        notesObjTitle = JSON.parse(noteTitle);
    }

    let html = "";

    notesObj.forEach((element, index) => {
        html += `<div class="card card2 my-2 mx-3 noteCard" id="Div-${index}"  style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title" id="card-title">${notesObjTitle[index]}</h5>
            <p>${element}</p>
            <a onclick="deleteNote(this.id)" id="${index}" class="btn btn-primary">Delete Notes</a> <br>
            <input type="checkbox" class="impNote" name="checkbox" value="0" id= "Note-${index}" class="my-2">
            <label for="impNoteLabel" class="my-2"> Important</label> <br>
            </div>
            </div>`
    });

    let notesElem = document.getElementById('notes');
    if (notesElem.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show! Use Add a note section above to add notes...`;
    }
}

// Function to delete a note

function deleteNote(index) {
    // console.log("I am deleting");
    let notes = localStorage.getItem("notes");
    let noteTitle = localStorage.getItem("notesTitle");
    

    if (notes == null) {
        notesObj = [];
        notesObjTitle = [];
    }
    else {
        notesObj = JSON.parse(notes); //JSON.parse(obj) --> It will make obj as object
        notesObjTitle = JSON.parse(noteTitle);
    }

    notesObjTitle.splice(index, 1);
    notesObj.splice(index, 1);


    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("notesTitle", JSON.stringify(notesObjTitle));
    // console.log(notesObjTitle);
    
    showNotes();

}

let search = document.getElementById('searchTxt');
search.addEventListener('input', () => {

    inputVal = search.value.toLowerCase();
    console.log("Input event fired!", inputVal);
    let noteCards = document.getElementsByClassName('noteCard');


    Array.from(noteCards).forEach((element) => {

        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        console.log(cardTxt);

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});

let checkbox = document.querySelectorAll("input[type=checkbox]");
Array.from(checkbox).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        let c = document.getElementById(`Div-${index}`);

        // console.log(e.target.checked)

        if(e.target.checked){
            // console.log("true", `Note-${index}`);
            c.style.boxShadow = "0px 0px 12px 7px #9c27b0";
        }
        else{
            c.style.borderColor = "rgb(0 0 0 / 13%)";
            c.style.boxShadow = "0 0 0 0";
        }

       
    });
});