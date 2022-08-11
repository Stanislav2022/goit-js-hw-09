const btnStartEl = document.querySelector('[data-start]')
const btnStoptEl = document.querySelector('[data-stop]')
const bodyEl = document.querySelector('body')
let timerId = null;

btnStoptEl.setAttribute('disabled', true);

btnStartEl.addEventListener('click', () => {
  timerId = setInterval(() => {
      bodyEl.style.background = getRandomHexColor();
      }, 1000);
      btnStartEl.setAttribute('disabled', true);
      btnStoptEl.removeAttribute('disabled')

})

btnStoptEl.addEventListener("click", () => {
    clearInterval(timerId);
    btnStartEl.removeAttribute('disabled')
    btnStoptEl.setAttribute('disabled', true);
     });


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

