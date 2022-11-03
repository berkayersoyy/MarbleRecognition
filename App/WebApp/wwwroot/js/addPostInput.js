[...document.querySelectorAll('.add-post-input-wrapper')].forEach(function(item) {
    item.addEventListener('click', function(elem) {
        let getElemWithClass = document.querySelector('.input-active');
        if (getElemWithClass !== null) {
            getElemWithClass.classList.remove('input-active');
        }
        item.classList.add('input-active')
        item.childNodes[1].focus();
    })
});
[...document.querySelectorAll('.add-post-input')].forEach(function(item) {
    item.addEventListener('blur', function(elem) {
        item.parentElement.classList.remove('input-active');
    })
});
[...document.querySelectorAll('.add-post-answer-input-wrapper')].forEach(function(item) {
    item.addEventListener('click', function(elem) {
        let getElemWithClass = document.querySelector('.input-active');
        if (getElemWithClass !== null) {
            getElemWithClass.classList.remove('input-active');
        }
        item.classList.add('input-active')
        item.childNodes[1].focus();
    })
});
[...document.querySelectorAll('.add-post-answer-input')].forEach(function(item) {
    item.addEventListener('blur', function(elem) {
        item.parentElement.classList.remove('input-active');
    })
});




