const btnStartEl = document.querySelector('[data-start]')
const btnStoptEl = document.querySelector('[data-stop]')
const bodyEl = document.querySelector('body')

btnStoptEl.setAttribute('disabled', true);

btnStartEl.addEventListener('click', () => {
    timerId = setInterval(() => {
      btnStartEl.setAttribute('disabled', true);
      btnStoptEl.removeAttribute('disabled')
        bodyEl.style.background = getRandomHexColor();
      }, 1000);

})

btnStoptEl.addEventListener("click", () => {
    btnStartEl.removeAttribute('disabled')
    btnStoptEl.setAttribute('disabled', true);
    clearInterval(timerId);

     });


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

