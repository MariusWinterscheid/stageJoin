function loadSignUp() {
    renderSignUpBtn();
    changePasswordIcon();
    changeConfirmPasswordIcon();
}

let signUpNameInput = document.getElementById('signUpNameInput');
let signUpMailInput = document.getElementById('signUpMailInput');
let signUpPasswordInput = document.getElementById('signUpPasswordInput');
let signUpConfirmPasswordInput = document.getElementById('signUpConfirmPasswordInput');
let signUpCheckBox = document.getElementById('signUpCheckBox');
let signUpForm = document.getElementById('signUpForm');
let signUpContainer = document.getElementById('signUpContainer');

function changePasswordIcon() {
    let passwordIcon = document.getElementById('passwordIcon');
    if (signUpPasswordInput.value <= 0) {
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

function changeConfirmPasswordIcon() {
    let confirmPasswordIcon = document.getElementById('confirmPasswordIcon');
    if (signUpConfirmPasswordInput.value <= 0) {
        confirmPasswordIcon.src = '/assets/icon/lock.png';
        confirmPasswordIcon.classList.remove('noVisibilityIcon');
        confirmPasswordIcon.classList.remove('visibilityIcon');
        confirmPasswordIcon.classList.add('img_diabled');
    } else {
        confirmPasswordIcon.src = '/assets/icon/visibility_off.png';
        confirmPasswordIcon.classList.add('noVisibilityIcon');
        confirmPasswordIcon.classList.remove('img_diabled');
    }
}

function showPassword() {
    let passwordIcon = document.getElementById('passwordIcon');
    if (signUpPasswordInput.type === "password") {
        signUpPasswordInput.type = "text";
        passwordIcon.src = '/assets/icon/visibility.png';
        passwordIcon.classList.add('visibilityIcon');
    } else {
        signUpPasswordInput.type = "password";
        passwordIcon.src = '/assets/icon/visibility_off.png';
        passwordIcon.classList.remove('visibilityIcon');
    }
}

function showConfirmPassword() {
    let confirmPasswordIcon = document.getElementById('confirmPasswordIcon');
    if (signUpConfirmPasswordInput.type === "password") {
        signUpConfirmPasswordInput.type = "text";
        confirmPasswordIcon.src = '/assets/icon/visibility.png';
        confirmPasswordIcon.classList.add('visibilityIcon');
    } else {
        signUpConfirmPasswordInput.type = "password";
        confirmPasswordIcon.src = '/assets/icon/visibility_off.png';
        confirmPasswordIcon.classList.remove('visibilityIcon');
    }
}

function renderSignUpBtn() {
    let signUpBtn = document.getElementById('signUpBtn');
    if (signUpNameInput.value <= 0 || signUpMailInput.value <= 0
        || signUpPasswordInput.value <= 0 || signUpConfirmPasswordInput.value <= 0
        || !signUpCheckBox.checked) {
        signUpBtn.disabled = true;
        signUpBtn.classList.add('btn_disabled');
    } else {
        signUpBtn.disabled = false;
        signUpBtn.classList.remove('btn_disabled')
    }
}

function wrongPassword() {
    let signUpMessageBox = document.getElementById('signUpMessageBox');
    let wrongMessage = 'Ups! your password don,t match.';
    signUpMessageBox.innerHTML = wrongMessage.replace(',', '`');
    signUpConfirmPasswordInput.classList.add('formInputWrong');
}

function passwordIsCorrected() {
    if (signUpPasswordInput.value == signUpConfirmPasswordInput.value) {
        signUpConfirmPasswordInput.classList.remove('formInputWrong');
        signUpMessageBox.innerHTML = '';
    }
}

function signedUpSuccessfully() {
    document.getElementById('signedUpBtn').classList.add('signedUpBtnSlide');
    const toLogIn = setTimeout(navToLogIn, 1750);
}

function navToLogIn() {
    window.location.href = 'log_in.html?msg=You Signed Up successfully.';
}
