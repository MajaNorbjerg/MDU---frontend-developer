"use strict"; // to enable strict mode and modern JavaScript functionality

// appends a string to the DOM
document.querySelector("#content").innerHTML = "Hi Frontenders!";

// declaring teacher objects

// let teachers = {}

let teacher1 = {
  name: 'Birgitte',
  initials: 'bki',
  position: 'Lecturer',
  adress: 'Ringvej Syd 104, 8260 Viby J',
  mail: 'bki@baaa.dk',
  img: "https://www.baaa.dk/media/u4gorzsd/birgitte-kirk-iversen2.jpg"
};

let teacher2 = {
  name: 'Rasmus',
  initials: 'race',
  position: 'Lecturer',
  adress: 'Ringvej Syd 104, 8260 Viby J',
  mail: 'race@baaa.dk',
  img: "https://www.baaa.dk/media/devlvvgj/rasmus-cederdorff.jpg"
};

let teacher3 = {
  name: 'Kim',
  initials: 'kije',
  position: 'Lecturer',
  adress: 'Ringvej Syd 104, 8260 Viby J',
  mail: 'kije@baaa.dk',
  img: "https://www.baaa.dk/media/3zihz21l/kim-elkjaer-marcher-jepsen.jpg"
}

// logs the teacher objects to the console
console.log(teacher1);
console.log(teacher2);
console.log(teacher3);

function insertText (teacher){
document.getElementById("grid-teachers").innerHTML += 
"<section>" + '<img alt="' + teacher.name + '" src="' + teacher.img + '"></img>' +
"<h3>" + teacher.name + "</h3>" + "<p>" + teacher.initials + "</p>" +
teacher.position + "<br>" +
"<a href='mailto:" + teacher.mail + "'>" + teacher.mail + "</a>" +
"<p>" + teacher.adress + "</p>" +
"</section>";
};

insertText(teacher1);
insertText(teacher2);
insertText(teacher3);

function showAlert() {
  alert('Open your Developer Console!');
}