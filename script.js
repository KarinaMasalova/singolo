const MENU = document.getElementById('menu');
const SUBMIT_BUTTON = document.getElementById('submit');

MENU.addEventListener('click', function (event) {
    MENU.querySelectorAll('a').forEach(element => element.classList.remove('active'));
    event.target.classList.add('active');
});

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
        document.body.style.overflowY = 'hidden';
        document.getElementById('feedback-form').reset();
    }
});