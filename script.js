// Get elements
const fbBtn = document.querySelector('.facebook');
const googleBtn = document.querySelector('.google');
const errorMessage = document.getElementById('error-message');
const signupForm = document.getElementById('signup-form');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const passwordError = document.getElementById('password-error');

// Social login error message
function showError() {
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

// Attach social button error listeners
fbBtn.addEventListener('click', showError);
googleBtn.addEventListener('click', showError);

// Form submit handler
signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Check if passwords match
    if (password.value !== confirmPassword.value) {
        passwordError.style.display = 'block';
        confirmPassword.value = '';
        confirmPassword.focus();
        return;
    }

    passwordError.style.display = 'none';

    // Send data to Node.js server
    const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: password.value
        })
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message); // show success message
        signupForm.reset();
    } else {
        alert(data.error); // show error from backend
    }
});
// Improve
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  if (!signupForm) return;  // agar page pe form nahi hai, exit

  signupForm.addEventListener('submit', e => {
    // default HTML submit chalta rahega; optional: preventDefault + fetch() bhi use kar sakte
  });
});
