import {checkNumInputs} from "../services/services";
import {clearInputs} from "../services/services";
import {checkTextInputs} from "../services/services";
import {postData} from "../services/requests";

const forms = () => {
    const form = document.querySelectorAll('form');
    const upload = document.querySelectorAll('[name="upload"]');

    checkNumInputs('input[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');

    const message = { // Объект со статусами
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: '../assets/img/spinner.gif',
        ok: '../assets/img/ok.png',
        fail: '../assets/img/fail.png'
    };

    const path = { // Пути серверов для дизайнера и просто консультации
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }



    // Перебираем инпуты с загрузкой изображения и после добавления загрузки картинки - сокращаем её название до 10 символов
    upload.forEach(item => {
        item.addEventListener('input', () => {
           let dots;
           const arr = item.files[0].name.split('.');
           arr[0].length > 10 ? dots = '...' : dots = '.';
           const name = arr[0].substring(0, 10) + dots + arr[1];
           item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => { // Перебираем формы и навешиваем обработчик события
        item.addEventListener('submit', (event) => {
            event.preventDefault();

            // Создаем блок для оповещения пользователя о статусе
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);
            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item); // Собираем данные из формы
            let api;
            item.closest('.popup-design') || item.classList.contains('calc-form') ? api = path.designer : api = path.question;

            // Отправляем запрос на сервер с данными из formData
            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 6000);
                })
        });
    });
};

export default forms;