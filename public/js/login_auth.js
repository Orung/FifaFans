// const errorMessage  = document.getElementById('error-message');
const loginButton = document.getElementById('login-button');
// const email = document.getElementById('email');
// const password = document.getElementById('password');

if (loginButton) {
    loginButton.addEventListener('click', submit);
}




function submit(e) {
    tata.info('Signing In', 'Please wait while we are login you in', {
          duration: 3000
        })
    e.preventDefault();

    if (!email.value || password.value === "") {
        errorMessage.innerHTML = 'Please enter all fields';
        if (errorMessage.style.display == 'none') {
            errorMessage.style.display = 'block'
        }
        setTimeout(function() {
            errorMessage.style.display = 'none';
        }, 10000);

    } else {
        console.log(email.value, password.value);
        // this where the post to server will occur
        const formData = new FormData();
        formData.append('email', email.value);
        formData.append('password', password.value);
        fetch('/api/v1/auth/signin', {
                method: "POST",
                body: formData,
            })
            .then(res => res.json())
            .then(x => {
                console.log(x);
                if (x.status != 'error') {
                    console.log(x.data.token);
                    localStorage.setItem('token', x.data.token)
                    document.getElementById('success-message').innerHTML = 'Login successful';
                    return window.location.href = '/';
                } else {
                    errorMessage.innerHTML = x.error;
                    if (errorMessage.style.display == 'none') {
                        errorMessage.style.display = 'block'
                    }
                }
            })
    }
}