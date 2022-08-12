import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btn = document.querySelector('[data-start]');
const valueDays = document.querySelector('[data-days]');
const valueHours = document.querySelector('[data-hours]');
const valueMinutes = document.querySelector('[data-minutes]');
const valueSeconds = document.querySelector('[data-seconds]');

const timerEl = document.querySelector('.timer');
const fieldsEl = document.querySelectorAll('.field');
timerEl.style.cssText = "color: red; display: flex; font-size: 20px; padding: 10px";
for (const field of fieldsEl) {
    field.style.display = 'flex';
    field.style.flexDirection = 'column';
    field.style.alignItems = 'center';
    field.style.padding = "15px"
}
let timerId = null;
btn.setAttribute('disabled', true);
let today = new Date()
let delta = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const chooseDate = selectedDates[0]
       if(chooseDate < today) {
        Notify.failure('Please choose a date in the future');
        btn.setAttribute('disabled', true);
        return
      }
      btn.removeAttribute('disabled')
      btn.addEventListener('click', () => {
        timerId = setInterval(() => {
            let today = new Date();
            let delta = chooseDate - today;
            btn.setAttribute('disabled', true);
            if (delta <= 0) {
                clearInterval(timerId)
                delta = 0;
                return
              }
            convertMs(delta)
           }, 1000);
      });
      
    },
   };
  flatpickr("#datetime-picker", options);
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
   
    const days = addLeadingZero(Math.floor(ms / day));
    valueDays.textContent = days;
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    valueHours.textContent = hours;
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    valueMinutes.textContent = minutes;
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    valueSeconds.textContent = seconds;
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  

