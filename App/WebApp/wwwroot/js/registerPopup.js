[...document.querySelectorAll('.input-wrapper')].forEach(function(item) {
    item.addEventListener('click', function(elem) {
        let getElemWithClass = document.querySelector('.input-active');
        if (getElemWithClass !== null) {
            getElemWithClass.classList.remove('input-active');
        }
        item.classList.add('input-active')
        item.childNodes[1].childNodes[3].focus();
    })
});
[...document.querySelectorAll('.register-popup-input')].forEach(function(item) {
    item.addEventListener('blur', function(elem) {
        item.parentElement.parentElement.classList.remove('input-active');
    })
})

function showRegisterPopup(){
    document.getElementById("popup-background").style.height=height+"px";
    document.getElementById("popup-background").style.display="block";
    document.getElementById("register-popup-wrapper").style.display="flex";
    disableScroll();
}
function closeRegisterPopup(){
    document.getElementById("popup-background").style.display="none";
    document.getElementById("register-popup-wrapper").style.display="none";
    enableScroll();
}

function registerPopupRegister(){
    $("#register-popup-form").submit();
    if(!$("#register-popup-form").valid()){
        return;
    }
    let nickname = document.getElementById("nickname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let passwordConfirmation = document.getElementById("password-confirmation").value;
    var data = {
        nickname:nickname,
        email:email,
        password:password,
        passwordConfirmation:passwordConfirmation,
        terms:true
    };
    $.ajax({
        url: '/register',
        type: "post",
        data: data,
        async: false,
        success: function (result) {
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
}

const simulateSomeAsyncFunction = new Promise((resolve, reject) => {
    const startTime = Date.now();
    setTimeout(() => {
        resolve(Date.now() - startTime);
    }, 30000);
});

simulateSomeAsyncFunction.then(msElapsed => {
    $.ajax({
        url: '/Auth/GetCurrentUser',
        type: "get",
        async: false,
        success: function (result) {
            if (result == null) {
                if (window.location.href.indexOf("register") == -1) {
                    showRegisterPopup();
                }
                return;
            } 
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
});