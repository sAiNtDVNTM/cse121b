/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
const fullName = "Joseph Oliva";
const currentYear = new Date().getFullYear();
const profilePicture = "images/josephvisa.png";

/* Step 3 - Element Variables */
const nameElement = document.getElementById("name");
const foodElement = document.getElementById("food");
const yearElement = document.querySelector("#year");
const imageElement = document.getElementsByTagName("img")[0];


/* Step 4 - Adding Content */
nameElement.innerHTML =`<strong>${fullName}</strong>`;
yearElement.textContent = currentYear;
imageElement.setAttribute('src', profilePicture);
imageElement.setAttribute('alt', `Profile image of ${fullName}`);



/* Step 5 - Array */

let favoriteFoods = ["Pizza", "Tacos", "Soup", "Cheesecake", "Cakepop",];

foodElement.textContent = favoriteFoods;

let fav2 = ["Cookies"];
favoriteFoods.push("Cookies");
foodElement.innerHTML += `<br>${favoriteFoods}`;
favoriteFoods.splice(0, 1);
foodElement.innerHTML += `<br>${favoriteFoods}`;
favoriteFoods.pop();
foodElement.innerHTML += `<br>${favoriteFoods}`;
