"use strict";
let $ = document;

const wrapper = $.querySelector(".form-wrapper"),
    changeToSigUpBtn = $.querySelector(".sigUp"),
    changeToLoginBtn = $.querySelector(".login"),
    loginForm = $.getElementById("login-form"),
    signupForm = $.getElementById("signup"),
    usernameElement = $.getElementById("username"),
    passwordElement = $.getElementById("password"),
    signupUsernameELem = $.getElementById("sign-up_username"),
    emailElem = $.getElementById("userEmail"),
    signupPassELem = $.getElementById("sign-up_password"),
    confrimPassELem = $.getElementById("confrimPass");

let UnamePattern = /^[a-zA-Z][a-zA-z0-9-_]{4,11}$/,
    validationPassword = 0,
    isLogin = false;

changeToSigUpBtn.addEventListener("click", event => {
    event.preventDefault();
    wrapper.classList.add("chenge");
});

changeToLoginBtn.addEventListener("click", event => {
    event.preventDefault();
    wrapper.classList.remove("chenge");
});

function isUnameValidation(event) {
    if (UnamePattern.test(event.target.value)) {
        event.target.classList.add("valid");
        event.target.classList.remove("invalid");
    } else {
        event.target.classList.remove("valid");
        event.target.classList.add("invalid");
    };
}

function isPassValidation(event) {
    let passwordVal = event.target.value;
    validationPassword = 0;

    (passwordVal.length > 8) && validationPassword++;
    (/[a-z]/.test(passwordVal)) && validationPassword++;
    (/[A-Z]/.test(passwordVal)) && validationPassword++;
    (/[\W]+/.test(passwordVal)) && validationPassword++;
    (/[\0-9]/.test(passwordVal)) && validationPassword++;

    if (validationPassword === 5) {
        event.target.classList.add("valid");
        event.target.classList.remove("invalid");
    } else {
        event.target.classList.add("invalid");
    }
}

usernameElement.addEventListener("keyup", isUnameValidation);
passwordElement.addEventListener("keyup", isPassValidation);
signupUsernameELem.addEventListener("keyup", isUnameValidation);
signupPassELem.addEventListener("keyup", isPassValidation);
confrimPassELem.addEventListener("keyup", isPassValidation);

const clearInputs = (formElem) => {
    formElem.querySelectorAll("input").forEach(element => {
        element.value = "";
    });
}

// -------------- > conect to server
// login form submit event

loginForm.addEventListener("submit", event => {
    event.preventDefault();
    clearInputs(event.target);
});

// signup form submit event
signupForm.addEventListener("submit", async event => {
    event.preventDefault();

    let userData = {
        username: signupUsernameELem.value.trim(),
        email: emailElem.value.trim(),
        password: signupPassELem.value
    };

    fetch("(API address)", {
        method: "POST",
        headers: {
            "Content-type": "aplication/json",
        },
        body: JSON.stringify(userData),
    }).then(response => {
        console.log(response);
    })
        .catch(err => {
            console.log(err);
        })

    clearInputs(event.target);
});