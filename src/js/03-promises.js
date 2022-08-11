import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');
const button = document.querySelector("button")

let delay = 0;
let step = 0;
let amount = 0;

delayEl.addEventListener('input', (e) => {
  delay = Number(delayEl.value);
  })
stepEl.addEventListener('input', (e) => {
  step = Number(stepEl.value);
})
amountEl.addEventListener('input', (e) => {
   amount = Number(amountEl.value);
})



function handleSubmit (evt) { 
  evt.preventDefault();
  for (let position = 1 ; position <= amount; position += 1) {


    createPromise(position, delay).then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notiflix.Notify.success(`❌ Rejected promise ${position} in ${delay}ms`)
    });

    delay += step;
  }
  delay = Number(delayEl.value);  
 }  


function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
  }, delay);
  });
}


button.addEventListener('click', handleSubmit)