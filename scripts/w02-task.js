/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
let fullName = "Joseph Oliva";
let currentYear = "23";
let profilePicture = 'images/josephvisa.png';

/* Step 3 - Element Variables */
const nameElement = document.getElementById("name");
const foodElement =document.getElementById("food");
const yearElement = document.querySelector('#year');
const imageElement = document.getElementsByName("images/josephvisa.png");


/* Step 4 - Adding Content */
nameElement.innerHTML =`<strong>${fullName}</strong>`;
document.body.appendChild(nameElement);
yearElement.textContent("currentYear");
document.body.appendChild(yearElement);
imageElement.setAttribute('src', "profilePicture");
document.body.appendChild(imageElement);
imageElement.setAttribute('alt', `Profile image of ${fullName}`);



/* Step 5 - Array */

let favoriteFoods = [Pizza, Tacos, Soup, cheesecake, cakepop,];

foodElement.innerHTML = (favoriteFoods);
let fav2 = [Cookies];
favoriteFoods.push('Cookies');
foodElement.innerHTML += `<br>${favoriteFoods}`;
favoriteFoods.splice(0, 1);
document.body.appendChild`<br>${favoriteFoods}`;
favoriteFoods.pop();
foodElement.innerHTML += `<br>${favoriteFoods}`;


