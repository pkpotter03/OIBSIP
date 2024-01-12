// Dummy data structure to store user information
const users = [];

function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users.some(user => user.username === username)) {
        alert('Username is already taken. Choose another one.');
        return;
    }

    const hashedPassword = hashAndSaltPassword(password);

    const user = {
        username: username,
        password: hashedPassword
    };

    users.push(user);

    sessionStorage.setItem('loggedInUser', JSON.stringify(user));

    window.location.href = 'index.html';
}

function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (storedUser && storedUser.username === username && comparePasswords(password, storedUser.password)) {
        window.location.href = 'securedPage.html';
    } else {
        alert('Incorrect username or password');
    }
}


function hashAndSaltPassword(password) {
    return password;
}

function comparePasswords(enteredPassword, storedPassword) {
    return enteredPassword === storedPassword;
}
