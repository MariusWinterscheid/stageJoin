function loadStartScreen() {
    changePasswordIcon();
    renderLogInBtn();
}

window.addEventListener('load', () => {
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', () => {
        window.history.pushState(null, '', window.location.href);
    });
});

let startScreenLogo = document.getElementById('startScreenLogo');
let startScreenLogoFixed = document.getElementById('startScreenLogoFixed');
let logInContent = document.getElementById('logInContent');
let startScreenContainer = document.getElementById('startScreenContainer');

document.addEventListener('DOMContentLoaded', function () {
    if (!sessionStorage.getItem("start-Animation")) {
        startScreenLogoFixed.classList.add('d-none');
        logInContent.style.animation = 'none';
        startLogInAnimation();
    } else {
        startScreenContainer.classList.add('d-none');
        startScreenLogo.classList.add('d-none');
    }
})

function startLogInAnimation() {
    const logoSlideTimeOut = setTimeout(slideToCorner, 300);
    const logoChangeTimeOut = setTimeout(changeLogo, 550);
    startScreenContainer.classList.add('changeBgColor');
    startScreenLogo.classList.remove('d-none');
    setTimeout(function () {
        startScreenContainer.classList.add('d-none');
        startScreenLogo.classList.add('d-none');
        startScreenLogoFixed.classList.remove('d-none');
    }, 1000);
    sessionStorage.setItem("start-Animation", JSON.stringify('animation'));
}

function slideToCorner() {
    document.getElementById('startScreenLogo').classList.add('slideToCorner');
}

function changeLogo() {
    document.getElementById('startScreenLogo').src = '/assets/img/join_logo.png';
}

let logInMailInput = document.getElementById('logInMailInput');
let logInPasswordInput = document.getElementById('logInPasswordInput');
let logInCheckBox = document.getElementById('logInCheckBox');
let logInMessageBox = document.getElementById('logInMessageBox');

function logInFailed() {
    logInMailInput.classList.add('formInputWrong');
    logInPasswordInput.classList.add('formInputWrong');
    logInMessageBox.innerHTML = 'Ups! Wrong Email or Password. Try again.';
}

function logInIsCorrected() {
    logInMailInput.classList.remove('formInputWrong');
    logInPasswordInput.classList.remove('formInputWrong');
    logInMessageBox.innerHTML = '';
}

function changePasswordIcon() {
    let passwordIcon = document.getElementById('passwordIcon');
    if (logInPasswordInput.value <= 0) {
        passwordIcon.src = '/assets/icon/lock.png';
        passwordIcon.classList.remove('noVisibilityIcon');
        passwordIcon.classList.remove('visibilityIcon');
        passwordIcon.classList.add('img_diabled');
    } else {
        passwordIcon.src = '/assets/icon/visibility_off.png';
        passwordIcon.classList.add('noVisibilityIcon');
        passwordIcon.classList.remove('img_diabled');
    }
}

function showPassword() {
    let passwordIcon = document.getElementById('passwordIcon');
    if (logInPasswordInput.type === "password") {
        logInPasswordInput.type = "text";
        passwordIcon.src = '/assets/icon/visibility.png';
        passwordIcon.classList.add('visibilityIcon');
    } else {
        logInPasswordInput.type = "password";
        passwordIcon.src = '/assets/icon/visibility_off.png';
        passwordIcon.classList.remove('visibilityIcon');
    }
}

function renderLogInBtn() {
    let logInBtn = document.getElementById('logInBtn');
    if (logInMailInput.value <= 0 || logInPasswordInput.value <= 0) {
        logInBtn.disabled = true;
        logInBtn.classList.add('btn_disabled');
    } else {
        logInBtn.disabled = false;
        logInBtn.classList.remove('btn_disabled')
    }
}

function setLoginCookie(email, password) {
    if (logInCheckBox.checked) {
        document.cookie = `email=${email}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        document.cookie = `password=${password}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    } else {
        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'password=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

}

function fillLoginForm() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'email') {
            logInMailInput.value = decodeURIComponent(value);
        } else if (name === 'password') {
            logInPasswordInput.value = decodeURIComponent(value);
            logInCheckBox.checked = true;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fillLoginForm();
});
