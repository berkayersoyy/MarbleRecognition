function addPost(){
    let validCheck = true;
    let categoryWrapperCheck = document.getElementById("add-post-categories-select-box-item-init").children[0].classList == "add-post-categories-select-box-item-dynamic-wrapper"
    let categoryCheck;
    if (categoryWrapperCheck){
        categoryCheck = document.getElementById("add-post-categories-select-box-item-init").children[0].children[1].id == "";
    }else{
        categoryCheck = document.getElementById("add-post-categories-select-box-item-init").children[1].id == "";
    }
    let answers = document.getElementsByClassName("add-post-answer-input");
    if (!$("#add-post-form").valid()) {
        validCheck=false;
    }
    if (categoryCheck) {
        document.getElementById("add-post-categories-select-box-item-init").classList.add("input-wrapper-error");
        validCheck = false;
    }
    for(let i=0;i<answers.length;i++){
        if (answers[i].value.trim()==""){
            answers[i].parentElement.classList.add("input-wrapper-error");
            validCheck = false;
        }
    }
    if (!validCheck) {
        event.preventDefault();
        return false;
    }
    getPostAnswers();
    getCategory();
}

function getPostAnswers() {
    let answerArray = [];
    let getAnswers = document.getElementById("add-post-answer-input-row");
    for (let i = 0; i < getAnswers.children.length; i++) {
        let description = getAnswers.children[i].children[1].children[0].value;
        let order = i + 1;
        let answer = {
            description: description,
            order: order
        };
        answerArray.push(answer);
    }
    document.getElementById("post-answers-value").value = JSON.stringify(answerArray);
}

function getCategory() {
    let categoryId = -1;
    if (document.getElementById("add-post-categories-select-box-item-init").children[0].children[1].id != null) {
        let categoryIdString = document.getElementById("add-post-categories-select-box-item-init").children[0].children[1].id.split("-")
        categoryId = categoryIdString[categoryIdString.length - 1];
        document.getElementById("post-category-id").value = categoryId;
    }
}

function updatePostAnswers() {
    let answerArray = [];
    let getAnswers = document.getElementById("add-post-answer-input-row");
    for (let i = 0; i < getAnswers.children.length; i++) {
        let description = getAnswers.children[i].children[1].children[0].value;
        let id = getAnswers.children[i].children[1].children[0].id;
        let order = i + 1;
        let answer = {
            id: id,
            description: description,
            order: order
        };
        answerArray.push(answer);
    }
    document.getElementById("post-answers-value").value = JSON.stringify(answerArray);
}

function addPostAnswerRow() {
    let answerLength = document.querySelectorAll(".add-post-answer-input-row-wrapper").length;
    if (answerLength < 5) {
        let count = answerLength + 1;
        let rowToAdd = "<div class=\"add-post-answer-input-move-image-wrapper\">\n" +
            "                            <svg class=\"add-post-answer-input-move-image\" width=\"4\" height=\"14\" viewBox=\"0 0 4 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "                                <path d=\"M4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2C0 0.89543 0.89543 0 2 0C3.10457 0 4 0.89543 4 2Z\" fill=\"#262338\"/>\n" +
            "                                <path d=\"M4 12C4 13.1046 3.10457 14 2 14C0.89543 14 0 13.1046 0 12C0 10.8954 0.89543 10 2 10C3.10457 10 4 10.8954 4 12Z\" fill=\"#262338\"/>\n" +
            "                            </svg>\n" +
            "                        </div>\n" +
            "                        <div class=\"add-post-answer-input-wrapper\">\n" +
            "                            <input type=\"text\" class=\"add-post-answer-input\">\n" +
            "                        </div>\n" +
            `                        <div class=\"add-post-answer-remove-image-wrapper\" onclick=\"deletePostAnswerRow('add-post-answer-${count}')\">\n` +
            "                            <svg class=\"add-post-answer-remove-image\" width=\"12\" height=\"14\" viewBox=\"0 0 12 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "                                <path d=\"M4.84195 0C3.95853 0 3.23077 0.727764 3.23077 1.61118V2.15385H0V3.23077H1.07692V12.3846C1.07692 13.2722 1.80469 14 2.69231 14H9.15385C10.0415 14 10.7692 13.2722 10.7692 12.3846V3.23077H11.8462V2.15385H8.61539V1.61118C8.61539 0.727764 7.88762 0 7.00421 0H4.84195ZM4.84195 1.07692H7.00421C7.30709 1.07692 7.53846 1.30829 7.53846 1.61118V2.15385H4.30769V1.61118C4.30769 1.30829 4.53906 1.07692 4.84195 1.07692ZM2.15385 3.23077H9.69231V12.3846C9.69231 12.6875 9.45673 12.9231 9.15385 12.9231H2.69231C2.38942 12.9231 2.15385 12.6875 2.15385 12.3846V3.23077ZM3.23077 4.30769V11.8462H4.30769V4.30769H3.23077ZM5.38462 4.30769V11.8462H6.46154V4.30769H5.38462ZM7.53846 4.30769V11.8462H8.61539V4.30769H7.53846Z\" fill=\"#262338\"/>\n" +
            "                            </svg>\n" +
            "                        </div>";
        let element = document.createElement('div');
        element.classList.add("add-post-answer-input-row-wrapper");
        element.innerHTML = rowToAdd.trim();
        element.id = `add-post-answer-${count}`;
        var elementInput = element.getElementsByClassName("add-post-answer-input")[0];
        element.addEventListener('click', function (elem) {
            let getElemWithClass = document.querySelector('.input-active');
            if (getElemWithClass !== null) {
                getElemWithClass.classList.remove('input-active');
            }
            element.children[1].classList.add('input-active')
            element.children[1].children[0].focus();
        })
        elementInput.addEventListener('blur', function (elem) {
            elementInput.parentElement.classList.remove('input-active');
        })
        document.getElementById("add-post-answer-input-row").appendChild(element);
    }
}

function deletePostAnswerRow(id) {
    let answerLength = document.querySelectorAll(".add-post-answer-input-row-wrapper").length;
    if (answerLength >= 3) {
        document.getElementById(id).remove();
    }
}

