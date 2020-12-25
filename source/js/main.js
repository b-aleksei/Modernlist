import Swiper from 'swiper/bundle';

new Swiper('.slider__container', {
	loop: true,
  spaceBetween: 40,

	navigation: {
		nextEl: '.slider__btn--forward',
		prevEl: '.slider__btn--back',
	},
})
