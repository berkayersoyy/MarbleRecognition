$(document).ready(function() {
    jQuery.validator.addMethod("noSpace", function(value, element) {
        return value.indexOf(" ") < 0 && value != "";
    }, "Boşluk içeremez");
    $("#forgot-password-form").validate({
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
            'Email': {
                required: true,
                noSpace:true,
                email: true,
            },
        },
        messages: {
            'Email': {
                required: "Eposta adresi boş bırakılamaz",
                email: "Geçerli bir eposta adresi girer misin?",
            },
        }
    });
})