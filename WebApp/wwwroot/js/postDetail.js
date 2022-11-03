$("#comment-form").submit(function(e){
    e.preventDefault();
});

let postDetailElement = document.getElementById("post-detail-comment-input-wrapper");
let postDetailInput = document.getElementById("comment");

function focusedPostDetail() {
    postDetailElement.style.border = '1px solid var(--main-dodger-blue)';
}

function notFocusedPostDetail() {
    postDetailElement.style.border = '1px solid var(--greyscale-gainsboro)';
}

postDetailInput.addEventListener('focus', focusedPostDetail);

postDetailInput.addEventListener('blur', notFocusedPostDetail);


