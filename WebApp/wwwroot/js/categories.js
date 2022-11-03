[...document.querySelectorAll('.feed-category-wrapper')].forEach(function(item) {
    item.addEventListener('click', function(elem) {
        let getElemWithClass = document.querySelector('.feed-category-active');
        if (getElemWithClass !== null) {
            getElemWithClass.classList.remove('feed-category-active');
        }
        item.classList.add('feed-category-active')
    })
})
