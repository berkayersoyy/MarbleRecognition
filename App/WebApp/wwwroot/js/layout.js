//DESKTOP - TABLET
let element = document.getElementById("nav-search-wrapper");
let input = document.getElementById("nav-search-input");
let inputLogo = document.getElementById("nav-search-input-logo");

function focused() {
    element.style.border = '2px solid var(--main-dodger-blue)';
    inputLogo.style.fill = 'var(--main-dodger-blue)';
    inputLogo.style.stroke = 'var(--main-dodger-blue)';
}

function notFocused() {
    element.style.border = '2px solid var(--greyscale-gainsboro)';
    inputLogo.style.fill = '#A0A3BD';
    inputLogo.style.stroke = '#A0A3BD';
}

input.addEventListener('focus', focused);

input.addEventListener('blur', notFocused);
let navInput = document.getElementById("nav-search-input-wrapper");

function focusElement() {
    document.getElementById("nav-search-input").focus();
}

navInput.addEventListener('click', focusElement);


//MOBILE

let elementMobile = document.getElementById("nav-mobile-search-wrapper");
let inputMobile = document.getElementById("nav-mobile-search-input");
let inputLogoMobile = document.getElementById("nav-mobile-search-input-logo");

function focusedMobile() {
    elementMobile.style.border = '1px solid var(--main-dodger-blue)';
    inputLogoMobile.style.fill = 'var(--main-dodger-blue)';
    inputLogoMobile.style.stroke = 'var(--main-dodger-blue)';
}

function notFocusedMobile() {
    elementMobile.style.border = '1px solid var(--greyscale-gainsboro)';
    inputLogoMobile.style.fill = '#A0A3BD';
    inputLogoMobile.style.stroke = '#A0A3BD';
}

inputMobile.addEventListener('focus', focusedMobile);

inputMobile.addEventListener('blur', notFocusedMobile);
let navInputMobile = document.getElementById("nav-mobile-search-input-wrapper");

function focusElementMobile() {
    document.getElementById("nav-mobile-search-input").focus();
}

navInputMobile.addEventListener('click', focusElementMobile);