import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector('form');
form.addEventListener('submit', prom);
const time = document.querySelector('[name="delay"]');
const inputone = document.querySelector('[value="fulfilled"]');
const inputtwo = document.querySelector('[value="rejected"]');
//console.log(inputone.checked);
//console.log(time);

function prom(evt) {
    evt.preventDefault();
    const timeqwerty = time.value;
    const oneprom = new Promise((res, rej) => {
        if (evt.target[2].checked) {
            const interval = setTimeout(() => {
                iziToast.show({
                    color: '#59A10D',
                    position: 'topRight',
                    title: 'OK',
                    message: 'Fulfilled promise in ' + timeqwerty + 'ms'
                });
                res('true');
                console.log(timeqwerty)}, timeqwerty
            );
        } else {
            rej('false');
            const interval = setTimeout(() => {
                iziToast.show({
                    color: '#ef4040',
                    position: 'topRight',
                    title: 'Error',
                    message: 'Rejected promise in ' + timeqwerty + 'ms'
                })}, timeqwerty
            );
        }
    });
};