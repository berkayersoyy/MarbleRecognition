$(document).ready(function() {
    jQuery.validator.addMethod("trimEmpty", function(value, element) {
        return value.trim()!="" && value != "";
    }, "Boşluk içeremez");
    $("#comment-form").validate({
        errorClass: 'input-wrapper-error',
        validClass: 'input-wrapper-success',
        errorPlacement: function(error, element) {
            
        },
        highlight: function(element, errorClass, validClass) {
                element.parentElement.classList.remove(validClass)
                element.parentElement.classList.add(errorClass)
        },
        unhighlight: function(element, errorClass, validClass) {
                element.parentElement.classList.add(validClass)
                element.parentElement.classList.remove(errorClass)
        },
        rules: {
            'Comment': {
                required: true,
                trimEmpty:true,
            },
        },
        messages: {
            'Nickname': {
                required: "Boş bir yorum yapmak istemezsin değil mi?",
            },
        }
    });
})