/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: "Joseph Oliva",
    photo: "images/josephvisa.png",
    favoriteFoods: [
        "Pizza",
        "Beef Soup",
        "Tacos",
        "Quesadilla",
        "BBQ ribs",
        "Chicken cream soup"
    ],
    hobbies: [
        "Play Apex",
        "Listen Rage Rap",
        "Play Soccer",
        "Roller blading",
        "Programing",
        "Play with my Dog",
        "Play the bass"
    ],
    placesLived: [],
};
/* Populate Profile Object with placesLive objects */

myProfile.placesLived.push(
    {
        place: "Peru Iquitos, Loretto",
        length: "1 year"
    },
    {
        place: "Peru Tarapoto, San Martin",
        length: "7 months"
    },
    {
        place: "Peru Pucallpa, Ucayali",
        length: "6 months"
    },
    {
        place: "Freehold Township, NJ",
        length: "4 months"
    },
    {
        place: "Guatemala, Guatemala",
        length: "20 years"
    }
);

/* DOM Manipulation - Output */

/* Name */
const output = document.querySelector("#name").textContent = myProfile.name;
/* Photo with attributes */
const photo = document.querySelector("#photo");
photo.setAttribute("src", myProfile.photo);
photo.setAttribute("alt", myProfile.name);
/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food => {
    let li =document.createElement("li");
    li.textContent = food;
    document.querySelector("#favorite-foods").appendChild(li);
})
/* Hobbies List */
myProfile.hobbies.forEach(hobbie => {
    let li = document.createElement("li");
    li.textContent = hobbie;
    document.querySelector("#hobbies").appendChild(li);
})

/* Places Lived DataList */
myProfile.placesLived.forEach(places => {
    let dt = document.createElement("dt");
    dt.textContent = places.place;
    document.querySelector("#places-lived").appendChild(dt);
    let dd = document.createElement("dd");
    dd.textContent = places["length"];
    document.querySelector("#places-lived").appendChild(dd);
})



