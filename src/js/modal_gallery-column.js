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
        showModal()
      })
    })

    if (modalTriggerArray.length == 1) return

    var thumbSwiper = new Swiper('.swiper-container', {
      loop: false,
      centeredSlides: false,
      spaceBetween: 10,
      slidesPerView: 10,
      breakpoints: {
        1200: {
          slidesPerView: 8.5,
        },
        980: {
          slidesPerView: 5.5,
        },
        768: {
          slidesPerView: 3.5,
          slidesPerGroup: 3,
        },
      }
    })

    document.querySelector('.modal').addEventListener('click',function(event){
      if (/close/.test(event.target.classList)) {
        closeModal()
      }
    })

    Array.prototype.slice.call(document.querySelectorAll('[data-img-index]')).forEach(function (thumb, i){
      thumb.addEventListener('click',function(e){
        modal.scrollTop = e.currentTarget.dataset.imgIndex == 0 ? 0 : modal.querySelectorAll('li')[parseInt(e.currentTarget.dataset.imgIndex)].offsetTop
        // parseInt(e.currentTarget.dataset.imgIndex)
      })
    })
  }



  // $(function(){
  //   // モーダル開く
  //   $('.Card-Item').on('click', function(){
  //     var index = $(this).index();//クリックした要素のインデックスを取得
  //     swiper.slideTo(index);//指定のスライドを呼び出し
  //     $('.ModalLayer').addClass('isShow');
  //   });
  //   $('.ModalLayer-Mask').on('click', function(){
  //     $('.ModalLayer').removeClass('isShow');
  //   });
  //   $('.JS_Click_CloseModal_Trigger').on('click', function(){
  //     $('.ModalLayer').removeClass('isShow');
  //   });
  // });

}())
