let offtime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //console.log("123", selectedDates[0]);
    offtime = selectedDates[0];
    if (offtime < new Date()) {
      iziToast.show({
        color: '#ef4040',
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future'
      });
    } else {
      button.disabled=false;
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
flatpickr("#datetime-picker", options);
const input = document.querySelector('input');
const button = document.querySelector('button');
button.disabled=true;
button.addEventListener('click', timer);
function timer() {
  button.disabled = true;
  input.disabled=true;
  const elem = document.querySelectorAll('.value');
  const elements = {
    day: elem[0],
    hour: elem[1],
    minute: elem[2],
    second: elem[3]
  };
  const interval = setInterval(() => {
    if (offtime - new Date() <= 0) {
      clearInterval(interval);
      input.disabled = false;
      return;
    }
    if (convertMs(offtime - new Date()).days < 10) {
      elements.day.textContent = '0' + convertMs(offtime - new Date()).days;
    }
    else {
      elements.day.textContent = convertMs(offtime - new Date()).days;
    }
    if (convertMs(offtime - new Date()).hours < 10) {
      elements.hour.textContent = '0' + convertMs(offtime - new Date()).hours;
    }
    else {
      elements.hour.textContent = convertMs(offtime - new Date()).hours;
    }
    if (convertMs(offtime - new Date()).minutes < 10) {
      elements.minute.textContent = '0' + convertMs(offtime - new Date()).minutes;
    }
    else {
      elements.minute.textContent = convertMs(offtime - new Date()).minutes;
    }
    if (convertMs(offtime - new Date()).seconds < 10) {
      elements.second.textContent = '0' + convertMs(offtime - new Date()).seconds;
    }
    else {
      elements.second.textContent = convertMs(offtime - new Date()).seconds;
    }
  }, 1000);
};