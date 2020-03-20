const MENU = document.getElementById('menu');
const HEADER = document.querySelector('.header-block');
const SERVICES = document.getElementById('services');
const PORTFOLIO = document.getElementById('portfolio');
const ABOUT_US = document.getElementById('about');
const CONTACT = document.getElementById('contact');

const SLIDES = document.querySelectorAll('.slide');
let currentSlide = 0;
let isEnabled = true;

const VERTICAL_iPHONE = document.getElementById('vertical-iphone');
const HORIZONTAL_iPHONE = document.getElementById('horizontal-iphone');

const VERTICAL_SCREEN = document.getElementById('vertical-screen');
const HORIZONTAL_SCREEN = document.getElementById('horizontal-screen');

const PORTFOLIO_TABS = document.getElementById('portfolio-nav-buttons');

const SUBMIT_BUTTON = document.getElementById('submit');

/*menu anchors*/
MENU.addEventListener('click', function (event) {
    MENU.querySelectorAll('a').forEach(element => element.classList.remove('active'));
    event.target.classList.add('active');
});

/*switching menu while scrolling*/

window.addEventListener('scroll', () => {
    if(window.scrollY < SERVICES.offsetTop - HEADER.offsetHeight) {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        document.getElementById('home-scroll').classList.add('active');
    }
    if(window.scrollY >= SERVICES.offsetTop - HEADER.offsetHeight && window.scrollY < PORTFOLIO.offsetTop - HEADER.offsetHeight) {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        document.getElementById('services-scroll').classList.add('active');
    }
    if(window.scrollY >= PORTFOLIO.offsetTop - HEADER.offsetHeight) {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        document.getElementById('portfolio-scroll').classList.add('active');
    }
    if(window.scrollY >= ABOUT_US.offsetTop - HEADER.offsetHeight) {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        document.getElementById('about-scroll').classList.add('active');
    }
    if(window.scrollY >= CONTACT.offsetTop - HEADER.offsetHeight) {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        document.getElementById('contact-scroll').classList.add('active');
    }
});

/*slider*/
function changeCurrentSlide(n) {
    currentSlide = (n + SLIDES.length) % SLIDES.length;
}

function hideSlide(direction) {
    isEnabled = false;
    SLIDES[currentSlide].classList.add(direction);
    SLIDES[currentSlide].addEventListener('animationend', function() {
        this.classList.remove('active-slide', direction);
    });
}

function showSlide(direction) {
    SLIDES[currentSlide].classList.add('next-slide', direction);
    SLIDES[currentSlide].addEventListener('animationend', function() {
        this.classList.remove('next-slide', direction);
        this.classList.add('active-slide');
        isEnabled = true;
    });
}

function previousSlide(n) {
    hideSlide('to-right');
    changeCurrentSlide(n - 1);
    showSlide('from-left');
}

function nextSlide(n) {
    hideSlide('to-left');
    changeCurrentSlide(n + 1);
    showSlide('from-right');
}

document.querySelector('.previous-arrow a img').addEventListener('click', function() {
    if(isEnabled) {
        previousSlide(currentSlide);
    }
});

document.querySelector('.next-arrow a img').addEventListener('click', function() {
    if(isEnabled) {
        nextSlide(currentSlide);
    }
});

/*iphone buttons to switch off the screen*/

HORIZONTAL_iPHONE.addEventListener ('click', function (event) {
    if (HORIZONTAL_SCREEN.style.display == 'none') {
        HORIZONTAL_SCREEN.style.display = 'inherit';
    } else {
        HORIZONTAL_SCREEN.style.display = 'none';
    }
});

VERTICAL_iPHONE.addEventListener ('click', function (event) {
    if (VERTICAL_SCREEN.style.display == 'none') {
        VERTICAL_SCREEN.style.display = 'inherit';
    } else {
        VERTICAL_SCREEN.style.display = 'none';
    }
});

/*switching tabs*/

PORTFOLIO_TABS.addEventListener('click', (event) => {
    PORTFOLIO_TABS.querySelectorAll('p').forEach(element => element.classList.remove('active-tab'));
    event.target.classList.add('active-tab');
});

/*submit form*/

SUBMIT_BUTTON.addEventListener('click', (event) => {
    if (document.getElementById('name').value !== '' && document.getElementById('email').value !== '') {
        event.preventDefault(); //remove default behaviour
        const subject = document.getElementById('subject').value.toString();
        const description = document.getElementById('description').value.toString();
        document.getElementById('first-result').innerText = 'Письмо отправлено';
        
        if(subject !== '') {
            document.getElementById('second-result').innerText = 'Тема: ' + subject;
        } else {
            document.getElementById('second-result').innerText = 'Без темы';
        }
        
        if(description !== '') {
            document.getElementById('third-result').innerText = 'Описание: ' + description;
        } else {
            document.getElementById('third-result').innerText = 'Без описания';
        }

        document.getElementById('message-block').classList.remove('hidden');
        document.getElementById('feedback-form').reset();
    }
});