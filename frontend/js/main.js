
function validate() {
    var input = $('.validate-input .input100');
    var check = true;
    for (var i = 0; i < input.length; i++) {
        if (notEmpty(input) == false) {
            showValidate(input[i]);
            check = false;
        }
    }


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    return check;
}


function notEmpty(input) {
    if ($(input).val().trim() == '') {
        return false;
    }
    return true;
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

function login() {
    if (validate()) {
        let input = $('.validate-input .input100');
        let username;
        let password;
        for (var i = 0; i < input.length; i++) {
            if (input[i].name == 'username') {
                username = input[i].value
            } else {
                password = input[i].value
            }

        }
        if(checkCredentials(username, password)){
            window.location ='portal.html'
        }

        // call function here for login
        // console.log('login called', username, password);
    }
}

function checkCredentials(user, pass) {
    // check validation crdentials
    return true
}