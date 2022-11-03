var scrolled = false;
$(window).on('scroll', function() {
    if ($(window).scrollTop()+100 >= $('#feed-main-wrapper').offset().top + $('#feed-main-wrapper').outerHeight() - window.innerHeight) {
        if (!scrolled){
            scrolled=true;
            $.ajax({
                url: '/Post/LoadMorePosts',
                type: "get",
                async: false,
                success: function (result) {
                    if(result.length>0) {
                        let feedPostArea = document.getElementById("feed-post-area");
                        let likes = [];
                        let userPostAnswers = [];
                        $.ajax({
                            url: '/Like/GetLikes',
                            type: "get",
                            async: false,
                            success: function (likeResult) {
                                likes = likeResult;
                            },
                        })
                        $.ajax({
                            url: '/UserPostAnswer/GetUserPostAnswers',
                            type: "get",
                            async: false,
                            success: function (userPostAnswerResult) {
                                userPostAnswers = userPostAnswerResult;
                            },
                        });
                        let userId = -1;
                        $.ajax({
                            url: '/Auth/GetCurrentUserId',
                            type: "get",
                            async:false,
                            success: function (result) {
                                if (result){
                                    userId = result;
                                }
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                console.log("Status: " + textStatus);
                                console.log("Error: " + errorThrown);
                            }
                        });
                        for (let i = 0; i < result.length; i++) {
                            let postToAdd = "";
                            let checkUserAnsweredPost = userPostAnswers.filter(x => x.postId == result[i].post.id && x.userId == userId);
                            //Eğer kullanıcı cevap verdiyse
                            if (checkUserAnsweredPost.length > 0) {
                                postToAdd +=
                                    "            <div class=\"feed-post-user-wrapper\">\n" +
                                    "                <div class=\"feed-post-user-left-wrapper\">\n" +
                                    "                    <a class=\"feed-post-avatar-wrapper\">\n" +
                                    "                        <img src=\"../images/avatars/avatar.svg\" alt=\"avatar\" class=\"feed-post-avatar\">\n" +
                                    "                    </a>\n" +
                                    `                    <a class=\"feed-post-user-nickname\">${result[i].user.nickname}</a>\n` +
                                    "                </div>\n" +
                                    "                <div class=\"feed-post-user-right-wrapper\">\n" +
                                    `                    <div class=\"feed-post-category-wrapper\" style='background-color: ${result[i].category.backgroundColor}'>\n` +
                                    "                        <div class=\"feed-post-category-image-wrapper\">\n" +
                                    `                            ${result[i].category.svgImage} \n` +
                                    "                        </div>\n" +
                                    `                        <p class=\"feed-post-category-name\">${result[i].category.name}</p>\n` +
                                    "                    </div>\n" +
                                    "                    <div class=\"feed-post-3-dot-wrapper\">\n" +
                                    "                        <img src=\"../images/feed-post-3-dot.svg\" alt=\"dot\" class=\"feed-post-3-dot\">\n" +
                                    "                    </div>\n" +
                                    "                </div>\n" +
                                    "            </div>\n" +
                                    "            <div class=\"feed-post-question-wrapper\">\n" +
                                    `                <p class=\"feed-post-question\">${result[i].post.question}</p>\n` +
                                    "            </div>\n" +
                                    `            <div class=\"feed-post-answers-wrapper answers-${result[i].post.id}\">`;
                                for (let j = 0; j < result[i].answerDetailDtos.length; j++) {
                                    let checkUserAnswer = userPostAnswers.filter(x => x.answerId == result[i].answerDetailDtos[j].answer.id && x.userId == userId);

                                    if (checkUserAnswer.length > 0) {
                                        if (result[i].totalAnswerSelection > 0) {
                                            postToAdd += ` <a class=\"feed-post-answer-wrapper\" id=\"${result[i].answerDetailDtos[j].answer.id}\" style=\"background: linear-gradient(90deg, #E8FCFF 0%, #E8FCFF ${Math.round((parseFloat(result[i].answerDetailDtos[j].numberOfSelections) / parseFloat(result[i].totalAnswerSelection)) * 100)}%, #FBFFFF ${Math.round((parseFloat(result[i].answerDetailDtos[j].numberOfSelections) / parseFloat(result[i].totalAnswerSelection)) * 100)}%, #FBFFFF 100%); border: 2px solid #149BFC;\">\n` +
                                                `                            <p class=\"feed-post-answer-text\">${result[i].answerDetailDtos[j].answer.description}</p>\n` +
                                                "                                <p class=\"feed-post-answer-ratio\">\n" +
                                                `                                    %${Math.round((parseFloat(result[i].answerDetailDtos[j].numberOfSelections) / parseFloat(result[i].totalAnswerSelection)) * 100)}\n` +
                                                "                                </p>\n" +
                                                "                        </a>";
                                        } else {
                                            postToAdd += ` <a class=\"feed-post-answer-wrapper\" id=\"${result[i].answerDetailDtos[j].answer.id}\" style=\"background: linear-gradient(90deg, #E8FCFF 0%, #E8FCFF ${Math.round((parseFloat(result[i].answerDetailDtos[j].numberOfSelections) / parseFloat(result[i].totalAnswerSelection)) * 100)}%, #FBFFFF ${Math.round((parseFloat(result[i].answerDetailDtos[j].numberOfSelections) / parseFloat(result[i].totalAnswerSelection)) * 100)}%, #FBFFFF 100%);\">\n` +
                                                `                            <p class=\"feed-post-answer-text\">${result[i].answerDetailDtos[j].answer.description}</p>\n` +
                                                "                                <p class=\"feed-post-answer-ratio\">\n" +
                                                "                                    %0\n" +
                                                "                                </p>\n" +
                                                "                        </a>";
                                        }
                                    } else {
                                        if (result[i].totalAnswerSelection > 0) {
                                            postToAdd += ` <a class=\"feed-post-answer-wrapper\" id=\"${result[i].answerDetailDtos[j].answer.id}\" style=\"background: linear-gradient(90deg, #E8FCFF 0%, #E8FCFF ${Math.round((parseFloat(result[i].answerDetailDtos[j].numberOfSelections) / parseFloat(result[i].totalAnswerSelection)) * 100)}%, #FBFFFF ${Math.round((parseFloat(result[i].answerDetailDtos[j].numberOfSelections) / parseFloat(result[i].totalAnswerSelection)) * 100)}%, #FBFFFF 100%);\">\n` +
                                                `                            <p class=\"feed-post-answer-text\">${result[i].answerDetailDtos[j].answer.description}</p>\n` +
                                                "                                <p class=\"feed-post-answer-ratio\">\n" +
                                                `                                    %${Math.round((parseFloat(result[i].answerDetailDtos[j].numberOfSelections) / parseFloat(result[i].totalAnswerSelection)) * 100)}\n` +
                                                "                                </p>\n" +
                                                "                        </a>";
                                        } else {
                                            postToAdd += ` <a class=\"feed-post-answer-wrapper\" id=\"${result[i].answerDetailDtos[j].answer.id}\" style=\"background: linear-gradient(90deg, #E8FCFF 0%, #E8FCFF ${Math.round((parseFloat(result[i].answerDetailDtos[j].numberOfSelections) / parseFloat(result[i].totalAnswerSelection)) * 100)}%, #FBFFFF ${Math.round((parseFloat(result[i].answerDetailDtos[j].numberOfSelections) / parseFloat(result[i].totalAnswerSelection)) * 100)}%, #FBFFFF 100%);\">\n` +
                                                `                            <p class=\"feed-post-answer-text\">${result[i].answerDetailDtos[j].answer.description}</p>\n` +
                                                "                                <p class=\"feed-post-answer-ratio\">\n" +
                                                "                                    %0\n" +
                                                "                                </p>\n" +
                                                "                        </a>";
                                        }
                                    }
                                }
                                postToAdd += "       </div>      " +
                                    "                <div class=\"feed-post-action-wrapper\">\n" +
                                    "                <div class=\"feed-post-like-comment-wrapper\">";
                                let checkUserLike = likes.filter(x => x.postId == result[i].post.id && x.userId == userId);
                                if (checkUserLike.length > 0) {
                                    postToAdd += ` <a onclick=\"likeAnswer(${result[i].post.id},this)\" class=\"feed-post-like-button-wrapper\">\n` +
                                        "                            <div class=\"feed-post-like-image-wrapper\">\n" +
                                        "                                <svg class=\"feed-post-like-image\" width=\"16\" height=\"14\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                        "                                    <path style=\"fill:#149BFC;stroke: #149BFC;\" d=\"M9.02553 5.90164L9.17089 5.33032L9.74572 3.07112L9.74574 3.07106C9.80721 2.8296 9.78421 2.57437 9.68057 2.34779C9.57693 2.12121 9.39888 1.93691 9.17601 1.82551L9.17595 1.82548L8.16097 1.31799L4.77977 6.10921L4.77963 6.10942C4.67463 6.25803 4.5355 6.37927 4.37391 6.46293L4.14402 6.01891L4.37391 6.46293C4.21236 6.54657 4.03309 6.59021 3.85117 6.59019C3.85113 6.59019 3.85109 6.59019 3.85105 6.59019H1.63462C1.5984 6.59019 1.56366 6.60458 1.53805 6.63019C1.51244 6.6558 1.49805 6.69054 1.49805 6.72676V13.0925C1.49805 13.1287 1.51244 13.1635 1.53805 13.1891C1.56366 13.2147 1.5984 13.2291 1.63462 13.2291H12.3482H12.3484C12.3754 13.2291 12.4019 13.2211 12.4244 13.206C12.4469 13.191 12.4644 13.1696 12.4747 13.1445L14.4447 8.3612C14.4831 8.26774 14.5028 8.16767 14.5027 8.06663V8.06611V6.72676C14.5027 6.52171 14.4212 6.32506 14.2762 6.18006C14.1312 6.03507 13.9346 5.95361 13.7295 5.95361H9.65546H9.06593C9.13484 6.03489 9.21989 6.10114 9.31582 6.14808C9.42156 6.19982 9.53773 6.22673 9.65546 6.22676C9.65548 6.22676 9.6555 6.22676 9.65553 6.22676H13.7295H14.2295V6.72676V8.06611V8.16504L14.1919 8.25652L12.384 12.6463L12.2565 12.9559H11.9217H4.81749H4.31749V12.4559V7.10107V6.81541L4.56357 6.67034C4.73517 6.56918 4.88567 6.43257 5.00294 6.26653C5.00296 6.26651 5.00298 6.26648 5.003 6.26645L8.00121 2.01931L8.24884 1.66852L8.63302 1.86032L9.05379 2.07039L9.05391 2.07044C9.22114 2.15399 9.35472 2.29227 9.43244 2.46229L8.97769 2.67015L9.43244 2.46229C9.51009 2.63218 9.52728 2.82353 9.48115 3.00454L9.02553 5.90164ZM9.02553 5.90164C8.96382 5.81485 8.92063 5.71613 8.89881 5.61165C8.87475 5.49641 8.87732 5.3772 8.90633 5.26311C8.90633 5.26308 8.90634 5.26306 8.90635 5.26303L9.48105 3.00493L9.02553 5.90164ZM4.04434 7.36334V6.86334H3.54434H2.2712H1.7712V7.36334V12.4559V12.9559H2.2712H3.54434H4.04434V12.4559V7.36334Z\"/>\n" +
                                        "                                </svg>\n" +
                                        "                            </div>\n" +
                                        "                            <div class=\"feed-post-like-text-wrapper\">\n" +
                                        `                                <p class=\"feed-post-like-text\" style=\"color: #149BFC;\">${result[i].likes.length}</p>\n` +
                                        "                            </div>\n" +
                                        "                        </a>";
                                } else {
                                    postToAdd += ` <a onclick=\"likeAnswer(${result[i].post.id},this)\" class=\"feed-post-like-button-wrapper\">\n` +
                                        "                            <div class=\"feed-post-like-image-wrapper\">\n" +
                                        "                                <svg class=\"feed-post-like-image\" width=\"16\" height=\"14\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                        "                                    <path d=\"M9.02553 5.90164L9.17089 5.33032L9.74572 3.07112L9.74574 3.07106C9.80721 2.8296 9.78421 2.57437 9.68057 2.34779C9.57693 2.12121 9.39888 1.93691 9.17601 1.82551L9.17595 1.82548L8.16097 1.31799L4.77977 6.10921L4.77963 6.10942C4.67463 6.25803 4.5355 6.37927 4.37391 6.46293L4.14402 6.01891L4.37391 6.46293C4.21236 6.54657 4.03309 6.59021 3.85117 6.59019C3.85113 6.59019 3.85109 6.59019 3.85105 6.59019H1.63462C1.5984 6.59019 1.56366 6.60458 1.53805 6.63019C1.51244 6.6558 1.49805 6.69054 1.49805 6.72676V13.0925C1.49805 13.1287 1.51244 13.1635 1.53805 13.1891C1.56366 13.2147 1.5984 13.2291 1.63462 13.2291H12.3482H12.3484C12.3754 13.2291 12.4019 13.2211 12.4244 13.206C12.4469 13.191 12.4644 13.1696 12.4747 13.1445L14.4447 8.3612C14.4831 8.26774 14.5028 8.16767 14.5027 8.06663V8.06611V6.72676C14.5027 6.52171 14.4212 6.32506 14.2762 6.18006C14.1312 6.03507 13.9346 5.95361 13.7295 5.95361H9.65546H9.06593C9.13484 6.03489 9.21989 6.10114 9.31582 6.14808C9.42156 6.19982 9.53773 6.22673 9.65546 6.22676C9.65548 6.22676 9.6555 6.22676 9.65553 6.22676H13.7295H14.2295V6.72676V8.06611V8.16504L14.1919 8.25652L12.384 12.6463L12.2565 12.9559H11.9217H4.81749H4.31749V12.4559V7.10107V6.81541L4.56357 6.67034C4.73517 6.56918 4.88567 6.43257 5.00294 6.26653C5.00296 6.26651 5.00298 6.26648 5.003 6.26645L8.00121 2.01931L8.24884 1.66852L8.63302 1.86032L9.05379 2.07039L9.05391 2.07044C9.22114 2.15399 9.35472 2.29227 9.43244 2.46229L8.97769 2.67015L9.43244 2.46229C9.51009 2.63218 9.52728 2.82353 9.48115 3.00454L9.02553 5.90164ZM9.02553 5.90164C8.96382 5.81485 8.92063 5.71613 8.89881 5.61165C8.87475 5.49641 8.87732 5.3772 8.90633 5.26311C8.90633 5.26308 8.90634 5.26306 8.90635 5.26303L9.48105 3.00493L9.02553 5.90164ZM4.04434 7.36334V6.86334H3.54434H2.2712H1.7712V7.36334V12.4559V12.9559H2.2712H3.54434H4.04434V12.4559V7.36334Z\" fill=\"#262338\" stroke=\"#262338\"/>\n" +
                                        "                                </svg>\n" +
                                        "                            </div>\n" +
                                        "                            <div class=\"feed-post-like-text-wrapper\">\n" +
                                        `                                <p class=\"feed-post-like-text\">${result[i].likes.length}</p>\n` +
                                        "                            </div>\n" +
                                        "                        </a>";
                                }
                                postToAdd += `<a onclick="showMoreCommentAction('question/${encodeURIComponent(result[i].post.title)}')" class=\"feed-post-comment-button-wrapper\">\n` +
                                    "                        <div class=\"feed-post-comment-image-wrapper\">\n" +
                                    "                            <svg class=\"feed-post-comment-image\" width=\"14\" height=\"12\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                    "                                <path d=\"M0.361329 4.70376C0.360926 4.10197 0.479236 3.50601 0.709484 2.95001C0.939732 2.39401 1.27739 1.88889 1.70314 1.46357C2.12888 1.03826 2.63434 0.701098 3.19057 0.471407C3.7468 0.241715 4.34287 0.124002 4.94466 0.125006H11.0558C13.5865 0.125006 15.6391 2.18369 15.6391 4.70376V13.875H4.94466C2.4139 13.875 0.361329 11.8163 0.361329 9.29626V4.70376ZM14.1113 12.3472V4.70376C14.1093 3.89442 13.7866 3.11887 13.2139 2.54701C12.6411 1.97514 11.8651 1.65359 11.0558 1.65278H4.94466C4.5435 1.65178 4.14609 1.72997 3.77522 1.88289C3.40435 2.0358 3.06731 2.26042 2.78344 2.54387C2.49956 2.82732 2.27444 3.16402 2.12097 3.53466C1.9675 3.90531 1.8887 4.3026 1.88911 4.70376V9.29626C1.89113 10.1056 2.21385 10.8811 2.78657 11.453C3.35929 12.0249 4.13532 12.3464 4.94466 12.3472H14.1113ZM9.528 6.23612H11.0558V7.7639H9.528V6.23612ZM4.94466 6.23612H6.47244V7.7639H4.94466V6.23612Z\" fill=\"#262338\"/>\n" +
                                    "                            </svg>\n" +
                                    "\n" +
                                    "                        </div>\n" +
                                    "                        <div class=\"feed-post-comment-text-wrapper\">\n" +
                                    `                            <p class=\"feed-post-comment-text\">${result[i].comments.length}</p>\n` +
                                    "                        </div>\n" +
                                    "                    </a></div>";
                                postToAdd += "<div class=\"feed-post-answered-count-text-wrapper\">\n" +
                                    `                    <p id=\"feed-post-answered-count-text-${result[i].post.id}\" class=\"feed-post-answered-count-text\">${result[i].userPostAnswers.length} kişi cevap verdi</p>\n` +
                                    "                </div>\n" +
                                    "            </div>";
                                postToAdd += "   <a class=\"feed-post-show-all-comments\">\n" +
                                    `                ${result[i].comments.length} yorumun tamamını görüntüle\n` +
                                    "            </a>\n" +
                                    "            <div class=\"feed-post-divider\"></div>";

                                //Eğer kulanıcı cevap vermediyse
                            } else {
                                postToAdd +=
                                    "            <div class=\"feed-post-user-wrapper\">\n" +
                                    "                <div class=\"feed-post-user-left-wrapper\">\n" +
                                    "                    <a class=\"feed-post-avatar-wrapper\">\n" +
                                    "                        <img src=\"../images/avatars/avatar.svg\" alt=\"avatar\" class=\"feed-post-avatar\">\n" +
                                    "                    </a>\n" +
                                    `                    <a class=\"feed-post-user-nickname\">${result[i].user.nickname}</a>\n` +
                                    "                </div>\n" +
                                    "                <div class=\"feed-post-user-right-wrapper\">\n" +
                                    `                    <div class=\"feed-post-category-wrapper\" style='background-color: ${result[i].category.backgroundColor}'>\n` +
                                    "                        <div class=\"feed-post-category-image-wrapper\">\n" +
                                    `                            ${result[i].category.svgImage} \n` +
                                    "                        </div>\n" +
                                    `                        <p class=\"feed-post-category-name\">${result[i].category.name}</p>\n` +
                                    "                    </div>\n" +
                                    "                    <div class=\"feed-post-3-dot-wrapper\">\n" +
                                    "                        <img src=\"../images/feed-post-3-dot.svg\" alt=\"dot\" class=\"feed-post-3-dot\">\n" +
                                    "                    </div>\n" +
                                    "                </div>\n" +
                                    "            </div>\n" +
                                    "            <div class=\"feed-post-question-wrapper\">\n" +
                                    `                <p class=\"feed-post-question\">${result[i].post.question}</p>\n` +
                                    "            </div>\n" +
                                    `            <div class=\"feed-post-answers-wrapper answers-${result[i].post.id}\">`;
                                for (let j = 0; j < result[i].answerDetailDtos.length; j++) {
                                    postToAdd += ` <a onclick="chooseAnswer(${result[i].answerDetailDtos[j].answer.id},${result[i].post.id})" class=\"feed-post-answer-wrapper\" id=\"${result[i].answerDetailDtos[j].answer.id}\">\n` +
                                        `                          <p class=\"feed-post-answer-text\">${result[i].answerDetailDtos[j].answer.description}</p>\n` +
                                        "                                <p class=\"feed-post-answer-ratio\">\n" +
                                        "                                </p>\n" +
                                        "                        </a>";

                                }
                                postToAdd += "       </div>      " +
                                    "                <div class=\"feed-post-action-wrapper\">\n" +
                                    "                <div class=\"feed-post-like-comment-wrapper\">";
                                let checkUserLike = likes.filter(x => x.postId == result[i].post.id && x.userId == userId);
                                if (checkUserLike.length > 0) {
                                    postToAdd += ` <a onclick=\"likeAnswer(${item.post.id},this)\" class=\"feed-post-like-button-wrapper\">\n` +
                                        "                            <div class=\"feed-post-like-image-wrapper\">\n" +
                                        "                                <svg class=\"feed-post-like-image\" width=\"16\" height=\"14\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                        "                                    <path style=\"fill:#149BFC;stroke: #149BFC;\" d=\"M9.02553 5.90164L9.17089 5.33032L9.74572 3.07112L9.74574 3.07106C9.80721 2.8296 9.78421 2.57437 9.68057 2.34779C9.57693 2.12121 9.39888 1.93691 9.17601 1.82551L9.17595 1.82548L8.16097 1.31799L4.77977 6.10921L4.77963 6.10942C4.67463 6.25803 4.5355 6.37927 4.37391 6.46293L4.14402 6.01891L4.37391 6.46293C4.21236 6.54657 4.03309 6.59021 3.85117 6.59019C3.85113 6.59019 3.85109 6.59019 3.85105 6.59019H1.63462C1.5984 6.59019 1.56366 6.60458 1.53805 6.63019C1.51244 6.6558 1.49805 6.69054 1.49805 6.72676V13.0925C1.49805 13.1287 1.51244 13.1635 1.53805 13.1891C1.56366 13.2147 1.5984 13.2291 1.63462 13.2291H12.3482H12.3484C12.3754 13.2291 12.4019 13.2211 12.4244 13.206C12.4469 13.191 12.4644 13.1696 12.4747 13.1445L14.4447 8.3612C14.4831 8.26774 14.5028 8.16767 14.5027 8.06663V8.06611V6.72676C14.5027 6.52171 14.4212 6.32506 14.2762 6.18006C14.1312 6.03507 13.9346 5.95361 13.7295 5.95361H9.65546H9.06593C9.13484 6.03489 9.21989 6.10114 9.31582 6.14808C9.42156 6.19982 9.53773 6.22673 9.65546 6.22676C9.65548 6.22676 9.6555 6.22676 9.65553 6.22676H13.7295H14.2295V6.72676V8.06611V8.16504L14.1919 8.25652L12.384 12.6463L12.2565 12.9559H11.9217H4.81749H4.31749V12.4559V7.10107V6.81541L4.56357 6.67034C4.73517 6.56918 4.88567 6.43257 5.00294 6.26653C5.00296 6.26651 5.00298 6.26648 5.003 6.26645L8.00121 2.01931L8.24884 1.66852L8.63302 1.86032L9.05379 2.07039L9.05391 2.07044C9.22114 2.15399 9.35472 2.29227 9.43244 2.46229L8.97769 2.67015L9.43244 2.46229C9.51009 2.63218 9.52728 2.82353 9.48115 3.00454L9.02553 5.90164ZM9.02553 5.90164C8.96382 5.81485 8.92063 5.71613 8.89881 5.61165C8.87475 5.49641 8.87732 5.3772 8.90633 5.26311C8.90633 5.26308 8.90634 5.26306 8.90635 5.26303L9.48105 3.00493L9.02553 5.90164ZM4.04434 7.36334V6.86334H3.54434H2.2712H1.7712V7.36334V12.4559V12.9559H2.2712H3.54434H4.04434V12.4559V7.36334Z\"/>\n" +
                                        "                                </svg>\n" +
                                        "                            </div>\n" +
                                        "                            <div class=\"feed-post-like-text-wrapper\">\n" +
                                        `                                <p class=\"feed-post-like-text\" style=\"color: #149BFC;\">${result[i].likes.length}</p>\n` +
                                        "                            </div>\n" +
                                        "                        </a>";
                                } else {
                                    postToAdd += ` <a onclick=\"likeAnswer(${result[i].post.id},this)\" class=\"feed-post-like-button-wrapper\">\n` +
                                        "                            <div class=\"feed-post-like-image-wrapper\">\n" +
                                        "                                <svg class=\"feed-post-like-image\" width=\"16\" height=\"14\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                        "                                    <path d=\"M9.02553 5.90164L9.17089 5.33032L9.74572 3.07112L9.74574 3.07106C9.80721 2.8296 9.78421 2.57437 9.68057 2.34779C9.57693 2.12121 9.39888 1.93691 9.17601 1.82551L9.17595 1.82548L8.16097 1.31799L4.77977 6.10921L4.77963 6.10942C4.67463 6.25803 4.5355 6.37927 4.37391 6.46293L4.14402 6.01891L4.37391 6.46293C4.21236 6.54657 4.03309 6.59021 3.85117 6.59019C3.85113 6.59019 3.85109 6.59019 3.85105 6.59019H1.63462C1.5984 6.59019 1.56366 6.60458 1.53805 6.63019C1.51244 6.6558 1.49805 6.69054 1.49805 6.72676V13.0925C1.49805 13.1287 1.51244 13.1635 1.53805 13.1891C1.56366 13.2147 1.5984 13.2291 1.63462 13.2291H12.3482H12.3484C12.3754 13.2291 12.4019 13.2211 12.4244 13.206C12.4469 13.191 12.4644 13.1696 12.4747 13.1445L14.4447 8.3612C14.4831 8.26774 14.5028 8.16767 14.5027 8.06663V8.06611V6.72676C14.5027 6.52171 14.4212 6.32506 14.2762 6.18006C14.1312 6.03507 13.9346 5.95361 13.7295 5.95361H9.65546H9.06593C9.13484 6.03489 9.21989 6.10114 9.31582 6.14808C9.42156 6.19982 9.53773 6.22673 9.65546 6.22676C9.65548 6.22676 9.6555 6.22676 9.65553 6.22676H13.7295H14.2295V6.72676V8.06611V8.16504L14.1919 8.25652L12.384 12.6463L12.2565 12.9559H11.9217H4.81749H4.31749V12.4559V7.10107V6.81541L4.56357 6.67034C4.73517 6.56918 4.88567 6.43257 5.00294 6.26653C5.00296 6.26651 5.00298 6.26648 5.003 6.26645L8.00121 2.01931L8.24884 1.66852L8.63302 1.86032L9.05379 2.07039L9.05391 2.07044C9.22114 2.15399 9.35472 2.29227 9.43244 2.46229L8.97769 2.67015L9.43244 2.46229C9.51009 2.63218 9.52728 2.82353 9.48115 3.00454L9.02553 5.90164ZM9.02553 5.90164C8.96382 5.81485 8.92063 5.71613 8.89881 5.61165C8.87475 5.49641 8.87732 5.3772 8.90633 5.26311C8.90633 5.26308 8.90634 5.26306 8.90635 5.26303L9.48105 3.00493L9.02553 5.90164ZM4.04434 7.36334V6.86334H3.54434H2.2712H1.7712V7.36334V12.4559V12.9559H2.2712H3.54434H4.04434V12.4559V7.36334Z\" fill=\"#262338\" stroke=\"#262338\"/>\n" +
                                        "                                </svg>\n" +
                                        "                            </div>\n" +
                                        "                            <div class=\"feed-post-like-text-wrapper\">\n" +
                                        `                                <p class=\"feed-post-like-text\">${result[i].likes.length}</p>\n` +
                                        "                            </div>\n" +
                                        "                        </a>";
                                }
                                postToAdd += `<a onclick="showMoreCommentAction('question/${encodeURIComponent(result[i].post.title)}')" class=\"feed-post-comment-button-wrapper\">\n` +
                                    "                        <div class=\"feed-post-comment-image-wrapper\">\n" +
                                    "                            <svg class=\"feed-post-comment-image\" width=\"14\" height=\"12\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                    "                                <path d=\"M0.361329 4.70376C0.360926 4.10197 0.479236 3.50601 0.709484 2.95001C0.939732 2.39401 1.27739 1.88889 1.70314 1.46357C2.12888 1.03826 2.63434 0.701098 3.19057 0.471407C3.7468 0.241715 4.34287 0.124002 4.94466 0.125006H11.0558C13.5865 0.125006 15.6391 2.18369 15.6391 4.70376V13.875H4.94466C2.4139 13.875 0.361329 11.8163 0.361329 9.29626V4.70376ZM14.1113 12.3472V4.70376C14.1093 3.89442 13.7866 3.11887 13.2139 2.54701C12.6411 1.97514 11.8651 1.65359 11.0558 1.65278H4.94466C4.5435 1.65178 4.14609 1.72997 3.77522 1.88289C3.40435 2.0358 3.06731 2.26042 2.78344 2.54387C2.49956 2.82732 2.27444 3.16402 2.12097 3.53466C1.9675 3.90531 1.8887 4.3026 1.88911 4.70376V9.29626C1.89113 10.1056 2.21385 10.8811 2.78657 11.453C3.35929 12.0249 4.13532 12.3464 4.94466 12.3472H14.1113ZM9.528 6.23612H11.0558V7.7639H9.528V6.23612ZM4.94466 6.23612H6.47244V7.7639H4.94466V6.23612Z\" fill=\"#262338\"/>\n" +
                                    "                            </svg>\n" +
                                    "\n" +
                                    "                        </div>\n" +
                                    "                        <div class=\"feed-post-comment-text-wrapper\">\n" +
                                    `                            <p class=\"feed-post-comment-text\">${result[i].comments.length}</p>\n` +
                                    "                        </div>\n" +
                                    "                    </a></div>";
                                postToAdd += "<div class=\"feed-post-answered-count-text-wrapper\">\n" +
                                    `                    <p id=\"feed-post-answered-count-text-${result[i].post.id}\" class=\"feed-post-answered-count-text\">${result[i].userPostAnswers.length} kişi cevap verdi</p>\n` +
                                    "                </div>\n" +
                                    "            </div>";
                                postToAdd += "   <a class=\"feed-post-show-all-comments\">\n" +
                                    `                ${result[i].comments.length} yorumun tamamını görüntüle\n` +
                                    "            </a>\n" +
                                    "            <div class=\"feed-post-divider\"></div>";
                            }
                            let feedPostWrapper = document.createElement("div");
                            feedPostWrapper.classList.add("feed-post-wrapper");
                            feedPostWrapper.innerHTML = postToAdd.trim();
                            feedPostArea.appendChild(feedPostWrapper);
                        }
                    }
                    scrolled = false;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("Status: " + textStatus);
                    console.log("Error: " + errorThrown);
                    scrolled =false;
                }
            });
        }
    }});