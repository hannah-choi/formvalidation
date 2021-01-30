const submitButton = document.querySelector(".submit");
const form = document.getElementById("form");
const username = form.username;
const email = form.email;
const password1 = form.password1;
const password2 = form.password2;
const formControls = document.querySelectorAll(".form-control");
const success = document.getElementsByClassName("success");

const isRequired = elements => {
    elements.map(el => {
        if (!el.value) {
            showError(el, ` is required`);
        }
    });
};

const emailCheck = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(email.value) ? showSuccess(email) : showError(email, " is invalid");
};

const showError = (el, message) => {
    el.parentElement.classList.remove("success");
    el.parentElement.classList.add("error");
    el.parentElement.querySelector("small").innerHTML =
        `${getName(el.name)}` + message;
    setTimeout(() => {
        el.parentElement.classList.remove("error");
    }, 3000);
};

const showSuccess = el => {
    if (!el.parentElement.classList.contains("error")) {
        el.parentElement.classList.add("success");
    }
};

const lengthCheck = (el, min, max) => {
    if (el.value.length < min) {
        showError(el, ` should be longer than ${min}`);
    } else if (el.value.length > max) {
        showError(el, ` shouldn't be longer than ${max}`);
    } else {
        el.parentElement.classList.add("success");
    }
};

const passwordMatch = (password1, password2) => {
    if (password1.value && password1.value !== password2.value) {
        showError(password1, "s do not match");
    } else {
        showSuccess(password1);
    }
};

const getName = name => {
    if (name === "password1" || name === "password2") {
        return "Password";
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
};

submitButton.addEventListener("click", e => {
    e.preventDefault();
    isRequired([username, email, password1, password2]);
    lengthCheck(username, 4, 12);
    lengthCheck(password1, 8, 16);
    emailCheck(email);
    passwordMatch(password1, password2);
    console.log(success.length);
    if (success.length > 2) {
        setTimeout(() => {
            alert("Succesfully registered!");
            Array.from(success).forEach(el => el.classList.remove("success"));
            form.reset();
        }, 500);
    }
});
