const menu = document.querySelector('.menu'),
menuItem = document.querySelectorAll('.menu__item'),
hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('menu_active');
});

menuItem.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });
});
//promo slider
$('.promo__slider').slick({
    infinite: false,
    
    responsive: [
        
        {
          breakpoint: 767,
          settings: {
            // arrows: false,
            dots: true
          }
        }
        
      ]
});
//works slider
$('.works__slider').slick({
  slidesToShow: 4,
  infinite: false,
  responsive: [
        
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 3,
        
      }
    },
    {
      breakpoint: 767,
      settings: {
        arrows: false,
        
        slidesToShow: 1,
      }
    }
    
  ]
});
//попапы наших работ
$('.works__slider').magnificPopup({
  delegate: 'a',
  type: 'image',
  closeOnContentClick: false,
  closeBtnInside: false,
  mainClass: 'mfp-with-zoom mfp-img-mobile',
  image: {
    verticalFit: true,
   
  },
  gallery: {
    enabled: true
  },
  zoom: {
    enabled: true,
    duration: 300, // don't foget to change the duration also in CSS
    opener: function(element) {
      return element.find('img');
    }
  }
  
});

//маска для телефона

let element = document.querySelectorAll('.phone');
let maskOptions = {
    mask: '+7(000)000-00-00'
};
for (let i = 0; i < element.length; i++) {
    let mask = IMask(element[i], maskOptions);
}
//modal 
$('.consult').on('click', function(){
  $('.modal, .overlay').fadeIn();
});
$('.modal__close').on('click', function(){
  $('.modal, .overlay, .thanks').fadeOut();
});

//загрузить файл
$('.myfile').change(function() {
  if ($(this).val() != '') $(this).prev().text('Выбрано файлов: ' + $(this)[0].files.length);
  else $(this).prev().text('Выберите файлы');
});

//form in modal
$('.modal__form').submit(function(e) {
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "/send.php",
		data: $(this).serialize()
	}).done(function() {
		$(this).find("input").val("");
		
		$('.modal').fadeOut();
		$('.thanks').fadeIn();
		$('.overlay').fadeIn();
	
		$('.modal__form').trigger('reset');
		
	});
	return false;
	});   

  async function submitForm(event) {
    event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
    try {
      // Формируем запрос
      const response = await fetch(event.target.action, {
        method: 'POST',
        body: new FormData(event.target)
      });
      // проверяем, что ответ есть
      if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
      // проверяем, что ответ действительно JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw ('Ошибка обработки. Ответ не JSON');
      }
      // обрабатываем запрос
      const json = await response.json();
      if (json.result === "success") {
        // в случае успеха
        // alert(json.info);
        let thanks = document.querySelector('.thanks');
        let overlay = document.querySelector('.overlay');
        thanks.style.display = 'block';
        overlay.style.display = 'block';

      } else { 
        // в случае ошибки
        console.log(json);
        throw (json.info);
      }
    } catch (error) { // обработка ошибки
      alert(error);
    }
  }  

  
//анимация
function animation() {
  gsap.registerPlugin(ScrollTrigger);

  //  gsap.to('.promo__slide1', {
  //    'background-position': '0% 0%',
  //    scrollTrigger: {
  //      start: 'top top',
  //      end: '500px',
  //      // markers: true,
  //      scrub: true,
  //    }
  //  });

    
   gsap.from('.works__item', {
    opacity: 0,
    yPercent: 100,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.works__wrapper',
      start: '30% bottom', 
     
      toggleActions: 'play none none reverse',
    }
  });
  gsap.from('.works__telegram__overlay', {
 
   'width': '105%',
   'right': '-2%',
    scrollTrigger: {
      trigger: '.works__telegram',
      start: 'top 70%', 
      
      toggleActions: 'play none none reverse',
    }
  });
  gsap.from('.about__img', {
    opacity: 0,
    yPercent: 100,
    'transform': 'scale(1.4)',

    stagger: 0.4,
    scrollTrigger: {
      trigger: '.works__telegram',
      start: 'bottom 30%', 
     
      toggleActions: 'play none none reverse',
    }
  });
  gsap.from('.process__item', {
    opacity: 0,
    yPercent: 100,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.process__wrapper',
      start: '50% bottom', 
     
      toggleActions: 'play none none reverse',
    }
  });
  
  
}
animation();