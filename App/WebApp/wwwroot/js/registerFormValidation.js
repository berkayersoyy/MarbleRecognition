$(document).ready(function() {
    jQuery.validator.addMethod("noSpace", function(value, element) {
        return value.indexOf(" ") < 0 && value != "";
    }, "Boşluk içeremez");
    $("#register-form").validate({
        errorClass: 'input-wrapper-error',
        validClass: 'input-wrapper-success',
        errorPlacement: function(error, element) {
            element.closest('div')[0].parentElement.nextElementSibling.innerText = error[0].outerText;
        },
        highlight: function(element, errorClass, validClass) {
            if (element.type == "checkbox") {
                element.parentElement.parentElement.classList.remove("input-wrapper-checkbox-success")
                element.parentElement.parentElement.classList.add("input-wrapper-checkbox-error")
            } else {
                element.parentElement.parentElement.classList.remove(validClass)
                element.parentElement.parentElement.classList.add(errorClass)
                element.parentElement.firstChild.nextElementSibling.classList.remove("input-image-wrapper-success")
                element.parentElement.firstChild.nextElementSibling.classList.add("input-image-wrapper-error")
            }
        },
        unhighlight: function(element, errorClass, validClass) {
            if (element.type == "checkbox") {
                element.parentElement.parentElement.classList.add("input-wrapper-checkbox-success")
                element.parentElement.parentElement.classList.remove("input-wrapper-checkbox-error")
            } else {
                element.parentElement.parentElement.nextElementSibling.innerText = "";
                element.parentElement.parentElement.classList.add(validClass)
                element.parentElement.parentElement.classList.remove(errorClass)
                element.parentElement.firstChild.nextElementSibling.classList.add("input-image-wrapper-success")
                element.parentElement.firstChild.nextElementSibling.classList.remove("input-image-wrapper-error")
            }
        },
        rules: {
            'Nickname': {
                required: true,
                noSpace:true,
                pattern: "^[a-zA-Z0-9_.-]*$",
                minlength: 2,
                maxlength: 32,
                remote:{
                        type: "get",
                        url:  "/Auth/CheckUserExistsByNickname"+document.getElementById("nickname").value,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async:false
                }
            },
            'Email': {
                required: true,
                noSpace:true,
                email: true,
                remote:{
                        type: "get",
                        url:  "/Auth/CheckUserExistsByEmail"+document.getElementById("email").value,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async:false
                }
            },
            'Password': {
                required: true,
                noSpace:true,
                pattern: "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z]).*$"
            },
            'PasswordConfirmation': {
                equalTo: "#register-password",
                noSpace:true,
                required: true,
                pattern: "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z]).*$"
            },
            'Terms': {
                required: true
            }
        },
        messages: {
            'Nickname': {
                required: "Kullanıcı adını doldurmalısın",
                pattern: "Kullanıcı adı özel karakter içermemeli",
                minlength: "Kullanıcı adı 2 karakterden kısa olmamalı",
                maxlength: "Kullanıcı adı 32 karakterden uzun olmamalı",
                remote: "Bu kullanıcı adı kayıtlı. Başka bir kullanıcı adı denemeye ne dersin?"
            },
            'Email': {
                required: "Eposta adresini doldurmalısın",
                email: "Geçerli bir eposta adresi girer misin?",
                remote: "Bu email kayıtlı. Şifreni unutmuş olabilir misin?"
            },
            'Password': {
                required: "Şifreni doldurmalısın",
                pattern: "Şifren en az 8 karakter uzunluğunda olmalı, 1 adet büyük ve 1 adet küçük harf içermeli"
            },
            'PasswordConfirmation': {
                required: "Şifreni boş bırakmamalısın, sonra nasıl gireceksin? :)",
                pattern: "Şifre en az 8 karakter uzunluğunda olmalı, 1 adet büyük ve 1 adet küçük harf içermeli",
                equalTo: "Girdiğin şifreler aynı olmalı sonra sıkıntı yaşama :)"
            },
            'Terms': {
                required: "Devam etmek için sözleşmeyi kabul etmelisin. ",
            }
        }
    });
})