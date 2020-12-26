import Swiper from 'swiper/bundle';

new Swiper('.slider__container', {
	loop: true,
  spaceBetween: 40,

	navigation: {
		nextEl: '.slider__btn--forward',
		prevEl: '.slider__btn--back',
	},
})

const listItem = document.querySelectorAll('.service__list li');
let delay = 0;

window.addEventListener('load', () => {
  listItem.forEach(item => {
    item.style.animationDelay = `${delay += 0.1}s`;
    item.classList.add('fade-in')
  })
});
