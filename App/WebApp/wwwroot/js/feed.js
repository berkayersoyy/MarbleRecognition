let feedInput = document.getElementById("feed-search-input-content");

function focusElement() {
    document.getElementById("feed-search-input").focus();
}
feedInput.addEventListener('click', focusElement);