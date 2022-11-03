$(document).ready(function () {
    $("#add-post-form").validate({
        errorClass: 'input-wrapper-error',
        validClass: 'input-wrapper-success',
        errorPlacement: function (error, element) {
            if(element[0].parentElement.classList!="add-post-answer-input") {
                element.closest('div')[0].parentElement.nextElementSibling.innerText = error[0].outerText;
            }
        },
        highlight: function (element, errorClass, validClass) {
            element.parentElement.classList.remove(validClass)
            element.parentElement.classList.add(errorClass)
        },
        unhighlight: function (element, errorClass, validClass) {
            if(element.classList!="add-post-answer-input") {
                element.parentElement.parentElement.nextElementSibling.innerText = "";
            }
            element.parentElement.classList.add(validClass)
            element.parentElement.classList.remove(errorClass)
        },
        submitHandler: function(form, event) {
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
            return true;
        },
        rules: {
            'Title': {
                required: true,
                pattern: "^[a-zA-Z0-9 ]*$",
                minlength: 1,
                maxlength: 48,
                // remote: {
                //     type: "get",
                //     url: "/Auth/CheckUserExistsByNickname" + document.getElementById("nickname").value,
                //     contentType: "application/json; charset=utf-8",
                //     dataType: "json",
                //     async: false
                // }
            },
            'Question': {
                required: true,
                minlength: 1,
                maxlength: 280,
            },
        },
        messages: {
            'Title': {
                required: "Soru başlığını doldurmalısın",
                pattern: "Soru başlığı özel karakter içermemeli",
                minlength: "Soru başlığı 1 karakterden kısa olmamalı",
                maxlength: "Soru başlığı 32 karakterden uzun olmamalı",
                // remote: "Bu kullanıcı adı kayıtlı. Başka bir kullanıcı adı denemeye ne dersin?"
            },
            'Question': {
                required: "Soruyu doldurmalısın",
                pattern: "Soru özel karakter içermemeli",
                minlength: "Soru 1 karakterden kısa olmamalı",
                maxlength: "Soru 280 karakterden uzun olmamalı",
            }
        }
    });
})