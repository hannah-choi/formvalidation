const submitButton = document.querySelector(".submit");
const form = document.getElementById("form");
const username = form.username;
const email = form.email;
const password1 = form.password1;
const password2 = form.password2;
const formControls = document.querySelectorAll(".form-control");

const showMessage = (input, message) => {
    input.parentElement.classList.add("error");
    input.parentElement.lastElementChild.textContent = message;
    setTimeout(() => {
        input.parentElement.classList.remove("error");
    }, 3000);
};

const showSuccess = input => {
    input.parentElement.classList.add("success");
};

const checkEmail = input => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
        showSuccess(input);
    } else {
        showMessage(input, "Email format is invalid");
    }
};

const checkLength = (input, min, max) => {
    if (input.value.length < min || input.value.length > max) {
        showMessage(
            input,
            `${getName(input)} should be in between 4 - 12 characters`
        );
    } else {
        showSuccess(input);
    }
};

const checkPw = (password1, password2) => {
    if (password1.value !== password2.value) {
        showMessage(password1, "Password aren't matching");
    } else {
        showSuccess(password1);
    }
};

const isRequired = inputArray => {
    inputArray.map(input => {
        if (!input.value) {
            input.parentElement.classList.add("error");
            input.parentElement.lastElementChild.textContent = `${getName(
                input
            )} is required`;
            setTimeout(() => {
                input.parentElement.classList.remove("error");
            }, 4000);
        }
    });
};

const getName = input => {
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
};

submitButton.addEventListener("click", e => {
    e.preventDefault();
    isRequired([username, email, password1, password2]);
    checkLength(username, 4, 13);
    checkLength(password1, 8, 17);
    checkEmail(email);
});
