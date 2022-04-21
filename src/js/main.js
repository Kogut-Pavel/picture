import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from "./modules/mask";
import showMoreStyles from "./modules/showMoreStyles";
import calc from "./modules/calc";
import filter from "./modules/filter";

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let formState = {};

    modals();
    sliders('.main-slider-item', 'vertical');
    sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
    forms(formState);
    mask('[name="phone"]');
    showMoreStyles('#styles .row', '.button-styles');
    calc('#size', '#material', '#option', '.promocode', '.calc-price', '[data-calc]', formState);
    filter();
});