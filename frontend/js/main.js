function login() {
    const username = $('.username').val();
    const password = $('.password').val();
    console.log(username)
    if(username==''  || password==''){
        prompt("Please fill credentials");
        return;
    }
    if (checkCredentials(username, password)) {
        window.location.href = 'portal/main.html';
        sessionStorage.setItem('login','admin')
        return;
    }
    prompt('Wrong Username or password!!');
}

function checkCredentials(user, pass) {
    if (user === 'admin' && pass === 'admin') {
        return true;
    }
    return false
}