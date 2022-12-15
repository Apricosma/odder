'use strict';

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

let suggestions = select('.user-suggestion');
let suggestionContainer = select('.suggested-users');

const url = 'https://randomuser.me/api/?nat=CA&results=5';

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    mode: 'cors'
};

// fetch(url, options)
//     .then(response => response.json())
//     .then(json => json.results)
//     .then(console.log)
//     .catch(console.error)

async function getUsers() {
    try {
        const users = await fetch(url, options);
        let data = await users.json();
        return data.results;
    } catch(error) {
        console.log(error);
    }
}

async function printUsers() {
    try {
        let userData = await getUsers()
        console.log(userData);
        userData.forEach(user => {
            let element = document.createElement('div');
            element.classList.add('user-div');
            suggestions.appendChild(element);

            let userImage = document.createElement('img');
            userImage.src = user.picture.thumbnail;
            element.appendChild(userImage);

            let userName = document.createElement('h2');
            element.appendChild(userName);
            userName.innerHTML = `${user.name.first} ${user.name.last}`;

            let userLocation = document.createElement('p');
            element.appendChild(userLocation);
            userLocation.innerHTML = `${user.location.city}`
        });
    } catch(error) {
        console.log(error);
    }
}

printUsers();