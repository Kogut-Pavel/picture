const calcScroll = () => {
    let div = document.createElement('div');
    div.style.cssText = `
            width: 50px;
            height: 50px;
            overflow-y: scroll;
            visibility: hidden;
        `;
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
};

function modifyBody(flow, scroll) {
    document.body.style.overflow = flow;
    document.body.style.marginRight = `${scroll}px`;
}

// Всем инпутам с вводом телефона разрешаем только цифры
const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
};

// Всем инпутам с вводом текста/имени разрешаем только русские буквы
const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.match(/[a-z]/ig)) {
                input.value = '';
            }
        });
    });
};

const clearInputs = () => { // Очищаем инпуты
    const inputs = document.querySelectorAll('input');
    const upload = document.querySelectorAll('[name="upload"]'); // Инпуты с загрузкой изображения
    inputs.forEach(item => {
        item.value = '';
    });
    upload.forEach(item => {
        item.previousElementSibling.textContent = "Файл не выбран";
    });
};

const closeModals = () => {
    // Скрываем все модальные окна и возвращаем скролл
    const windows = document.querySelectorAll('[data-modal]');
    windows.forEach(item => {
        item.style.display = 'none';
        item.classList.add('animated', 'fadeIn');
        document.body.style.overflow = "";
    });
};



export {calcScroll};
export {modifyBody};
export {checkNumInputs};
export {checkTextInputs};
export {clearInputs};
export {closeModals};
