'use strict'

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

let userNameInput = select('.username'),
    passwordInput = select('.password'),
    loginButton = select('.log-in'),
    signUpButton = select('.sign-up'),
    errorOutput = select('.error')

// LocalStorage username/password
const userCredentials = {
    username: 'samanthawebdev',
    password: 'web_developer'
}
localStorage.setItem('login', JSON.stringify(userCredentials));
let loginInfo = JSON.parse(localStorage.getItem('login'));

onEvent('click', loginButton, function() {

    if (userNameInput.value.length == 0) {
        errorOutput.innerHTML = `Username cannot be empty`
        userNameInput.style.border = '1px solid var(--app-red)'
        return;
    }

    if (passwordInput.value.length == 0) {
        errorOutput.innerHTML = `Password cannot be empty`
        passwordInput.style.border = '1px solid var(--app-red)'
        return;
    }

    // check both
    if (userNameInput.value.length == 0 && 
        passwordInput.value.length == 0) {
            errorOutput.innerHTML = `Please enter login credentials`
            userNameInput.style.border = '1px solid var(--app-red)'
            passwordInput.style.border = '1px solid var(--app-red)'
            return;
    }

    // invalid credentials
    if (userNameInput.value.trim() !== loginInfo.username ||
        passwordInput.value.trim() !== loginInfo.password)
            errorOutput.innerHTML = `Incorrect login`

    // correct login
    if (userNameInput.value.trim() === loginInfo.username &&
        passwordInput.value.trim() === loginInfo.password) {
        location.href = 'home.html';
    }
})

// on enter IF text box is active, click login button
userNameInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter')
        loginButton.click();
})
passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter')
        loginButton.click();
})