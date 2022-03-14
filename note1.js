let btn = document.getElementById('addbtn');
let txt = document.getElementById('addtxt');
let title = document.getElementById('addtitle');

btn.addEventListener('click', function () {
    let prevtxt = JSON.parse(localStorage.getItem('texts'));
    let prevtitle = JSON.parse(localStorage.getItem('titles'));

    let txt_arr = [];
    let title_arr = [];

    if (prevtxt != null || prevtitle != null) {
        txt_arr = prevtxt;
        title_arr = prevtitle;
    }

    txt_arr.push(txt.value);
    title_arr.push(title.value);

    localStorage.setItem('texts', JSON.stringify(txt_arr));
    localStorage.setItem('titles', JSON.stringify(title_arr));

    shownotes();
});

function shownotes() {
    let notes = document.getElementById('notes');

    let prevtxt = JSON.parse(localStorage.getItem('texts'));
    let prevtitle = JSON.parse(localStorage.getItem('titles'));

    console.log(prevtxt);
    console.log(prevtitle);

    let html = '';

    if (prevtxt == null || prevtitle == null || prevtxt.length == 0) {
        html = 'Sorry, First create a note !!!!!';
    }
    else {
        prevtxt.forEach(function (element, index) {
            html += `<div class="noteCard Note bg-transparent my-2 mx-2 card" style="width: 15rem;">
              <div class = "card-body">
              <h5 class="card-title">${prevtitle[index]}</h5>
              <p class="card-text">${element}</p>
              <button style="margin-top: 10px;width:8rem" class="btn btn-primary" onclick = "deletenote(event)" id="${index + 1}">Delete note</button>
              </div>
          </div>`
        });
    }

    notes.innerHTML = html;

    txt.value = '';
    title.value = '';
}

function deletenote(e) {
    let delbtn = e.target.id;
    console.log(delbtn);

    let prevtxt = JSON.parse(localStorage.getItem('texts'));
    let prevtitle = JSON.parse(localStorage.getItem('titles'));

    prevtxt.forEach(function (element, index) {
        if (index == delbtn-1) {
            prevtxt.splice(index,1);
            prevtitle.splice(index,1);

            console.log();

            localStorage.setItem('texts', JSON.stringify(prevtxt));
            localStorage.setItem('titles', JSON.stringify(prevtitle));
        }
    })
    shownotes();
}

let searchtxt = document.getElementById('searchtxt');
console.log(searchtxt);
let cards = document.getElementsByClassName('Note');
console.log(cards);


searchtxt.addEventListener('input',function(){
   console.log(searchtxt.value);
   let count = 0;
   Array.from(cards).forEach(function(element){
       console.log(element);
       let text = element.querySelector('.card-text').innerHTML;
       let title = element.querySelector('.card-title').innerHTML;
       console.log(text);console.log(title);

       if(text.includes(searchtxt.value) || title.includes(searchtxt.value)){
          element.style.display = 'block';
       }
       else{
          element.style.display = 'none';
          count++;
       }
   })
   if(count == Array.from(cards).length){
     let notes = document.getElementById('notes');
     notes.innerHTML = `<h4>Not found</h4>`;
   }
   
   if(searchtxt.value == '')
    shownotes();
})

shownotes();
