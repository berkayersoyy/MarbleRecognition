$(document).ready(function() {
    jQuery.validator.addMethod("noSpace", function(value, element) {
        return value.indexOf(" ") < 0 && value != "";
    }, "Boşluk içeremez");
    $("#reset-password-form").validate({
        errorClass: 'input-wrapper-error',
        validClass: 'input-wrapper-success',
        ignore: ".ignore",
        errorPlacement: function(error, element) {
            element.closest('div')[0].parentElement.nextElementSibling.innerText = error[0].outerText;
        },
        highlight: function(element, errorClass, validClass) {
                element.parentElement.parentElement.classList.remove(validClass)
                element.parentElement.parentElement.classList.add(errorClass)
                element.parentElement.firstChild.nextElementSibling.classList.remove("input-image-wrapper-success")
                element.parentElement.firstChild.nextElementSibling.classList.add("input-image-wrapper-error")
        },
        unhighlight: function(element, errorClass, validClass) {
                element.parentElement.parentElement.nextElementSibling.innerText = "";
                element.parentElement.parentElement.classList.add(validClass)
                element.parentElement.parentElement.classList.remove(errorClass)
                element.parentElement.firstChild.nextElementSibling.classList.add("input-image-wrapper-success")
                element.parentElement.firstChild.nextElementSibling.classList.remove("input-image-wrapper-error")
        },
        rules: {
            'Password': {
                required: true,
                noSpace:true,
                pattern: "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z]).*$"
            },
            'PasswordConfirmation': {
                equalTo: "#reset-password",
                noSpace:true,
                required: true,
                pattern: "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z]).*$"
            },
        },
        messages: {
            'Password': {
                required: "Şifreni doldurmalısın",
                pattern: "Şifren en az 8 karakter uzunluğunda olmalı, 1 adet büyük ve 1 adet küçük harf içermeli"
            },
            'PasswordConfirmation': {
                required: "Şifreni boş bırakmamalısın, sonra nasıl gireceksin? :)",
                pattern: "Şifre en az 8 karakter uzunluğunda olmalı, 1 adet büyük ve 1 adet küçük harf içermeli",
                equalTo: "Girdiğin şifreler aynı olmalı sonra sıkıntı yaşama :)"
            },
        }
    });
})