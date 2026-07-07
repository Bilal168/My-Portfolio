/* ============================================
   PAGE LOADER
   ============================================ */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hide'), 300);
});

/* ============================================
   CONTACT BUTTON POPUP
   ============================================ */
function contact() {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
}

/* ============================================
   NAVBAR: scroll shadow + mobile toggle + active link
   ============================================ */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    toggleBackToTop();
    updateActiveLink();
});

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinkEls.forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

function updateActiveLink() {
    const sections = document.querySelectorAll('.section, .hero');
    let current = 'home';
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
            current = sec.id;
        }
    });
    navLinkEls.forEach(link => {
        link.classList.toggle('active', link.dataset.section === current);
    });
}

/* ============================================
   TYPING ANIMATION
   ============================================ */
const roles = [
    'AI Automation Systems',
    'Full-Stack Web Apps',
    'Computer Vision Tools',
    'Practical AI Solutions'
];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1600);
            return;
        }
    } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(typeLoop, deleting ? 40 : 70);
}
typeLoop();

/* ============================================
   THEME TOGGLE (dark / light)
   ============================================ */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    if (next === 'dark') {
        root.removeAttribute('data-theme');
    } else {
        root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('portfolio-theme', next);
});

/* ============================================
   SCROLL REVEAL
   ============================================ */
const revealEls = document.querySelectorAll('[data-reveal]');
const skillGroups = document.querySelectorAll('.skill-group');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillGroups.forEach(el => skillObserver.observe(el));

/* ============================================
   BACK TO TOP
   ============================================ */
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
    backToTop.classList.toggle('show', window.scrollY > 500);
}

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   PROJECT DETAILS MODAL
   ============================================ */
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalContactBtn = document.getElementById('modalContactBtn');

function openProjectModal() {
    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeProjectModal);

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) closeProjectModal();
});

modalContactBtn.addEventListener('click', closeProjectModal);

/* ============================================
   CONTACT FORM VALIDATION
   ============================================ */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    valid = validateField(name, name.value.trim().length >= 2, 'nameError', 'Please enter your name (min 2 characters).') && valid;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    valid = validateField(email, emailPattern.test(email.value.trim()), 'emailError', 'Please enter a valid email address.') && valid;

    valid = validateField(message, message.value.trim().length >= 10, 'messageError', 'Message should be at least 10 characters.') && valid;

    if (valid) {
        formSuccess.classList.add('show');
        form.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }
});

function validateField(field, isValid, errorId, message) {
    const errorEl = document.getElementById(errorId);
    const wrapper = field.closest('.form-field');
    if (!isValid) {
        wrapper.classList.add('invalid');
        errorEl.textContent = message;
        return false;
    }
    wrapper.classList.remove('invalid');
    errorEl.textContent = '';
    return true;
}