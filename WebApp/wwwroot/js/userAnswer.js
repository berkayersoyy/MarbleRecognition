function chooseAnswer(answerId, postId) {
    let userPostAnswer = {answerId: answerId, postId: postId};
    $.ajax({
        url: '/UserPostAnswer/ChooseAnswer',
        type: "post",
        data: userPostAnswer,
        async: false,
        success: function (result) {
            if (result == false) {
                showRegisterPopup();
                return;
            }
            let answersWrapper = document.getElementsByClassName(`answers-${postId}`);
            let answerRatios = answersWrapper[0].getElementsByClassName("feed-post-answer-ratio");
            let answers = answersWrapper[0].getElementsByClassName("feed-post-answer-wrapper");
            var answeredCountText = document.getElementById(`feed-post-answered-count-text-${postId}`).innerText.split(" ");
            var answeredCount = parseInt(answeredCountText[0]) + 1;
            let answerRatioList = [];
            let totalRatioCount = 0;
            for (let i = 0; i < answers.length; i++) {
                $.ajax({
                    url: '/UserPostAnswer/GetUserPostAnswersByAnswerId',
                    type: "get",
                    data: {id: answers[i].id},
                    async: false,
                    success: function (answerResult) {
                        answerRatioList.push(answerResult.length);
                        totalRatioCount += answerResult.length;
                    }
                });
            }
            for (let i = 0; i < answers.length; i++) {
                let answerElementId = answers[i].id;
                let answer = document.getElementById(answerElementId);
                if (answerElementId == answerId.toString()) {
                    answer.classList.add("feed-post-answer-selected");
                }
                answerRatios[i].style.display = "block";
                let ratio = Math.round((answerRatioList[i] / totalRatioCount) * 100);
                answerRatios[i].innerText = "%" + ratio.toString();
                if (ratio != 0) {
                    answer.style.background = `linear-gradient(90deg, #E8FCFF 0%, #E8FCFF ${ratio}%, #FBFFFF ${ratio}%, #FBFFFF ${ratio}%)`;
                }
            }
            document.getElementById(`feed-post-answered-count-text-${postId}`).innerText = answeredCount.toString() + " kişi cevap verdi";
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
}

function likeAnswer(postId, element) {
    let like = {postId: postId};
    $.ajax({
        url: '/Like/LikeAnswer',
        type: "post",
        data: like,
        async: false,
        success: function (result) {
            if (result == null) {
                showRegisterPopup();
                return;
            }
            if (result == true) {
                let likeImage = element.getElementsByClassName("feed-post-like-image")[0].childNodes[1];
                let likeTextElement = element.getElementsByClassName("feed-post-like-text")[0];
                let likeText = parseInt(likeTextElement.innerText);
                likeTextElement.innerText = (likeText + 1).toString();
                likeImage.style.fill = "#149BFC";
                likeImage.style.stroke = "#149BFC";
                likeTextElement.style.color = "#149BFC";
            } else {
                let likeImage = element.getElementsByClassName("feed-post-like-image")[0].childNodes[1];
                let likeTextElement = element.getElementsByClassName("feed-post-like-text")[0];
                let likeText = parseInt(likeTextElement.innerText);
                likeTextElement.innerText = (likeText - 1).toString();
                likeImage.style.fill = "black";
                likeImage.style.stroke = "black";
                likeTextElement.style.color = "black";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
}

function chooseAnswerPostDetail(answerId, postId) {
    let userPostAnswer = {answerId: answerId, postId: postId};
    $.ajax({
        url: '/UserPostAnswer/ChooseAnswer',
        type: "post",
        data: userPostAnswer,
        async: false,
        success: function (result) {
            if (result == false) {
                showRegisterPopup();
                return;
            }
            let answersWrapper = document.getElementsByClassName(`answers-${postId}`);
            let answerRatios = answersWrapper[0].getElementsByClassName("post-detail-post-answer-ratio");
            let answers = answersWrapper[0].getElementsByClassName("post-detail-post-answer-wrapper");
            var answeredCountText = document.getElementById(`post-detail-post-answered-count-text-${postId}`).innerText.split(" ");
            var answeredCount = parseInt(answeredCountText[0]) + 1;
            let answerRatioList = [];
            let totalRatioCount = 0;
            for (let i = 0; i < answers.length; i++) {
                $.ajax({
                    url: '/UserPostAnswer/GetUserPostAnswersByAnswerId',
                    type: "get",
                    data: {id: answers[i].id},
                    async: false,
                    success: function (answerResult) {
                        answerRatioList.push(answerResult.length);
                        totalRatioCount += answerResult.length;
                    }
                });
            }
            for (let i = 0; i < answers.length; i++) {
                let answerElementId = answers[i].id;
                let answer = document.getElementById(answerElementId);
                if (answerElementId == answerId.toString()) {
                    answer.classList.add("post-detail-post-answer-selected");
                }
                answerRatios[i].style.display = "block";
                let ratio = Math.round((answerRatioList[i] / totalRatioCount) * 100);
                answerRatios[i].innerText = "%" + ratio.toString();
                if (ratio != 0) {
                    answer.style.background = `linear-gradient(90deg, #E8FCFF 0%, #E8FCFF ${ratio}%, #FBFFFF ${ratio}%, #FBFFFF ${ratio}%)`;
                }
            }
            document.getElementById(`post-detail-post-answered-count-text-${postId}`).innerText = answeredCount.toString() + " kişi cevap verdi";
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
}

function likeAnswerPostDetail(postId, element) {
    let like = {postId: postId};
    $.ajax({
        url: '/Like/LikeAnswer',
        type: "post",
        data: like,
        async: false,
        success: function (result) {
            if (result == null) {
                showRegisterPopup();
                return;
            }
            if (result == true) {
                let likeImage = element.getElementsByClassName("post-detail-post-like-image")[0].childNodes[1];
                let likeTextElement = element.getElementsByClassName("post-detail-post-like-text")[0];
                let likeText = parseInt(likeTextElement.innerText);
                likeTextElement.innerText = (likeText + 1).toString();
                likeImage.style.fill = "#149BFC";
                likeImage.style.stroke = "#149BFC";
                likeTextElement.style.color = "#149BFC";
            } else {
                let likeImage = element.getElementsByClassName("post-detail-post-like-image")[0].childNodes[1];
                let likeTextElement = element.getElementsByClassName("post-detail-post-like-text")[0];
                let likeText = parseInt(likeTextElement.innerText);
                likeTextElement.innerText = (likeText - 1).toString();
                likeImage.style.fill = "black";
                likeImage.style.stroke = "black";
                likeTextElement.style.color = "black";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
}