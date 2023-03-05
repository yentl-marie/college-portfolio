// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }

  if (ticking != true) {

    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

function throttle (callback, limit) {
    var waiting = false;                      // Initially, we're not waiting
    return function () {                      // We return a throttled function
        if (!waiting) {                       // If we're not waiting
            callback.apply(this, arguments);  // Execute users function
            waiting = true;                   // Prevent future invocations
            setTimeout(function () {          // After a period of time
                waiting = false;              // And allow future invocations
            }, limit);
        }
    }
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, throttle(parallaxScroll, 60), false);


// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}

function goToProjects(){
  if(currentSlideNumber == 0){
    currentSlideNumber++;
    nextItem();
  } else if (currentSlideNumber == 2){
    currentSlideNumber--;
    previousItem();
  }
}

function goToContact() {
  if(currentSlideNumber == 0){
    currentSlideNumber++;
    nextItem();

    currentSlideNumber++;
    nextItem();
  } else if(currentSlideNumber == 1){
    currentSlideNumber++;
    nextItem();
  }
}

function goToHome() {
  if(currentSlideNumber == 1) {
    currentSlideNumber--;
    previousItem();
  } else if(currentSlideNumber == 2) {
    currentSlideNumber--;
    previousItem();
    currentSlideNumber--;
    previousItem();
  }
}

//--------- Carousel ------------//
$(document).ready(function(){
  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: false
  });


  // move next carousel
  $('.moveNextCarousel').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.carousel').carousel('next');
  });

  // move prev carousel
  $('.movePrevCarousel').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.carousel').carousel('prev');
  });
  
  // $('.card').hover(
  //       function() {
  //           $(this).find('> .card-content > span.activator').click();
  //       }, function() {
  //           $(this).find('> .card-reveal > .card-title').click();
  //       }
  //   );
});
