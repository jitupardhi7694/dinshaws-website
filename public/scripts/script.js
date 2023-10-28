// This file contains javascripts that is called in front-end by the pages.

// function enable/disable submit button when terms and conditions is checked
function TermsCheck() {
  let chkbox = document.getElementById('chkForm');
  var btnSubmit = document.getElementById('btnSubmit');
  if (chkbox.checked) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
}

function scroll2Header() {
  // console.log('hash changed');
  scrollBy(0, -150);
}

// this will run on page load after 5seconds to remover alerts shown on page load
window.addEventListener('load', () => {
  window.setTimeout(hideAlerts, 5000);
});

function hideAlerts() {
  console.log('hideAlerts called');
  const alerts = document.getElementsByClassName('alert');
  [...alerts].forEach(function (alert) {
    alert.classList.add('animate__animated', 'animate__fadeOutUp', 'animate__delay-4s');
    alert.addEventListener('animationend', () => {
      alert.remove();
    });
  });
}

(function () {
  //**
  //    *Teams slider
  //    *
  //    */
  //   const teams = new Swiper('.slider-teams', {
  //     speed: 500,
  //     loop: true,
  //     autoplay: {
  //       delay: 1500,
  //       disableOnInteraction: false,
  //     },
  //     breakpoints: {
  //       // when window width is >= 576px
  //       576: {
  //         slidesPerView: 2,
  //       },
  //       // when window width is >= 768px
  //       768: {
  //         slidesPerView: 4,
  //       },
  //       // when window width is >= 992
  //       992: {
  //         slidesPerView: 5,
  //       },
  //     },
  //   });
  //   const testimonials = new Swiper('.slider-tests', {
  //     speed: 1700,
  //     loop: true,
  //     effect: 'cube',
  //     direction: 'vertical',
  //     autoplay: {
  //       delay: 5000,
  //       disableOnInteraction: false,
  //     },
  //     slidesPerView: 1,
  //     pagination: {
  //       el: '.swiper-pagination',
  //     },
  //   });
  /**
   * Animation on scroll
   */
  // window.addEventListener('load', () => {
  //   AOS.init({
  //     duration: 1000,
  //     easing: 'ease-in-out',
  //     once: true,
  //     mirror: false,
  //   });
  // });
})();
