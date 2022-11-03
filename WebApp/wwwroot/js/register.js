[...document.querySelectorAll('.input-wrapper')].forEach(function(item) {
    item.addEventListener('click', function(elem) {
        let getElemWithClass = document.querySelector('.input-active');
        if (getElemWithClass !== null) {
            getElemWithClass.classList.remove('input-active');
        }
        item.classList.add('input-active')
        item.childNodes[1].childNodes[3].focus();
    })
});
[...document.querySelectorAll('.login-register-input')].forEach(function(item) {
    item.addEventListener('blur', function(elem) {
        item.parentElement.parentElement.classList.remove('input-active');
    })
})

