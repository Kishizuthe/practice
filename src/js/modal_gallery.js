;(function(){
  document.addEventListener('DOMContentLoaded',init)

  function init(){
    var modal = document.querySelector('.modal')
    var modalTriggerArray = document.querySelectorAll('.c_js_show-sample-img')

    if (!modal || !modalTriggerArray.length) return

    var closeModal = function (){
      modal.classList.remove('active')
      document.documentElement.classList.remove('isMode')
    }

    var showModal = function (){
      modal.classList.add('active')
      document.documentElement.classList.add('isMode')
    }

    modalTriggerArray = Array.prototype.slice.call(modalTriggerArray)
    modalTriggerArray.forEach(function(modalTrigger){
      modalTrigger.addEventListener('click',function(){
        showModal(modal)
      })
    })

    if (modalTriggerArray.length == 1) return

    var modalSwiper = new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      effect: 'fade',
      navigation: {
        nextEl: '.modal .next',
        prevEl: '.modal .prev',
      }
    })

    document.querySelector('.modal').addEventListener('click',function(event){
      if (/close/.test(event.target.classList)) {
        closeModal(modal)
      }
    })

    Array.prototype.slice.call(document.querySelectorAll('[data-img-index]')).forEach(function (thumb, i){
      thumb.addEventListener('click',function(e){
        modalSwiper.slideTo(parseInt(e.currentTarget.dataset.imgIndex) + 1)
      })
    })
  }
}())
