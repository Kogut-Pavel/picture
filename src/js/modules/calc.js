import {clearState} from "../services/services";

const calc = (size, material, option, promocode, result, trigger, state) => {
    const sizeBlock = document.querySelector(size);
    const materialBlock = document.querySelector(material);
    const optionBlock = document.querySelector(option);
    const promocodeBlock = document.querySelector(promocode);
    const resultBlock = document.querySelector(result);
    const btn = document.querySelector(trigger);
    let calc = document.querySelectorAll('.calc select');
    let sum = 0;

    btn.disabled = true;

    function updateObject(select, key, block) {
        if (select.getAttribute('id') === key) {
            state[key] = block.value;
        }
    }

    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionBlock.value));

        if (sizeBlock.value === '' || materialBlock.value === '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
            btn.disabled = true;
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);

        } else {
            resultBlock.textContent = sum;
            btn.disabled = false;
            if (sizeBlock.value && materialBlock.value || sizeBlock.value && materialBlock.value && promocodeBlock.value) {
                state.result = sum;
            }
        }

        if (promocodeBlock.value === "IWANTPOPART") {
            state.promo = promocodeBlock.value;
        } else {
            state.promo = false;
        }

        calc.forEach(select => {
            updateObject(select, 'size', sizeBlock);
            updateObject(select, 'material', materialBlock);
            updateObject(select, 'option', optionBlock);
        });

        console.log(state);
    };

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);

};

export default calc;