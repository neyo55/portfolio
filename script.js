// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Form Submission with Success Message
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        formMessage.style.display = 'block';
        formMessage.style.color = '#1a3c34';
        formMessage.textContent = 'Thank you for your message! I’ll get back to you soon.';
        contactForm.reset();
    } else {
        formMessage.style.display = 'block';
        formMessage.style.color = '#ff6b6b';
        formMessage.textContent = 'Oops! Something went wrong. Please try again.';
    }
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'light-mode') {
        themeIcon.src = 'https://img.icons8.com/ios-filled/50/000000/moon-symbol.png';
        themeIcon.alt = 'Toggle to dark mode';
    }
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.src = 'https://img.icons8.com/ios-filled/50/000000/moon-symbol.png';
        themeIcon.alt = 'Toggle to dark mode';
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.src = 'https://img.icons8.com/ios-filled/50/ffffff/sun.png';
        themeIcon.alt = 'Toggle to light mode';
        localStorage.setItem('theme', 'dark-mode');
    }
});

// Email reveal functionality with random CAPTCHA
// Generate random numbers between 1 and 10 for the math question
const num1 = Math.floor(Math.random() * 10) + 1;
const num2 = Math.floor(Math.random() * 10) + 1;
const correctAnswer = num1 + num2;

// Update the label with the random question
const captchaLabel = document.querySelector('#email-security-check label');
captchaLabel.textContent = `What is ${num1} + ${num2}? (Security Check)`;

document.getElementById('reveal-email').addEventListener('click', function(event) {
    event.preventDefault();
    const answer = document.getElementById('captcha-answer').value;
    const errorMessage = document.getElementById('captcha-error');
    const emailPlaceholder = document.getElementById('email-placeholder');
    const securityCheck = document.getElementById('email-security-check');

    if (parseInt(answer) === correctAnswer) {
        emailPlaceholder.innerHTML = '<a href="mailto:rufai_adeniyi@yahoo.co.uk">rufai_adeniyi@yahoo.co.uk</a>';
        securityCheck.style.display = 'none'; // Hide the security check form
        errorMessage.style.display = 'none';
    } else {
        errorMessage.style.display = 'block';
        document.getElementById('captcha-answer').value = ''; // Clear the input
    }
});