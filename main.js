const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
let name = document.getElementById("name");
let today = document.getElementById("today");

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  const tile = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${tile}`;
  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

//set background
function setBackground() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 12) {
    //morning
    document.body.style.backgroundImage = "url('../images/black.jpg')";
    greeting.textContent = "Good Morning";
  } else if (hour < 18) {
    //afternoon
    document.body.style.backgroundImage = "url('../images/yellow.jpg')";
    greeting.textContent = "Good Afternoon";
  } else {
    //evening
    document.body.style.backgroundImage = "url('../images/blue.jpg')";
    greeting.textContent = "Good Evening";
  }
}

//get name
function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}
//set name
function setName(e) {
  if (e.type === "keypress") {
    //make sure press enter
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
}

//quotes
function getapi() {
  fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
      "x-rapidapi-key": "7d19907b97mshd87e0b5c0e9a773p1ff321jsnff5fddb38cd5",
    },
  })
    .then((response) => response.json())
    .then((data) => (today.textContent = data.content));
}

today.textContent = getapi();

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);

showTime();
setBackground();
getName();
