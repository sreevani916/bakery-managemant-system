function login() {
    const username = $('.username').val();
    const password = $('.password').val();
    if(checkCredentials(username, password)){
        console.log(true)
        $.cookie('login', 'admin');
    }
}

function checkCredentials(user, pass) {
    if (user === 'admin' && pass === 'admin') {
        return true;
    }
    return false
}