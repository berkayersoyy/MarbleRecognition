function showMoreCommentAction(href){
    console.log(href)
    $.ajax({
        url: '/Auth/GetCurrentUser',
        type: "get",
        async: false,
        success: function (result) {
            if (result == null) {
                showRegisterPopup();
                return;
            }
            window.location = href;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
}

function commentSubmit(postId){
    if(!$("#comment-form").valid()){
        return;
    }
    let commentInputElement = document.getElementById("comment");
    let comment = {
        description:commentInputElement.value.trim(),
        postId:postId
    };
    $.ajax({
        url: '/Comment/Comment?commentJson='+JSON.stringify(comment),
        type: "post",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (result) {
            if (result==null){
                return;
            }
            let commentsArea = document.getElementById("comments-area");
            let rowToAdd =
                "    <div class=\"post-detail-user-comment-avatar-and-nickname-wrapper\">\n" +
                "        <div class=\"post-detail-user-comment-avatar-wrapper\">\n" +
                "            <img src=\"../images/avatars/avatar.svg\" alt=\"avatar\" class=\"post-detail-user-comment-avatar\">\n" +
                "        </div>\n" +
                `        <p class=\"post-detail-user-comment-nickname\">${result.user.nickname}</p>\n` +
                "    </div>\n" +
                `    <p class=\"post-detail-user-comment-desc\">${result.comment.description}</p>\n` +
                `    <p class=\"post-detail-user-comment-date\">${result.commentDate}</p>\n` +
                "    <div class=\"post-detail-user-comment-divider\"></div>\n";
            var commentElement = document.createElement('div');
            commentElement.classList.add("post-detail-user-comment-wrapper");
            commentElement.innerHTML=rowToAdd.trim();
            commentsArea.prepend(commentElement);
            commentInputElement.value="";
            document.getElementById("post-detail-feed-post-comment-text").innerText = parseInt(document.getElementById("post-detail-feed-post-comment-text").innerText) + 1;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
}

function loadMoreComment(postId){
    $.ajax({
        url: '/Comment/LoadMoreComments?postId='+postId,
        type: "get",
        async: false,
        success: function (result) {
            if (result.length == 0) {
                return;
            }
            let commentsArea = document.getElementById("comments-area");
            for (let i=0;i<result.length;i++){
                let rowToAdd =
                    "            <div class=\"post-detail-user-comment-avatar-and-nickname-wrapper\">\n" +
                    "                <div class=\"post-detail-user-comment-avatar-wrapper\">\n" +
                    "                    <img src=\"../images/avatars/avatar.svg\" alt=\"avatar\" class=\"post-detail-user-comment-avatar\">\n" +
                    "                </div>\n" +
                    `                <p class=\"post-detail-user-comment-nickname\">${result[i].user.nickname}</p>\n` +
                    "            </div>\n" +
                    `            <p class=\"post-detail-user-comment-desc\">${result[i].comment.description}</p>\n` +
                    `            <p class=\"post-detail-user-comment-date\">${result[i].commentDate}</p>\n` +
                    "            <div class=\"post-detail-user-comment-divider\"></div>\n";

                let commentWrapper = document.createElement("div");
                commentWrapper.classList.add("post-detail-user-comment-wrapper");
                commentWrapper.innerHTML = rowToAdd.trim();
                commentsArea.appendChild(commentWrapper);
            }
            if (result.length!=10){
                document.getElementById("post-detail-show-more-comments").style.display="none";
            }else{
                let commentPageCountString = document.getElementById("post-detail-show-more-comments").innerText.split(" ")[0]; //21
                let commentPageCount = parseInt(commentPageCountString) - result.length;
                document.getElementById("post-detail-show-more-comments").innerText = commentPageCount + " yorumun tamamını görüntüle";
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
}