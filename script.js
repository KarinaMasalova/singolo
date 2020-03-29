const MENU = document.getElementById('menu');
const HEADER = document.querySelector('.header-block');
const SERVICES = document.getElementById('services');
const PORTFOLIO = document.getElementById('portfolio');
const ABOUT_US = document.getElementById('about');
const CONTACT = document.getElementById('contact');

const POPUP_MENU = document.querySelector('.navbar');
const BURGER = document.querySelector('.header-burger');

const SLIDES = document.querySelectorAll('.slide');
let currentSlide = 0;
let isEnabled = true;

const VERTICAL_iPHONE = document.getElementById('vertical-iphone');
const HORIZONTAL_iPHONE = document.getElementById('horizontal-iphone');

const VERTICAL_SCREEN = document.getElementById('vertical-screen');
const HORIZONTAL_SCREEN = document.getElementById('horizontal-screen');

const PORTFOLIO_TABS = document.querySelectorAll('.portfolio-button');
const PORTFOLIO_PICTURES = document.querySelector('.portfolio-projects-container');

let isActive = true;
const portfolioIMG = PORTFOLIO_PICTURES.querySelectorAll(".portfolio-project");

const SUBMIT_BUTTON = document.getElementById('submit');
const CLOSE_BTN = document.querySelector('.message-block-btn');

/*switching menu while scrolling*/

window.addEventListener('scroll', () => {
    let currentPosition = window.scrollY + 95;
    if(currentPosition < SERVICES.offsetTop - HEADER.offsetHeight) {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        document.getElementById('home-scroll').classList.add('active');
    }
    if(currentPosition >= SERVICES.offsetTop - HEADER.offsetHeight && currentPosition < PORTFOLIO.offsetTop - HEADER.offsetHeight) {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        document.getElementById('services-scroll').classList.add('active');
    }
    if(currentPosition >= PORTFOLIO.offsetTop - HEADER.offsetHeight && currentPosition < ABOUT_US.offsetTop - HEADER.offsetHeight) {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        document.getElementById('portfolio-scroll').classList.add('active');
    }
    if(currentPosition >= ABOUT_US.offsetTop - HEADER.offsetHeight && currentPosition < CONTACT.offsetTop - HEADER.offsetHeight) {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        document.getElementById('about-scroll').classList.add('active');
    }
    if(currentPosition >= CONTACT.offsetTop - HEADER.offsetHeight) {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        document.getElementById('contact-scroll').classList.add('active');
    }
});

/*burger-menu*/

BURGER.addEventListener('click', (event) => {
    if (POPUP_MENU.classList.contains('navbar-active')) {
        BURGER.classList.add('burger-back');
        POPUP_MENU.classList.remove('navbar-active');
    } else {
        BURGER.classList.remove('burger-back');
        BURGER.classList.add('burger-popup');
        POPUP_MENU.classList.add('navbar-active');
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

/*switching tabs && shift pictures*/

PORTFOLIO_TABS.forEach(tab => tab.addEventListener("click", (event) => {
    if(!event.target.classList.contains("active-tab")) {
      let pictures = [...PORTFOLIO_PICTURES.querySelectorAll(".portfolio-project")];
      pictures.unshift(pictures.pop());
      pictures.forEach(img => PORTFOLIO_PICTURES.append(img));
    }
    PORTFOLIO_TABS.forEach(tab => tab.classList.remove('active-tab'));
    event.target.classList.add("active-tab");
}));

/*add borders to portfolio-pictures*/

portfolioIMG.forEach(img => img.addEventListener("click", (event) => {
  if ( event.target.classList.contains("bordered") ) {
    isActive = false;
  }

  PORTFOLIO_PICTURES.querySelectorAll("img").forEach(pic => pic.classList.remove("bordered"));
  
  if (isActive) {
    event.target.classList.add("bordered");
  }

  isActive = true;
}));


/*submit form*/

SUBMIT_BUTTON.addEventListener('click', (event) => {
    if (document.getElementById('name').value !== '' && document.getElementById('email').value !== '') {
        event.preventDefault(); //remove default behaviour
        const subject = document.getElementById('subject').value.toString();
        const description = document.getElementById('description').value.toString();
        document.getElementById('first-result').innerText = 'The letter was sent';

        if(subject !== '') {
            document.getElementById('second-result').innerText = 'Subject: ' + subject;
        } else {
            document.getElementById('second-result').innerText = 'No subject';
        }
        
        if(description !== '') {
            document.getElementById('third-result').innerText = 'Description: ' + description;
        } else {
            document.getElementById('third-result').innerText = 'No description';
        }
        
        document.getElementById('message-block').classList.remove('hidden');
    }
});

CLOSE_BTN.addEventListener("click", () => {
    document.getElementById('message-block').add('hidden');
});