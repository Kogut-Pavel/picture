import {closeModals} from "./services/services";
import {clearInputs} from "./services/services";
import {calcScroll} from "./services/services";
import {modifyBody} from "./services/services";

const modals = () => {

    let btnPressed = false;


    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (event) => {
                if (event.target) {
                    event.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }

                closeModals();
                modal.style.display = "block";
                modifyBody('hidden', scroll);
            });
        });

        close.addEventListener('click', () => {
            closeModals();
            clearInputs();
            modifyBody('', 0);
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModals();
                clearInputs();
                modifyBody('', 0);
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
               if (getComputedStyle(item).display !== 'none') {
                    display = "block";
               }
            });

            if (!display) {
                document.querySelector(selector).style.display = "block";
                document.body.style.overflow = "hidden";
            }
        }, time);
    }
    // Когда скроллим страницу до конца, открывается модальное окно с подарком
    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
             if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
             }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    showModalByTime('.popup-consultation', 60000);
};

export default modals;