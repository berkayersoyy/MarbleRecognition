let menuOpenIcon = document.getElementById("hamburger-wrapper");
let menuCloseIcon = document.getElementById("close-hamburger-menu-image-wrapper");
let menu = document.getElementById("hamburger-menu-wrapper");
let background = document.getElementById("hamburger-menu-background");
var body = document.body,
    html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );
background.style.height = height + "px";

function disableScroll() {
    let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function() {
        window.scrollTo(LeftScroll, TopScroll);
    };
}

function enableScroll() {
    window.onscroll = function() {};
}

function openMenu(){
    menu.classList.add("hamburger-menu-wrapper-open");
    background.style.display = "block";
    document.getElementsByTagName("body")[0].classList.add('stop-scrolling');
    disableScroll();
}
function closeMenu(){
    menu.classList.remove("hamburger-menu-wrapper-open");
    background.style.display = "none";
    document.getElementsByTagName("body")[0].classList.remove('stop-scrolling');
    enableScroll();
}
menuOpenIcon.addEventListener("click",openMenu)
menuCloseIcon.addEventListener("click",closeMenu)