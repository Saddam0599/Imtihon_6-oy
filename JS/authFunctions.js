const form = document.forms[0];

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const loginButton = document.getElementById('login-button');

form.onsubmit = login;
async function login(event) {
    event.preventDefault();

    const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameInput.value,
            password: passwordInput.value,
        }),
    });

    const result = await response.json();
    localStorage.setItem('token', result.token);

    const hasToken = checkToken();
    if (hasToken) {
        window.location = '/index.html';
    }
}

function checkToken() {
    const token = localStorage.getItem('token');

    return Boolean(token);
}

usernameInput.oninput = function (event) {
    console.log(event.target.value);
};

passwordInput.oninput = function (event) {
    console.log(event.target.value);
};

