let currentIndex = 0;
const cardItems = document.querySelectorAll('.card-carousel-item');

function prevCard() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = cardItems.length - 1;
  }
  updateCarousel();
}

function nextCard() {
  currentIndex++;
  if (currentIndex >= cardItems.length) {
    currentIndex = 0;
  }
  updateCarousel();
}

function updateCarousel() {
  const cardCarouselSlider = document.querySelector('.card-carousel-slider');
  const itemWidth = cardItems[0].offsetWidth;
  const translateX = -1 * currentIndex * itemWidth;
  cardCarouselSlider.style.transform = `translateX(${translateX}px)`;
}
