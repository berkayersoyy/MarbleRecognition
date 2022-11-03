function getAnswers() {
    var answerArray = [];
    var getAnswers = document.getElementById("answers");
    for (let i = 0; i < getAnswers.children.length; i++) {
        var description = getAnswers.children[i].children[0].value;
        var order = i + 1;
        var answer = {
            description: description,
            order: order
        };
        answerArray.push(answer);
    }
    document.getElementById("answers-value").value = JSON.stringify(answerArray);
}

function updateAnswers() {
    var answerArray = [];
    var getAnswers = document.getElementById("answers");
    for (let i = 0; i < getAnswers.children.length; i++) {
        var description = getAnswers.children[i].children[0].value;
        var id = getAnswers.children[i].children[0].id;
        var order = i + 1;
        var answer = {
            id:id,
            description: description,
            order: order
        };
        answerArray.push(answer);
    }
    document.getElementById("answers-value").value = JSON.stringify(answerArray);
}

function addAnswerRow() {
    var answerLength = document.querySelectorAll(".answer").length;
    if (answerLength<5) {
        var count = answerLength + 1;
        var rowToAdd = `<input type=\"text\"/><input type=\"button\" onclick=\"deleteAnswerRow('answer-${count}')\" style="background-color: transparent; color: red; border: none; margin-left: 3px;" value="X"/>`;
        var element = document.createElement('div');
        element.classList.add("form-group");
        element.classList.add("answer");
        element.style.marginTop = 10 + "px";
        element.style.marginBottom = 10 + "px";
        element.innerHTML = rowToAdd.trim();
        element.id = `answer-${count}`;
        document.getElementById("answers").appendChild(element);
    }
}

function deleteAnswerRow(id){
    var answerLength = document.querySelectorAll(".answer").length;
    if (answerLength>=3){
        document.getElementById(id).remove();
    }
}

